import { Category, CategorySearchParams } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";
import { PaginationResponse } from "@/src/feature/shared/type/api";

interface GetCategoriesResponse {
  data: Category[];
  pagination: PaginationResponse;
}

export const getCategories = ({
  page,
  limit,
  query,
}: CategorySearchParams): Promise<GetCategoriesResponse> => {
  return api.get("/categories", {
    params: { page, limit, query },
  });
};
