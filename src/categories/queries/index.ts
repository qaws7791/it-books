import { getCategories } from "@/src/categories/api/get-categories";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

export const categoryQueryKeys = createQueryKeys("categories", {
  fetchCategories: () => ["categories"],
});

export const useCategoriesQuery = () => {
  return useSuspenseQuery({
    queryKey: categoryQueryKeys.fetchCategories().queryKey,
    queryFn: getCategories,
  });
};
