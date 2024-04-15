import { booksToTags } from "@server/src/database/models/booksToTags.model";
import { categories } from "@server/src/database/models/categories.model";
import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  isbn: varchar("isbn", { length: 13 }).unique().notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  image: text("image").notNull(),
  author: varchar("author", { length: 200 }).notNull(),
  translator: varchar("translator", { length: 200 }),
  publisher: varchar("publisher", { length: 200 }).notNull(),
  publicationDate: date("publication_date").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const booksRelations = relations(books, ({ many }) => ({
  booksToTags: many(booksToTags),
}));
