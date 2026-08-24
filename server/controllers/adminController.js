import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

// Check if logged-in user is an admin
export const isAdmin = async (req, res) => {
  try {
    const userId = req.auth()?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        isAdmin: false,
      });
    }

    const isAdminUser = userId === process.env.ADMIN_USER_ID;

    return res.json({
      success: true,
      isAdmin: isAdminUser,
    });
  } catch (error) {
    console.error("Admin check error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify admin access",
      isAdmin: false,
    });
  }
};

// Get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });

    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce(
        (acc, booking) => acc + Number(booking.amount || 0),
        0
      ),
      activeShows,
      totalUser,
    };

    return res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    return res.json({
      success: true,
      shows,
    });
  } catch (error) {
    console.error("Get shows error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "movie",
        },
      })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};