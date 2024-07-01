import { ListDetails } from "@/src/feature/lists/types";
import api from "@/src/feature/shared/api";

export default function fetchListById(listId: number): Promise<ListDetails> {
  return api.get("/lists/" + listId);
}
