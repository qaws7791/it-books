import db from "@server/src/database";
import { booksToTags } from "@server/src/database/models";
import { insertBookToTagType } from "@server/src/schemas/bookToTags.schema";

import { eq } from "drizzle-orm";

class BooksToTagsService {
  private static instance: BooksToTagsService;
  public static getInstance(): BooksToTagsService {
    if (!BooksToTagsService.instance) {
      BooksToTagsService.instance = new BooksToTagsService();
    }
    return BooksToTagsService.instance;
  }

  create = async (schema: insertBookToTagType) => {
    const result = await db.insert(booksToTags).values(schema).returning();
    return result[0];
  };

  deleteByBookId = async (bookId: number) => {
    const result = await db
      .delete(booksToTags)
      .where(eq(booksToTags.bookId, bookId))
      .returning();
    return result;
  };
}
export default BooksToTagsService;
