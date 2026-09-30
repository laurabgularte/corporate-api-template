import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { router } from "./routes";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

// Middlewares de Segurança e Formatação
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "10mb" }));

// Middleware de Limitação de Requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: {
    status: "error",
    message:
      "Muitas requisições originadas deste IP, tente novamente em 15 minutos.",
  },
});
app.use(limiter);

//Rastreabilidade
app.use(loggerMiddleware);

// Rotas da Aplicação
app.use(router);

// Handling para rotas inexistentes (404)
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Rota ${req.originalUrl} não encontrada.`,
  });
});

// Middleware Global de Erros (sempre por último)
app.use(errorMiddleware);

export { app };
