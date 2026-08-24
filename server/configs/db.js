import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Database Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;