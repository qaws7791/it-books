import { PaginationCommonInput } from "@/src/feature/shared/type/api";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const listQueryKeys = createQueryKeys("lists", {
  fetchLists: (params: PaginationCommonInput) => ["pagination", params],
});

export default listQueryKeys;
