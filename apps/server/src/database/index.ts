import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import env from "@server/src/lib/env.js";
import * as schema from "@server/src/database/models/index";

export const postgresClient = postgres(
  `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  {
    max: 1,
  }
);

const db = drizzle(postgresClient, {
  schema,
});

export default db;
