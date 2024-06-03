import { ListDetails } from "@/src/feature/lists/types";
import api from "@/src/feature/shared/api";

export default function getListBySlug(listSlug: string): Promise<ListDetails> {
  return api.get("/lists/slug/" + listSlug);
}
