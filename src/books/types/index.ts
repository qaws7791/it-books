import { Category } from "@/src/categories/types";
import { Tag } from "@/src/tags/types";

export interface Book {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string;
  translator: string | null;
  publisher: string;
  publishedDate: string;
}

export interface BookWithCategory extends Book {
  category: Category;
}

export interface BookDetail extends Book {
  category: Category;
  tags: Tag[];
}
