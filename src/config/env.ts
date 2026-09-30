import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug"]).default("info"),
  CORS_ORIGIN: z.string().default("*"),
  API_KEY: z
    .string()
    .min(1, "API_KEY é obrigatória para segurança corporativa"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Configuração inválida de variáveis de ambiente:",
    _env.error.format(),
  );
  process.exit(1);
}

export const env = _env.data;
