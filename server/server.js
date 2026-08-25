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

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://sid-flix-unthinkable-solutions-4ksp.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Clerk
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SidFlix API is running",
  });
});

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

// Start server only after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();