import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_DB: z.string(),
  AWS_S3_ACCESS_KEY_ID: z.string(),
  AWS_S3_SECRET_ACCESS_KEY: z.string(),
});

const env = envSchema.parse(process.env);
export default env;
