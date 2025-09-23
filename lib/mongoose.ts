import mongoose from "mongoose";

let isConnected = false; // Track connection state

export async function connectToDatabase() {
  if (isConnected) {
    return; // If already connected, just return
  }

  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in environment variables.");
    }

    const db = await mongoose.connect(mongoUrl, {
      bufferCommands: false, // Disable Mongoose buffering
    });

    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
