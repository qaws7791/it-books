import { BookSearchParams } from "@/src/feature/books/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const bookQueryKeys = createQueryKeys("books", {
  fetchBookById: (bookId: number) => ["id", bookId],
  fetchBookBySlug: (bookSlug: string) => ["slug", bookSlug],
  fetchBooks: (bookSearchParams: BookSearchParams) => [
    "pagination",
    bookSearchParams,
  ],
});

export default bookQueryKeys;
