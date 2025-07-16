// server.js or app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoute from "./routes/UserRoute.js";
import codeReviewRoute from "./routes/CodeRoute.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// ✅ Middleware

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://help-code-omega.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/bro", codeReviewRoute);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Connect DB and Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

// ✅ Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("🔌 Gracefully shutting down...");
  await mongoose.disconnect();
  process.exit(0);
});
