import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Stripe from "stripe";

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);

    if (!showData) {
      return false;
    }

    const occupiedSeats = showData.occupiedSeats || {};

    const isAnySeatTaken = selectedSeats.some(
      (seat) => occupiedSeats[seat]
    );

    return !isAnySeatTaken;
  } catch (error) {
    console.error("Seat availability error:", error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    console.log("Booking request received");
    console.log("Body:", req.body);

    const { showId, selectedSeats } = req.body;

    // Validation
    if (!showId) {
      return res.status(400).json({
        success: false,
        message: "Show ID is required",
      });
    }

    if (!selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one seat",
      });
    }

    // Get Clerk user
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to continue",
      });
    }

    // Check Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing");

      return res.status(500).json({
        success: false,
        message: "Stripe configuration is missing",
      });
    }

    // Check seat availability
    const isAvailable = await checkSeatsAvailability(
      showId,
      selectedSeats
    );

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Selected seats are no longer available",
      });
    }

    // Get show
    const showData = await Show.findById(showId).populate("movie");

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    if (!showData.movie) {
      return res.status(400).json({
        success: false,
        message: "Movie information not found",
      });
    }

    const amount = Number(showData.showPrice) * selectedSeats.length;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket price",
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount,
      bookedSeats: selectedSeats,
    });

    // Mark seats temporarily as occupied
    if (!showData.occupiedSeats) {
      showData.occupiedSeats = {};
    }

    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    // Initialize Stripe
    const stripeInstance = new Stripe(
      process.env.STRIPE_SECRET_KEY
    );

    // Create Stripe Checkout Session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: `${showData.movie.title} - Movie Ticket`,
            },

            unit_amount: Math.round(amount * 100),
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${req.headers.origin}/loading/my-bookings`,
      cancel_url: `${req.headers.origin}/my-bookings`,

      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    booking.paymentLink = session.url;
    await booking.save();

    console.log("Booking created successfully:", booking._id);

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create booking",
    });
  }
};

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const showData = await Show.findById(showId);

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    const occupiedSeats = Object.keys(
      showData.occupiedSeats || {}
    );

    return res.json({
      success: true,
      occupiedSeats,
    });
  } catch (error) {
    console.error("GET OCCUPIED SEATS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};