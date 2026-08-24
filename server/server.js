import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./configs/db.js";
import showRouter from "./routes/showRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// Clerk middleware
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SidFlix API is running",
  });
});

// Routes
app.use("/api/show", showRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});