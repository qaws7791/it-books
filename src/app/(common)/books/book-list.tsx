"use client";

import BookPreview from "@/src/feature/books/components/book-preview";
import { useBooksPagination } from "@/src/feature/books/queries";
import CommonPagination from "@/src/feature/shared/components/common-pagination";

interface BooksListProps {
  page?: number;
  limit?: number;
}

export default function BookList({ page, limit }: BooksListProps) {
  const {
    data: { data: books, pagination },
  } = useBooksPagination({ page, limit });

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
