import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import pool from "../db";
import { authenticateToken } from "../middleware/auth";
import { LoginRequest, LoginResponse, ApiResponse, JWTPayload } from "../types";
import type { SignOptions } from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const jwtExpiryRaw = process.env.JWT_EXPIRY;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] = jwtExpiryRaw
  ? /^\d+$/.test(jwtExpiryRaw)
    ? Number(jwtExpiryRaw)
    : (jwtExpiryRaw as SignOptions["expiresIn"])
  : "7d";

/**
 * POST /api/auth/login
 * Login with phone number (OTP-based in production)
 */
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone_number, password, pin } = req.body as LoginRequest;

    if (!phone_number) {
      res.status(400).json({ success: false, error: "Phone number required" });
      return;
    }

    // Find user by phone
    const userResult = await pool.query(
      "SELECT * FROM users WHERE phone_number = $1",
      [phone_number]
    );

    if (userResult.rows.length === 0) {
      res.status(401).json({ success: false, error: "User not found" });
      return;
    }

    const user = userResult.rows[0];

    // For MVP: accept any password (in production, use OTP)
    if (password && user.password_hash) {
      const isValid = await bcryptjs.compare(password, user.password_hash);
      if (!isValid) {
        res.status(401).json({ success: false, error: "Invalid password" });
        return;
      }
    }

    // Generate JWT
    const payload: JWTPayload = {
      userId: user.id,
      phone_number: user.phone_number,
      role: user.role,
      role_id: user.role_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Update last login
    await pool.query("UPDATE users SET last_login = NOW() WHERE id = $1", [
      user.id,
    ]);

    // Fetch role-specific data
    let agentData = null;
    let farmerData = null;

    if (user.role === "agent") {
      const agentResult = await pool.query(
        "SELECT * FROM agents WHERE id = $1",
        [user.role_id]
      );
      agentData = agentResult.rows[0];
    } else if (user.role === "farmer") {
      const farmerResult = await pool.query(
        "SELECT * FROM farmers WHERE id = $1",
        [user.role_id]
      );
      farmerData = farmerResult.rows[0];
    }

    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: {
        token,
        user,
        agent: agentData,
        farmer: farmerData,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get(
  "/me",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userResult = await pool.query(
        "SELECT id, phone_number, role, role_id, created_at FROM users WHERE id = $1",
        [req.user?.userId]
      );

      if (userResult.rows.length === 0) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }

      const user = userResult.rows[0];
      let profileData = null;

      if (user.role === "agent") {
        const profileResult = await pool.query(
          "SELECT * FROM agents WHERE id = $1",
          [user.role_id]
        );
        profileData = profileResult.rows[0];
      } else if (user.role === "farmer") {
        const profileResult = await pool.query(
          "SELECT * FROM farmers WHERE id = $1",
          [user.role_id]
        );
        profileData = profileResult.rows[0];
      }

      res.json({
        success: true,
        data: {
          user,
          profile: profileData,
        },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * POST /api/auth/register-agent
 * Register a new agent (admin-only in production)
 */
router.post(
  "/register-agent",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { phone_number, full_name, email, village, district } = req.body;

      if (!phone_number || !full_name) {
        res
          .status(400)
          .json({
            success: false,
            error: "Phone number and full name required",
          });
        return;
      }

      // Check if user exists
      const existingUser = await pool.query(
        "SELECT id FROM users WHERE phone_number = $1",
        [phone_number]
      );

      if (existingUser.rows.length > 0) {
        res
          .status(400)
          .json({ success: false, error: "Phone number already registered" });
        return;
      }

      // Generate agent ID
      const countResult = await pool.query(
        "SELECT COUNT(*) as count FROM agents"
      );
      const agentNumber = countResult.rows[0].count + 1;
      const agent_id = `AG-${String(agentNumber).padStart(3, "0")}`;

      // Create agent
      const agentResult = await pool.query(
        `INSERT INTO agents 
         (agent_id, phone_number, full_name, email, village, district) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [agent_id, phone_number, full_name, email, village, district]
      );

      const agent = agentResult.rows[0];

      // Create user account
      const userResult = await pool.query(
        `INSERT INTO users (phone_number, role, role_id) 
         VALUES ($1, $2, $3) 
         RETURNING id, phone_number, role, role_id, created_at`,
        [phone_number, "agent", agent.id]
      );

      const user = userResult.rows[0];

      // Generate JWT
      const payload: JWTPayload = {
        userId: user.id,
        phone_number: user.phone_number,
        role: "agent",
        role_id: user.role_id,
      };

      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.status(201).json({
        success: true,
        data: {
          token,
          user,
          agent,
        },
      });
    } catch (error) {
      console.error("Agent registration error:", error);
      res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

/**
 * POST /api/auth/logout
 * Logout (client-side token deletion mainly)
 */
router.post(
  "/logout",
  authenticateToken,
  async (_req: Request, res: Response): Promise<void> => {
    res.json({ success: true, message: "Logged out successfully" });
  }
);

export default router;
