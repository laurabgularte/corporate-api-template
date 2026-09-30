import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { UnauthorizedError } from "../errors/app-error";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== env.API_KEY) {
    throw new UnauthorizedError(
      "Chave de API inválida ou ausente no cabeçalho X-API-KEY",
    );
  }

  next();
};
