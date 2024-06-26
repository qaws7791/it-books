import fetchCategories from "@/src/feature/categories/api/fetch-categories";
import fetchCategory from "@/src/feature/categories/api/fetch-category";
import categoryQueryKeys from "@/src/feature/categories/hooks/queries/query-keys";
import { CategorySearchParams } from "@/src/feature/categories/types";
import { queryOptions } from "@tanstack/react-query";

export const categoriesOptions = ({
  page = 1,
  limit = 10,
  query,
}: CategorySearchParams) => {
  return queryOptions({
    queryKey: categoryQueryKeys.fetchCategoriesPagination({
      page,
      limit,
      query,
    }).queryKey,
    queryFn: () => fetchCategories({ page, limit, query }),
  });
};

export const categoryOptions = (categoryId: number) => {
  return queryOptions({
    queryKey: categoryQueryKeys.fetchCategory(categoryId).queryKey,
    queryFn: () => fetchCategory(categoryId),
  });
};
