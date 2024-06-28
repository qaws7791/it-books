import { ListDetails } from "@/src/feature/lists/types";
import api from "@/src/feature/shared/api";

export default function fetchListBySlug(
  listSlug: string,
): Promise<ListDetails> {
  return api.get("/lists/slug/" + listSlug);
}
