import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`[${req.method}] ${req.url} - ${new Date().toISOString()}`);
    next();
}

export {
    loggerMiddleware
}