import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/UserRoute.js";
import codeReviewRoute from "./routes/CodeRoute.js";

dotenv.config();

const app = express();

// 🔐 Environment variables
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL?.split(",") || [
  "http://localhost:5173",
  "https://krishna-code.vercel.app",
];

// 🌐 CORS configuration
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};

// 🧩 Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 📦 API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/bro", codeReviewRoute);

// 🚀 Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
