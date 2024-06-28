import { Category, CategorySearchParams } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";
import { PaginationResponse } from "@/src/feature/shared/type/api";

interface FetchCategoriesResponse {
  data: Category[];
  pagination: PaginationResponse;
}

export default function fetchCategories({
  page,
  limit,
  query,
}: CategorySearchParams): Promise<FetchCategoriesResponse> {
  return api.get("/categories", {
    params: { page, limit, query },
  });
}
