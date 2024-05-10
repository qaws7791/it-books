import { Category } from "@/src/categories/types";
import api from "@/src/shared/api";

interface GetCategoriesResponse {
  data: Category[];
}

export const getCategories = (): Promise<GetCategoriesResponse> => {
  return api.get("/categories");
};
