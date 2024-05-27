import { BookWithCategory } from "@/src/books/types";

export interface List {
  id: number;
  name: string;
  slug: string;
  description: string;
  books: BookWithCategory[];
  count: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListDetails {
  id: number;
  name: string;
  description: string;
  books: BookWithCategory[];
  count: number;
  createdAt: string;
  updatedAt: string;
}
