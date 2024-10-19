import { Express } from "express";
import usersRouter from "./user";

const initRoutes = (app: Express) => {
  return app.use("/api", usersRouter);
};

export { initRoutes };
