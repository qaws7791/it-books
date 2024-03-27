import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.js";
import env from "@server/src/lib/env.js";

const queryClient = postgres(
  `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  {
    max: 1,
  }
);

const db = drizzle(queryClient, {
  schema,
});

export default db;
