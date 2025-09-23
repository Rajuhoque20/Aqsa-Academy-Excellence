// lib/mongodb.ts
import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Tell TypeScript that globalThis may have _mongoose
const globalWithCache = globalThis as typeof globalThis & { _mongoose?: MongooseCache };

// Initialize cache if it doesn't exist
if (!globalWithCache._mongoose) {
  globalWithCache._mongoose = { conn: null, promise: null };
}

// At this point _mongoose is definitely defined
const cached: MongooseCache = globalWithCache._mongoose;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGO_URL not defined");

    cached.promise = mongoose.connect(mongoUrl).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
