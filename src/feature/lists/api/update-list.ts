import api from "@/src/feature/shared/api";

interface UpdateListInput {
  title: string;
  slug: string;
  description: string;
  bookIds: number[];
  id: number;
}

interface UpdateListOutput {
  id: number;
}

export default function updateList({
  id,
  ...input
}: UpdateListInput): Promise<UpdateListOutput> {
  return api.put("/lists/" + id, input);
}
