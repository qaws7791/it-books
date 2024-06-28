"use client";

import BookCreateForm from "@/src/feature/books/components/book-create-form";
import { bookByIdOptions } from "@/src/feature/books/hooks/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

interface BookUpdateFormProperties {
  bookId: number;
}

export default function BookUpdateForm({ bookId }: BookUpdateFormProperties) {
  const { data: book } = useSuspenseQuery(bookByIdOptions(bookId));

  return <BookCreateForm book={book} />;
}
