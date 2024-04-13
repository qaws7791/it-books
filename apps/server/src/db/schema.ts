import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const roleEnum = pgEnum("role", ["admin", "user"]);

const baseColumns = {
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  password: varchar("password", { length: 20 }).default(sql`NULL`),
  name: text("name").notNull(),
  picture: text("picture").notNull(),
  providerId: text("provider_id"),
  role: roleEnum("role").notNull().default("user"),
  ...baseColumns,
});

export type SelectUser = typeof users.$inferSelect;

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").unique().notNull(),
  slug: varchar("slug").unique().notNull(),
  ...baseColumns,
});
// tags of books
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name").unique().notNull(),
  ...baseColumns,
});

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
  pages: integer("pages").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  ...baseColumns,
});

export const insertBookSchema = createInsertSchema(books);

export const booksToTags = pgTable(
  "book_tags",
  {
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.bookId, t.tagId],
    }),
  })
);

export const booksRelations = relations(books, ({ many }) => ({
  booksToTags: many(booksToTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  booksToTags: many(booksToTags),
}));

export const booksToTagsRelations = relations(booksToTags, ({ one }) => ({
  book: one(books, {
    fields: [booksToTags.bookId],
    references: [books.id],
  }),
  tag: one(tags, {
    fields: [booksToTags.tagId],
    references: [tags.id],
  }),
}));

export const bookLikes = pgTable("book_likes", {
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  ...baseColumns,
});
