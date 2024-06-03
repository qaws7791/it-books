import { BookDetail } from "@/src/feature/books/types";

export interface ListItem {
  id: number;
  itemOrder: number;
  book: Pick<BookDetail, "id" | "title" | "coverImage">;
}

export interface ListItemDetail {
  id: number;
  itemOrder: number;
  book: BookDetail;
}

export interface ListPreview {
  id: number;
  title: string;
  slug: string;
  listItems: ListItem[];
  bookCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListDetails {
  id: number;
  title: string;
  slug: string;
  description: string;
  listItems: ListItemDetail[];
  createdAt: string;
  updatedAt: string;
}
