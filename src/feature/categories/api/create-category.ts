import { CreateCategoryInput } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";

export default function createCategory(
  dto: CreateCategoryInput,
): Promise<void> {
  return api.post("/categories", dto);
}
