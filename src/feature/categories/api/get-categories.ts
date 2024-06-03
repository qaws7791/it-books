import { Category } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";

interface GetCategoriesResponse {
  data: Category[];
}

export const getCategories = (): Promise<GetCategoriesResponse> => {
  return api.get("/categories");
};
