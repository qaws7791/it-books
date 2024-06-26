import fetchLists from "@/src/feature/lists/api/fetch-lists";
import listQueryKeys from "@/src/feature/lists/hooks/queries/query-keys";
import { PaginationCommonInput } from "@/src/feature/shared/type/api";
import { queryOptions } from "@tanstack/react-query";

export const listsOptions = ({
  page = 1,
  limit = 10,
}: PaginationCommonInput) => {
  return queryOptions({
    queryKey: listQueryKeys.fetchLists({ page, limit }).queryKey,
    queryFn: () => fetchLists({ page, limit }),
  });
};
