import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db";
import authRoutes from "./routes/auth";
import agentRoutes from "./routes/agents";
import farmerRoutes from "./routes/farmers";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/farmers", farmerRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// Start server
async function start() {
  try {
    // Initialize database schema
    await initializeDatabase();
    
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📚 API endpoints:`);
      console.log(`   POST   /api/auth/login`);
      console.log(`   POST   /api/auth/register-agent`);
      console.log(`   GET    /api/auth/me`);
      console.log(`   POST   /api/auth/logout`);
      console.log(`   GET    /api/agents/me`);
      console.log(`   GET    /api/agents/:agentId/farmers`);
      console.log(`   POST   /api/farmers`);
      console.log(`   GET    /api/farmers/:id`);
      console.log(`   GET    /api/farmers/me`);
      console.log(`   PUT    /api/farmers/:id`);
      console.log(`   DELETE /api/farmers/:id`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

start();