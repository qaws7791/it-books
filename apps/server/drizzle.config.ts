import type { Config } from "drizzle-kit";
import env from "./src/lib/env";
export default {
  schema: "./src/database/models/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  },
} satisfies Config;
