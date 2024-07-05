import { PaginationCommonInput } from "@/src/feature/shared/type/api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const listQueryKeys = createQueryKeys("lists", {
  fetchLists: (params: PaginationCommonInput) => ["pagination", params],
  fetchListBySlug: (slug: string) => ["slug", slug],
  fetchListById: (id: number) => ["id", id],
});

export default listQueryKeys;
