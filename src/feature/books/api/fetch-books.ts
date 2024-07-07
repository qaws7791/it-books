import { BookSearchParams, BookWithCategory } from "@/src/feature/books/types";
import api from "@/src/feature/shared/api";
import { PaginationResponse } from "@/src/feature/shared/type/api";

export interface FetchBooksOutput {
  data: BookWithCategory[];
  pagination: PaginationResponse;
}

export default function fetchBooks({
  page,
  limit,
  query,
  categorySlug,
  tag,
}: BookSearchParams): Promise<FetchBooksOutput> {
  return api.get("/books", {
    params: { page, limit, query, categorySlug, tag },
  });
}
