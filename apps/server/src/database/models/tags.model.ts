import { booksToTags } from "@server/src/database/models/booksToTags.model";
import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name").unique().notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  booksToTags: many(booksToTags),
}));
