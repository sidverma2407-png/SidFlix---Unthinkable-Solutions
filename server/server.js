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

// ==========================
// MIDDLEWARE
// ==========================

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://sid-flix-unthinkable-solutions-iq00b3usc-sid007-v.vercel.app",
    ],
    credentials: true,
  })
);

// Clerk Middleware
app.use(clerkMiddleware());

// ==========================
// ROUTES
// ==========================

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SidFlix API is running",
  });
});

// API Routes
app.use("/api/show", showRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);

// ==========================
// ERROR HANDLER
// ==========================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==========================
// START SERVER
// ==========================

const startServer = async () => {
  try {
    // Wait for MongoDB connection first
    await connectDB();

    // Start Express server only after DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("SidFlix backend is live");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();