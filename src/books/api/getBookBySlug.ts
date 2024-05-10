import api from "@/src/shared/api";
import { BookDetail } from "@/src/books/types";

export interface GetBookBySlugOutput extends BookDetail {}

export default function getBookBySlug(
  bookSlug: string
): Promise<GetBookBySlugOutput> {
  return api.get("/books/slug/" + bookSlug);
}
