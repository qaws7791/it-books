import { BookStatus } from "@/src/feature/books/constants";
import api from "@/src/feature/shared/api";

export interface CreateBookInput {
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

export default function createBook(input: CreateBookInput): Promise<void> {
  return api.post("/books", input);
}
