import { BookStatus } from "@/src/feature/books/constants";
import api from "@/src/feature/shared/api";

export interface UpdateBookInput {
  id: number;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string[];
  translators: string[];
  publisher: string;
  publishedDate: string;
  categoryId: number;
  tags: string[];
  status: BookStatus;
  pages: number;
}

export default function updateBook({
  id,
  ...input
}: UpdateBookInput): Promise<void> {
  return api.put("/books/" + id, input);
}
