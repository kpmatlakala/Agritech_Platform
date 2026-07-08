import { Router, Request, Response } from "express";
import pool from "../db";
import { authenticateToken, requireAgent } from "../middleware/auth";
import { ApiResponse, Agent } from "../types";

const router = Router();

/**
 * GET /api/agents/me
 * Get current agent profile
 */
router.get(
  "/me",
  authenticateToken,
  requireAgent,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const agentResult = await pool.query(
        `SELECT id, agent_id, phone_number, full_name, email, 
                village, district, province, active, created_at 
         FROM agents WHERE id = $1`,
        [req.user?.role_id]
      );

      if (agentResult.rows.length === 0) {
        res.status(404).json({ success: false, error: "Agent not found" });
        return;
      }

      const agent = agentResult.rows[0];

      // Get farmer stats
      const statsResult = await pool.query(
        `SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
         FROM farmers WHERE created_by = $1`,
        [agent.agent_id]
      );

      const stats = statsResult.rows[0];

      res.json({
        success: true,
        data: {
          agent,
          stats,
        },
      });
    } catch (error) {
      console.error("Error fetching agent profile:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * GET /api/agents/:agentId/farmers
 * Get all farmers for an agent (with optional search)
 */
router.get(
  "/:agentId/farmers",
  authenticateToken,
  requireAgent,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const rawAgentId = req.params.agentId;
      const agentId = Array.isArray(rawAgentId) ? rawAgentId[0] : rawAgentId;
      const { search, status, page = "1", limit = "10" } = req.query;

      if (!agentId) {
        res.status(400).json({ success: false, error: "Agent ID is required" });
        return;
      }

      // Verify agent can only view their own farmers
      const agentCheck = await pool.query(
        "SELECT agent_id FROM agents WHERE id = $1",
        [req.user?.role_id]
      );

      if (agentCheck.rows.length === 0 || agentCheck.rows[0].agent_id !== agentId) {
        res
          .status(403)
          .json({
            success: false,
            error: "Unauthorized to view these farmers",
          });
        return;
      }

      let query = "SELECT * FROM farmers WHERE created_by = $1";
      const params: (string | number)[] = [agentId];
      let paramIndex = 2;

      // Add search filter
      if (search) {
        query += ` AND (full_name ILIKE $${paramIndex} OR farmer_id ILIKE $${paramIndex} OR village ILIKE $${paramIndex})`;
        params.push(`%${search}%`);
        paramIndex++;
      }

      // Add status filter
      if (status) {
        query += ` AND status = $${paramIndex}`;
        params.push(status as string);
        paramIndex++;
      }

      query += " ORDER BY registered_at DESC";

      // Add pagination
      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 10;
      const offset = (pageNum - 1) * limitNum;

      query += ` LIMIT ${limitNum} OFFSET ${offset}`;

      const result = await pool.query(query, params);

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: result.rows.length,
        },
      });
    } catch (error) {
      console.error("Error fetching farmers:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

export default router;
