import mongoose from "mongoose";
import { logger } from "./logger";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("MongoDB connected...");
  } catch (err : any) {
    logger.error("DB connection failed : ", {error : err.message});
    process.exit(1)
  }
}