import getBookById from "@/src/books/api/get-book-by-id";
import getBookBySlug from "@/src/books/api/get-book-by-slug";
import getBooksPagination from "@/src/books/api/get-books-pagination";
import { BookSearchParams } from "@/src/books/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";
export const bookQueryKeys = createQueryKeys("books", {
  fetchBookById: (bookId: number) => ["id", bookId],
  fetchBookBySlug: (bookSlug: string) => ["slug", bookSlug],
  fetchBooksPagination: (bookSearchParams: BookSearchParams) => [
    "search",
    bookSearchParams,
  ],
});

export const useBookById = (bookId: number) => {
  return useSuspenseQuery({
    queryKey: bookQueryKeys.fetchBookById(bookId).queryKey,
    queryFn: () => getBookById(bookId),
  });
};

export const useBookBySlug = (bookSlug: string) => {
  return useSuspenseQuery({
    queryKey: bookQueryKeys.fetchBookBySlug(bookSlug).queryKey,
    queryFn: () => getBookBySlug(bookSlug),
  });
};

export function useBooksPagination({
  page = 1,
  limit = 10,
  query,
}: BookSearchParams) {
  return useSuspenseQuery({
    queryKey: bookQueryKeys.fetchBooksPagination({ page, limit, query })
      .queryKey,
    queryFn: () => getBooksPagination({ page, limit, query }),
  });
}
