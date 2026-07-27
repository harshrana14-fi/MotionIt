import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

// Cache the connection promise in globalThis to survive Next.js hot reloads
const globalWithMongoose = globalThis as typeof globalThis & {
  _mongoosePromise?: Promise<typeof mongoose>;
};

export const connectToDatabase = async () => {
  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  if (!globalWithMongoose._mongoosePromise) {
    globalWithMongoose._mongoosePromise = mongoose.connect(databaseUrl, {
      dbName: "heygen",
    });
  }

  try {
    await globalWithMongoose._mongoosePromise;
  } catch (error) {
    // Reset so next call can retry
    globalWithMongoose._mongoosePromise = undefined;
    throw error;
  }
};
