import { Category } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";

export const getCategory = (categoryId: number): Promise<Category> => {
  return api.get("/categories/" + categoryId);
};
