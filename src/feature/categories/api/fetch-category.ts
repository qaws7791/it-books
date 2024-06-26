import { Category } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";

export default function fetchCategory(categoryId: number): Promise<Category> {
  return api.get("/categories/" + categoryId);
}
