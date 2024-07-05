"use client";

import BookPreview from "@/src/feature/books/components/book-preview";
import { BookWithCategory } from "@/src/feature/books/types";

interface BooksListProps {
  books: BookWithCategory[];
}

export default function BookList({ books }: BooksListProps) {
  return (
    <div className="grid grid-cols-card gap-4">
      {books.map((book) => (
        <BookPreview key={book.slug} book={book} />
      ))}
    </div>
  );
}
