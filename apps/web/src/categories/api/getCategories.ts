import { useSuspenseQuery } from "@tanstack/react-query";
import { Category } from "@web/src/categories/types";
import api from "@web/src/shared/api";
import { AxiosPromise } from "axios";

export const getCategories = (): Promise<Category[]> => {
  return api.get("/categories");
};

export const useCategoriesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
