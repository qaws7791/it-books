import { BookStatus } from "@/src/feature/books/constants";
import api from "@/src/feature/shared/api";

export interface FetchBookOutput {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string[];
  translators: string[];
  publisher: string;
  publishedDate: string;
  status: BookStatus;
  pages: number;
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  tags: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export default function fetchBook(bookId: number): Promise<FetchBookOutput> {
  return api.get("/books/" + bookId);
}
