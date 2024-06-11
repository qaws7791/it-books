import { BookSearchParams, BookWithCategory } from "@/src/feature/books/types";
import api from "@/src/feature/shared/api";
import { PaginationResponse } from "@/src/feature/shared/type/api";

export interface GetBooksPaginationOutput {
  data: BookWithCategory[];
  pagination: PaginationResponse;
}

export default function getBooksPagination({
  page,
  limit,
  query,
  categorySlug,
}: BookSearchParams): Promise<GetBooksPaginationOutput> {
  return api.get("/books", { params: { page, limit, query, categorySlug } });
}
