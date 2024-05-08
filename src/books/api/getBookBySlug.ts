import { useSuspenseQuery } from "@tanstack/react-query";
import api from "@/src/shared/api";
import { BookDetail } from "@/src/books/types";

export interface GetBookBySlugOutput extends BookDetail {}

export default function GetBookBySlug(
  bookSlug: string
): Promise<GetBookBySlugOutput> {
  return api.get("/books/slug/" + bookSlug);
}

export const useBookBySlug = (bookSlug: string) => {
  return useSuspenseQuery({
    queryKey: ["book", bookSlug],
    queryFn: () => GetBookBySlug(bookSlug),
  });
};
