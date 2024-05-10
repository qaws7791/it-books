import getBookById from "@/src/books/api/getBookById";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import getBookBySlug from "@/src/books/api/getBookBySlug";
import { PaginationCommonInput } from "@/src/shared/type/api";
import getBooksPagination from "@/src/books/api/getBooksPagination";
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

export function useBooksPagination(
  input: PaginationCommonInput = { page: 1, limit: 10 }
) {
  return useSuspenseQuery({
    queryKey: bookQueryKeys.fetchBooksPagination(input).queryKey,
    queryFn: () => getBooksPagination(input),
  });
}
