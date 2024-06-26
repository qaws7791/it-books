import { CategorySearchParams } from "@/src/feature/categories/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const categoryQueryKeys = createQueryKeys("categories", {
  fetchCategoriesPagination: (params: CategorySearchParams) => [
    "search",
    params,
  ],
  fetchCategory: (categoryId: number) => [categoryId],
});

export default categoryQueryKeys;
