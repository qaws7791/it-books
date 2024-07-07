import fetchBook from "@/src/feature/books/api/fetch-book";
import fetchBookBySlug from "@/src/feature/books/api/fetch-book-by-slug";
import fetchBooks from "@/src/feature/books/api/fetch-books";
import bookQueryKeys from "@/src/feature/books/hooks/queries/query-keys";
import { BookSearchParams } from "@/src/feature/books/types";
import { queryOptions } from "@tanstack/react-query";

export const bookByIdOptions = (bookId: number) => {
  return queryOptions({
    queryKey: bookQueryKeys.fetchBookById(bookId).queryKey,
    queryFn: () => fetchBook(bookId),
  });
};

export const bookBySlugOptions = (bookSlug: string) => {
  return queryOptions({
    queryKey: bookQueryKeys.fetchBookBySlug(bookSlug).queryKey,
    queryFn: () => fetchBookBySlug(bookSlug),
  });
};

export const booksOptions = ({
  page = 1,
  limit = 20,
  query,
  categorySlug,
  tag,
}: BookSearchParams) => {
  const bookSearchParams = { page, limit, query, categorySlug, tag };
  return queryOptions({
    queryKey: bookQueryKeys.fetchBooks(bookSearchParams).queryKey,
    queryFn: () => fetchBooks(bookSearchParams),
  });
};
