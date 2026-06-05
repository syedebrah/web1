import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend server is running perfectly!" });
});

// Example endpoint returning some application status
app.get("/api/status", (req, res) => {
  res.json({
    service: "API Service",
    version: "1.0.0",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
