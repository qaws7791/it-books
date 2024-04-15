import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  password: varchar("password", { length: 20 }).default(sql`NULL`),
  name: text("name").notNull(),
  picture: text("picture").notNull(),
  providerId: text("provider_id"),
  role: roleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SelectUser = typeof users.$inferSelect;
