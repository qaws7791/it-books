import db from "@server/src/database";
import { books } from "@server/src/database/models/books.model";

import AppError from "@server/src/lib/AppError";
import { asc, eq, gt } from "drizzle-orm";

class BooksService {
  private static instance: BooksService;
  public static getInstance(): BooksService {
    if (!BooksService.instance) {
      BooksService.instance = new BooksService();
    }
    return BooksService.instance;
  }

  create = async (book: typeof books.$inferInsert) => {
    // insert book into database
    const result = await db.insert(books).values(book).returning();
    return result[0];
  };

  findOne = async (id: number) => {
    const result = await db.query.books.findFirst({
      where: eq(books.id, id),
      with: {
        booksToTags: {
          columns: {},
          with: {
            tag: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      throw new AppError("BookNotFound");
    }
    const { booksToTags, ...book } = result;
    const tags = booksToTags.map((btt) => btt.tag);
    return {
      ...book,
      tags,
    };
  };

  delete = async (id: number) => {
    const result = await db.delete(books).where(eq(books.id, id)).returning();
    return result[0];
  };

  getNextPage = async (limit: number, cursor?: number) => {
    const result = await db
      .select()
      .from(books)
      .where(cursor ? gt(books.id, cursor) : undefined)
      .limit(limit)
      .orderBy(asc(books.id));

    return result;
  };
}

export default BooksService;
