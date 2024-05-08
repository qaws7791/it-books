import { useSuspenseQuery } from "@tanstack/react-query";
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

export default function GetBookById(
  bookId: number
): Promise<GetBookByIdOutput> {
  return api.get("/books/" + bookId);
}

export const useBookById = (bookId: number) => {
  return useSuspenseQuery({
    queryKey: ["book", bookId],
    queryFn: () => GetBookById(bookId),
  });
};
