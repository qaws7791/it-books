"use client";

import BookCreateForm from "@/src/feature/books/components/book-create-form";
import { useBookById } from "@/src/feature/books/queries";

interface BookUpdateFormProperties {
  bookId: number;
}

export default function BookUpdateForm({ bookId }: BookUpdateFormProperties) {
  const { data: book } = useBookById(bookId);

  return <BookCreateForm book={book} />;
}
