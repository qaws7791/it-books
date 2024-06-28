import { UpdateCategoryInput } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";

export default function updateCategory({
  id,
  ...input
}: UpdateCategoryInput): Promise<void> {
  return api.put(`/categories/${id}`, input);
}
