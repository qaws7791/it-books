import fetchListById from "@/src/feature/lists/api/fetch-list-by-id";
import fetchListBySlug from "@/src/feature/lists/api/fetch-list-by-slug";
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

export const listBySlugOptions = (slug: string) => {
  return queryOptions({
    queryKey: listQueryKeys.fetchListBySlug(slug).queryKey,
    queryFn: () => fetchListBySlug(slug),
  });
};

export const listByIdOptions = (id: number) => {
  return queryOptions({
    queryKey: listQueryKeys.fetchListById(id).queryKey,
    queryFn: () => fetchListById(id),
  });
};
