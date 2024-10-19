import mongoose from "mongoose";
import { logger } from "./logger";
import { config } from ".";

const connectToDatabase = () => {
  const mongoUri = `${config.mongoUri}/${config.dbName}`;
  return mongoose
    .connect(mongoUri)
    .then(() => logger.info("Connected to MongoDB"))
    .catch((err) => logger.info("Failed to connect to MongoDB", err));
};

export { connectToDatabase };
