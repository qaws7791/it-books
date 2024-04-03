import db from "@server/src/db/db";
import { asc, eq } from "drizzle-orm";

class BooksService {
  private static instance: BooksService;
  public static getInstance(): BooksService {
    if (!BooksService.instance) {
      BooksService.instance = new BooksService();
    }
    return BooksService.instance;
  }
}

export default BooksService;
