import { books } from "@server/src/database/models/books.model";
import { tags } from "@server/src/database/models/tags.model";
import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

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
