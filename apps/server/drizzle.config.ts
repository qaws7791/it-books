import type { Config } from "drizzle-kit";
import env from "./src/lib/env";
export default {
  schema: "./src/database/models/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    user: env.POSTGRES_USER,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    port: Number(env.POSTGRES_PORT),
  },
} satisfies Config;
