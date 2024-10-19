import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./config/logger";
import { loggerMiddleware } from "./middlewares/endpointsLogger";
import { connectToDatabase } from "./config/mongo";
import { initRoutes } from "./routes";
import { config } from "./config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

initRoutes(app);

connectToDatabase();

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
