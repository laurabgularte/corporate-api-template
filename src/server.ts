import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const server = app.listen(env.PORT, () => {
  logger.info(
    `🚀 Servidor rodando no ambiente [${env.NODE_ENV}] na porta ${env.PORT}`,
  );
});

// Encerramento de processo
const shutdown = (signal: string) => {
  logger.info(`Sinal ${signal} recebido. Encerrando servidor HTTP...`);
  server.close(() => {
    logger.info("Servidor HTTP encerrado com sucesso.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
