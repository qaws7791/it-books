import { BookStatus } from "@/src/feature/books/constants";
import { Category } from "@/src/feature/categories/types";
import { PaginationCommonInput } from "@/src/feature/shared/type/api";
import { Tag } from "@/src/feature/tags/types";

export interface Book {
  id: number;
  createdAt: string;
  updatedAt: string;
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

export interface BookWithCategory extends Book {
  category: Category;
}

export interface BookDetail extends Book {
  category: Category;
  tags: Tag[];
}

export interface BookSearchParams extends PaginationCommonInput {
  query?: string;
  categorySlug?: string;
}
