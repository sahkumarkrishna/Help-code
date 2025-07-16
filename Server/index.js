import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/UserRoute.js";
import codeReviewRoute from "./routes/CodeRoute.js";

dotenv.config({});

const app = express();

// Get frontend URL from environment variables
const FRONTEND_URL = process.env.FRONTEND_URL;

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/bro", codeReviewRoute);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
