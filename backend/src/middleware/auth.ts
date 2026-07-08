import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, error: "No token provided" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
    if (err) {
      res.status(403).json({ success: false, error: "Invalid token" });
      return;
    }
    req.user = user as JWTPayload;
    next();
  });
}

export function requireAgent(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.role !== "agent") {
    res.status(403).json({ success: false, error: "Agent role required" });
    return;
  }
  next();
}

export function requireFarmer(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.role !== "farmer") {
    res.status(403).json({ success: false, error: "Farmer role required" });
    return;
  }
  next();
}
