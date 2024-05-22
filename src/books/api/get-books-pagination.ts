import { BookSearchParams, BookWithCategory } from "@/src/books/types";
import api from "@/src/shared/api";
import { PaginationResponse } from "@/src/shared/type/api";

export interface GetBooksPaginationOutput {
  data: BookWithCategory[];
  pagination: PaginationResponse;
}

export default function getBooksPagination({
  page = 1,
  limit = 10,
  query,
}: BookSearchParams): Promise<GetBooksPaginationOutput> {
  return api.get("/books", { params: { page, limit, query } });
}
