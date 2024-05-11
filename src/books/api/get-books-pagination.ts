import api from "@/src/shared/api";
import {
  PaginationCommonInput,
  PaginationResponse,
} from "@/src/shared/type/api";
import { BookWithCategory } from "@/src/books/types";

export interface GetBooksPaginationOutput {
  data: BookWithCategory[];
  pagination: PaginationResponse;
}

export default function getBooksPagination({
  page = 1,
  limit = 10,
}: PaginationCommonInput): Promise<GetBooksPaginationOutput> {
  return api.get("/books", { params: { page, limit } });
}
