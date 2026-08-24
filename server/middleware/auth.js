import { getAuth } from "@clerk/express";

export const protectAdmin = (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    console.log("Logged in User ID:", userId);
    console.log("Admin User ID:", process.env.ADMIN_USER_ID);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in.",
      });
    }

    if (userId !== process.env.ADMIN_USER_ID) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access the SidFlix admin panel",
      });
    }

    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};