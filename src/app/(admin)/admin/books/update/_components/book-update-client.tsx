"use client";
import BookUpdateForm from "@/src/app/(admin)/admin/books/update/_components/book-update-form";
import { useBookById } from "@/src/feature/books/queries";

interface BookUpdateClientProperties {
  bookId: number;
}

export default function BookUpdateClient({
  bookId,
}: BookUpdateClientProperties) {
  const { data: book } = useBookById(bookId);

  return <BookUpdateForm book={book} />;
}
