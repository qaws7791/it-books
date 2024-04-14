import db from "@server/src/db/db";
import { books } from "@server/src/db/schema";
import AppError from "@server/src/lib/AppError";
import { eq } from "drizzle-orm";

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
}

export default BooksService;
