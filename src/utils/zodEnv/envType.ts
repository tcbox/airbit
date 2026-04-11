import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().min(32, "Secret must be strong"),
  BASE_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Environment variable is missing or wrong:",
    parsedEnv.error.format(),
  );
  process.exit(1);
}

export const Env = parsedEnv.data;
