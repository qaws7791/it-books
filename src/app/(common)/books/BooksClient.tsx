"use client";
import { useBooksPagination } from "@/src/books/queries";
import { imageLoader } from "@/src/shared/utils";
import Image from "next/image";
import Link from "next/link";

export default function BooksClient() {
  const { data } = useBooksPagination();
  const books = data?.data;
  return (
    <div className="grid grid-cols-card gap-4 overflow-y-auto">
      {books.map((book) => (
        <Link
          href={`/books/${book.slug}`}
          key={book.id}
          className="rounded-xl overflow-hidden hover:bg-outline/10 p-4"
        >
          <div>
            <Image
              loader={imageLoader}
              src={book.coverImage}
              alt={book.title}
              className="shadow-md mx-auto"
              width={200}
              height={300}
            />
          </div>
          <h2 className="font-bold text-center mt-2">{book.title}</h2>
          <p className="text-outline text-center">{book.authors}</p>
        </Link>
      ))}
    </div>
  );
}
