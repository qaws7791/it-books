import { useSuspenseQuery } from "@tanstack/react-query";
import { Category } from "@web/src/categories/types";
import api from "@web/src/shared/api";
import { AxiosPromise } from "axios";

interface GetCategoriesResponse {
  data: Category[];
}

export const getCategories = (): Promise<GetCategoriesResponse> => {
  return api.get("/categories");
};

export const useCategoriesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
