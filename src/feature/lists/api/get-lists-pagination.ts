import { ListPreview } from "@/src/feature/lists/types";
import api from "@/src/feature/shared/api";
import {
  PaginationCommonInput,
  PaginationResponse,
} from "@/src/feature/shared/type/api";

export interface GetListsPaginationOutput {
  data: ListPreview[];
  pagination: PaginationResponse;
}

export default function getListsPagination({
  page = 1,
  limit = 10,
}: PaginationCommonInput): Promise<GetListsPaginationOutput> {
  return api.get("/lists", { params: { page, limit } });
}
