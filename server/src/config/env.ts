import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/dsa_sheet_app"),
  JWT_SECRET: z.string().min(8).default("development-secret"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  SEED_DEMO_USER_EMAIL: z.string().email().default("demo@apnacollege.com"),
  SEED_DEMO_USER_PASSWORD: z.string().min(6).default("Pass@123")
});

export const env = envSchema.parse(process.env);

