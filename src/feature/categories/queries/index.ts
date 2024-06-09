import { getCategories } from "@/src/feature/categories/api/get-categories";
import { CategorySearchParams } from "@/src/feature/categories/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

export const categoryQueryKeys = createQueryKeys("categories", {
  fetchCategories: () => ["categories"],
  fetchCategoriesPagination: (params: CategorySearchParams) => [
    "search",
    params,
  ],
});

export const useCategoriesQuery = ({
  page = 1,
  limit = 10,
  query,
}: CategorySearchParams) => {
  return useSuspenseQuery({
    queryKey: categoryQueryKeys.fetchCategoriesPagination({
      page,
      limit,
      query,
    }).queryKey,
    queryFn: () => getCategories({ page, limit, query }),
  });
};
