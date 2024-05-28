import api from "@/src/shared/api";

interface CreateListInput {
  title: string;
  slug: string;
  description: string;
  bookIds: number[];
}

interface CreateListOutput {
  id: number;
}

export default function createList(
  input: CreateListInput,
): Promise<CreateListOutput> {
  return api.post("/lists", input);
}
