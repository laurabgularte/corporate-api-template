import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { logger } from "../utils/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const correlationId =
    (req.headers["x-correlation-id"] as string) || randomUUID();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-ID", correlationId);

  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info({
      message: "Requisição HTTP processada",
      correlationId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};
