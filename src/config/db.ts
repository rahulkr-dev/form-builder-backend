import mongoose from "mongoose";
import { Config } from ".";
import { DB_NAME } from "../constant";
import logger from "./logger";

async function connectDB() {
  try {
    await mongoose.connect(`${Config.DB_URL}/${DB_NAME}`);
    logger.info("database connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export default connectDB;
