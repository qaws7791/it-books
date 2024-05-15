import { BookStatus } from "@/src/books/constants";
import api from "@/src/shared/api";

export interface PutBookInput {
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

interface PutBookOutput {
  id: number;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string[];
  translator: string[];
  publisher: string;
  publishedDate: string;
  status: BookStatus;
  pages: number;
}

export default function putBook(
  bookId: number,
  input: PutBookInput,
): Promise<PutBookOutput> {
  return api.put("/books/" + bookId, input);
}
