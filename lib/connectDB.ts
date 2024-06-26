import mongoose from "mongoose";

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("connected to database");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default connectDB;
