import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import { logger } from "../utils/logger";
import { env } from "../config/env";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const correlationId = req.correlationId || "N/A";

  if (err instanceof AppError) {
    logger.warn({
      message: err.message,
      statusCode: err.statusCode,
      correlationId,
      path: req.originalUrl,
    });

    res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      correlationId,
    });
    return;
  }

  // Erros inesperados (Unhandled Exceptions - 500)
  logger.error({
    message: "Erro interno não tratado no servidor",
    error: err.message,
    stack: err.stack,
    correlationId,
    path: req.originalUrl,
  });

  res.status(500).json({
    status: "error",
    statusCode: 500,
    message:
      env.NODE_ENV === "production"
        ? "Erro interno do servidor. Entre em contato com o suporte informando o correlationId."
        : err.message,
    correlationId,
  });
};
