"use client";
import BookUpdateForm from "@/src/app/(admin)/admin/books/update/_components/BookUpdateForm";
import { useBookById } from "@/src/books/queries";

interface BookUpdateClientProps {
  bookId: number;
}

export default function BookUpdateClient({ bookId }: BookUpdateClientProps) {
  const { data: book } = useBookById(bookId);

  return <BookUpdateForm book={book} />;
}
