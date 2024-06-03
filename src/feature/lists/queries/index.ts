import getListsPagination from "@/src/feature/lists/api/get-lists-pagination";
import { PaginationCommonInput } from "@/src/feature/shared/type/api";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

export const listQueryKeys = createQueryKeys("lists", {
  fetchListsPagination: (params: PaginationCommonInput) => [
    "pagination",
    params,
  ],
});

export function useListsPagination({
  page = 1,
  limit = 10,
}: PaginationCommonInput) {
  return useSuspenseQuery({
    queryKey: listQueryKeys.fetchListsPagination({ page, limit }).queryKey,
    queryFn: () => getListsPagination({ page, limit }),
  });
}
