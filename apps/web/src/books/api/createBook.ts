import api from "@web/src/shared/api";

interface CreateBookInput {
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string;
  translator?: string;
  publisher: string;
  publishedDate: string;
  categoryId: number;
  tags: string[];
}

interface CreateBookOutput {
  id: number;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string;
  translator: string;
  publisher: string;
  publishedDate: string;
}

export default function createBook(
  input: CreateBookInput
): Promise<CreateBookOutput> {
  return api.post("/books", input);
}
