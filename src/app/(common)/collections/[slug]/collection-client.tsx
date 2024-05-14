"use client";

import { BookWithCategory } from "@/src/books/types";
import { arrayToStringWithComma } from "@/src/shared/utils";
import Image from "next/image";
import Link from "next/link";

interface CollectionClientProps {
  books: BookWithCategory[];
}

export default function CollectionClient({ books }: CollectionClientProps) {
  return (
    <div className="grid grid-cols-card gap-4">
      {books.map((book) => (
        <Link
          href={`/books/${book.slug}`}
          key={book.id}
          className="rounded-xl hover:bg-outline/10 p-4"
        >
          <div className="flex justify-center">
            <div className="relative book-border">
              <Image
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
