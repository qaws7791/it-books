import { BookDetail } from "@/src/feature/books/types";
import api from "@/src/feature/shared/api";

export interface GetBookBySlugOutput extends BookDetail {}

export default function getBookBySlug(
  bookSlug: string,
): Promise<GetBookBySlugOutput> {
  return api.get("/books/slug/" + bookSlug);
}
