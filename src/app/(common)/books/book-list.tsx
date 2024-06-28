"use client";

import BookPreview from "@/src/feature/books/components/book-preview";
import { booksOptions } from "@/src/feature/books/hooks/queries";
import CommonPagination from "@/src/feature/shared/components/common-pagination";
import { useSuspenseQuery } from "@tanstack/react-query";

interface BooksListProps {
  page?: number;
  limit?: number;
  categorySlug?: string;
}

export default function BookList({
  page,
  limit,
  categorySlug,
}: BooksListProps) {
  const {
    data: { data: books, pagination },
  } = useSuspenseQuery(booksOptions({ page, limit, categorySlug }));

  return (
    <div className="mt-12">
      <div className="grid grid-cols-card gap-4">
        {books.map((book) => (
          <BookPreview key={book.slug} book={book} />
        ))}
      </div>
      <CommonPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.lastPage}
      />
    </div>
  );
}
