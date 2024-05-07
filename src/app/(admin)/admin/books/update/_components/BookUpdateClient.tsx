"use client";
import BookUpdateForm from "@web/src/app/(admin)/admin/books/update/_components/BookUpdateForm";
import { useBookById } from "@web/src/books/api/getBookById";

interface BookUpdateClientProps {
  bookId: number;
}

export default function BookUpdateClient({ bookId }: BookUpdateClientProps) {
  const { data: book } = useBookById(bookId);

  return <BookUpdateForm book={book} />;
}
