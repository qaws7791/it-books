import getBookById from "@/src/books/api/get-book-by-id";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import getBookBySlug from "@/src/books/api/get-book-by-slug";
import { PaginationCommonInput } from "@/src/shared/type/api";
import getBooksPagination from "@/src/books/api/get-books-pagination";
export const bookQueryKeys = createQueryKeys("books", {
  fetchBookById: (bookId: number) => ["id", bookId],
  fetchBookBySlug: (bookSlug: string) => ["slug", bookSlug],
  fetchBooksPagination: (input: PaginationCommonInput) => [
    "pagination",
    input.limit,
    input.page,
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
}: PaginationCommonInput) {
  return useSuspenseQuery({
    queryKey: bookQueryKeys.fetchBooksPagination({ page, limit }).queryKey,
    queryFn: () => getBooksPagination({ page, limit }),
  });
}
