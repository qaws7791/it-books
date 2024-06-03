import { BookStatus } from "@/src/feature/books/constants";
import api from "@/src/feature/shared/api";

export interface CreateBookInput {
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string[];
  translator: string[];
  publisher: string;
  publishedDate: string;
  categoryId: number;
  tags: string[];
  status: BookStatus;
  pages: number;
}

interface CreateBookOutput {
  id: number;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string;
  translator: string;
  publisher: string;
  publishedDate: string;
  status: BookStatus;
  pages: number;
}

export default function createBook(
  input: CreateBookInput,
): Promise<CreateBookOutput> {
  return api.post("/books", input);
}
