import { Router, Request, Response } from "express";
import pool from "../db";
import { authenticateToken, requireAgent, requireFarmer } from "../middleware/auth";
import {
  FarmerRegistrationInput,
  ApiResponse,
  Farmer,
} from "../types";

const router = Router();

/**
 * POST /api/farmers
 * Register a new farmer (agent only)
 */
router.post(
  "/",
  authenticateToken,
  requireAgent,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body as FarmerRegistrationInput;

      if (!input.full_name || !input.id_number || !input.phone_number || !input.village) {
        res
          .status(400)
          .json({
            success: false,
            error: "Missing required fields",
          });
        return;
      }

      // Check if farmer with this ID already exists
      const existing = await pool.query(
        "SELECT id FROM farmers WHERE id_number = $1",
        [input.id_number]
      );

      if (existing.rows.length > 0) {
        res
          .status(400)
          .json({
            success: false,
            error: "Farmer with this ID already registered",
          });
        return;
      }

      // Generate farmer ID
      const countResult = await pool.query(
        "SELECT COUNT(*) as count FROM farmers"
      );
      const farmerNumber = countResult.rows[0].count + 1;
      const farmer_id = `AFAP-${String(farmerNumber).padStart(4, "0")}`;

      // Get agent ID
      const agentResult = await pool.query(
        "SELECT agent_id FROM agents WHERE id = $1",
        [req.user?.role_id]
      );
      const agent_id = agentResult.rows[0].agent_id;

      // Insert farmer
      const result = await pool.query(
        `INSERT INTO farmers (
          farmer_id, phone_number, full_name, id_number, village, 
          district, crop_types, farm_size_ha, latitude, longitude, 
          gps_accuracy, photo_url, registered_via, status, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *`,
        [
          farmer_id,
          input.phone_number,
          input.full_name,
          input.id_number,
          input.village,
          input.district || null,
          input.crop_types || [],
          input.farm_size_ha || null,
          input.latitude || null,
          input.longitude || null,
          input.gps_accuracy || null,
          input.photo_url || null,
          "agent",
          "active",
          agent_id,
        ]
      );

      const farmer = result.rows[0];

      // TODO: Send SMS to farmer with their ID
      // SMS: `Your Digital ID is ${farmer_id}. Your Agent is ${agent_name}.`

      res.status(201).json({
        success: true,
        data: farmer,
        message: `Farmer registered with ID: ${farmer_id}`,
      });
    } catch (error) {
      console.error("Error registering farmer:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * GET /api/farmers/:id
 * Get farmer by ID (agent can only view their farmers)
 */
router.get(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "SELECT * FROM farmers WHERE farmer_id = $1 OR id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: "Farmer not found" });
        return;
      }

      const farmer = result.rows[0];

      // Check authorization: agents can only view their own farmers, farmers can only view themselves
      if (req.user?.role === "agent") {
        const agentResult = await pool.query(
          "SELECT agent_id FROM agents WHERE id = $1",
          [req.user?.role_id]
        );
        if (agentResult.rows[0].agent_id !== farmer.created_by) {
          res
            .status(403)
            .json({
              success: false,
              error: "Not authorized to view this farmer",
            });
          return;
        }
      } else if (req.user?.role === "farmer") {
        const farmerCheck = await pool.query(
          "SELECT id FROM farmers WHERE id = $1",
          [req.user?.role_id]
        );
        if (farmerCheck.rows[0].id !== farmer.id) {
          res
            .status(403)
            .json({
              success: false,
              error: "Not authorized to view this farmer",
            });
          return;
        }
      }

      res.json({ success: true, data: farmer });
    } catch (error) {
      console.error("Error fetching farmer:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * GET /api/farmers/me
 * Get current farmer's profile (farmer only)
 */
router.get(
  "/me",
  authenticateToken,
  requireFarmer,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await pool.query(
        "SELECT * FROM farmers WHERE id = $1",
        [req.user?.role_id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: "Farmer profile not found" });
        return;
      }

      const farmer = result.rows[0];

      // Get agent info
      const agentResult = await pool.query(
        "SELECT full_name, phone_number FROM agents WHERE agent_id = $1",
        [farmer.created_by]
      );

      res.json({
        success: true,
        data: {
          farmer,
          agent: agentResult.rows[0],
        },
      });
    } catch (error) {
      console.error("Error fetching farmer profile:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * PUT /api/farmers/:id
 * Update farmer (agent can update, farmers can only update themselves)
 */
router.put(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Fetch current farmer
      const existing = await pool.query(
        "SELECT * FROM farmers WHERE farmer_id = $1 OR id = $1",
        [id]
      );

      if (existing.rows.length === 0) {
        res.status(404).json({ success: false, error: "Farmer not found" });
        return;
      }

      const farmer = existing.rows[0];

      // Check authorization
      if (req.user?.role === "agent") {
        const agentResult = await pool.query(
          "SELECT agent_id FROM agents WHERE id = $1",
          [req.user?.role_id]
        );
        if (agentResult.rows[0].agent_id !== farmer.created_by) {
          res
            .status(403)
            .json({
              success: false,
              error: "Not authorized to update this farmer",
            });
          return;
        }
      } else if (req.user?.role === "farmer") {
        if (req.user?.role_id !== farmer.id) {
          res
            .status(403)
            .json({
              success: false,
              error: "Not authorized to update this farmer",
            });
          return;
        }
        // Farmers can't update certain fields
        delete updates.farmer_id;
        delete updates.created_by;
        delete updates.status;
      }

      // Build update query
      const allowedFields = [
        "full_name",
        "phone_number",
        "village",
        "district",
        "crop_types",
        "farm_size_ha",
        "latitude",
        "longitude",
        "gps_accuracy",
        "photo_url",
        "status",
      ];

      const updateFields: string[] = [];
      const updateValues: (string | number | null)[] = [];
      let paramIndex = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key)) {
          updateFields.push(`${key} = $${paramIndex}`);
          updateValues.push(value as string | number | null);
          paramIndex++;
        }
      }

      if (updateFields.length === 0) {
        res
          .status(400)
          .json({ success: false, error: "No valid fields to update" });
        return;
      }

      updateFields.push(`updated_at = NOW()`);
      updateValues.push(farmer.id);

      const query = `
        UPDATE farmers 
        SET ${updateFields.join(", ")} 
        WHERE id = $${paramIndex}
        RETURNING *
      `;

      const result = await pool.query(query, updateValues);

      res.json({
        success: true,
        data: result.rows[0],
        message: "Farmer updated successfully",
      });
    } catch (error) {
      console.error("Error updating farmer:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * DELETE /api/farmers/:id
 * Delete farmer (agent only, can only delete their farmers)
 */
router.delete(
  "/:id",
  authenticateToken,
  requireAgent,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const existing = await pool.query(
        "SELECT * FROM farmers WHERE farmer_id = $1 OR id = $1",
        [id]
      );

      if (existing.rows.length === 0) {
        res.status(404).json({ success: false, error: "Farmer not found" });
        return;
      }

      const farmer = existing.rows[0];

      // Verify agent ownership
      const agentResult = await pool.query(
        "SELECT agent_id FROM agents WHERE id = $1",
        [req.user?.role_id]
      );

      if (agentResult.rows[0].agent_id !== farmer.created_by) {
        res
          .status(403)
          .json({
            success: false,
            error: "Not authorized to delete this farmer",
          });
        return;
      }

      await pool.query("DELETE FROM farmers WHERE id = $1", [farmer.id]);

      res.json({ success: true, message: "Farmer deleted successfully" });
    } catch (error) {
      console.error("Error deleting farmer:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

export default router;
