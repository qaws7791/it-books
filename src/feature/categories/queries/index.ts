import { getCategories } from "@/src/feature/categories/api/get-categories";
import { getCategory } from "@/src/feature/categories/api/get-category";
import { CategorySearchParams } from "@/src/feature/categories/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

export const categoryQueryKeys = createQueryKeys("categories", {
  fetchCategoriesPagination: (params: CategorySearchParams) => [
    "search",
    params,
  ],
  fetchCategory: (categoryId: number) => [categoryId],
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

export const useCategoryQuery = (categoryId: number) => {
  return useSuspenseQuery({
    queryKey: categoryQueryKeys.fetchCategory(categoryId).queryKey,
    queryFn: () => getCategory(categoryId),
  });
};
