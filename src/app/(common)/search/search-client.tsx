"use client";
import { useBooksPagination } from "@/src/books/queries";
import NextImage from "@/src/shared/components/next-image";
import { arrayToStringWithComma } from "@/src/shared/utils";
import Link from "next/link";

interface SearchClientProperties {
  page?: number;
  limit?: number;
  query?: string;
}

export default function SearchClient({
  page,
  limit,
  query,
}: SearchClientProperties) {
  const { data: books } = useBooksPagination({ page, limit, query });

  return (
    <div className="grid grid-cols-card gap-4">
      {books.data.map((book) => (
        <Link
          href={`/books/${book.slug}`}
          key={book.id}
          className="rounded-xl hover:bg-outline/10 p-4"
        >
          <div className="flex justify-center">
            <div className="relative book-border">
              <NextImage
                src={book.coverImage}
                alt={book.title}
                className="relative overflow-hidden mx-auto shadow-elevation shadow-black/15"
                width={200}
                height={300}
              />
            </div>
          </div>
          <h2 className="font-bold text-center mt-2">{book.title}</h2>
          <p className="text-outline text-center">
            {arrayToStringWithComma(book.authors)}
          </p>
        </Link>
      ))}
    </div>
  );
}
