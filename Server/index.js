import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/UserRoute.js";
import codeReviewRoute from "./routes/CodeRoute.js";

dotenv.config();

const app = express();

// ✅ Setup CORS properly
const allowedOrigins = (process.env.FRONTEND_URL || "http://help-code-omega.vercel.app").split(",");

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // allow cookies/auth
};

app.use(cors(corsOptions)); // ✅ apply only once

// ✅ Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/bro", codeReviewRoute);

// ✅ Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
