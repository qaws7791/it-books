import { books } from "@server/src/database/models/books.model";
import { users } from "@server/src/database/models/users.model";
import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const likes = pgTable("likes", {
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});
