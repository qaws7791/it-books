import { BookDetail } from "@/src/feature/books/types";
import api from "@/src/feature/shared/api";

export interface FetchBookBySlugOutput extends BookDetail {}

export default function fetchBookBySlug(
  bookSlug: string,
): Promise<FetchBookBySlugOutput> {
  return api.get("/books/slug/" + bookSlug);
}
