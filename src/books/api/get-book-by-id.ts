import api from "@/src/shared/api";

export interface GetBookByIdOutput {
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

export default function getBookById(
  bookId: number,
): Promise<GetBookByIdOutput> {
  return api.get("/books/" + bookId);
}
