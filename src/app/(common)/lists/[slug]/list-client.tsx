"use client";

import { ListItemDetail } from "@/src/feature/lists/types";
import NextImage from "@/src/feature/shared/components/next-image";
import { arrayToStringWithComma } from "@/src/feature/shared/utils";
import Link from "next/link";

interface ListClientProps {
  listItems: ListItemDetail[];
}

export default function ListClient({ listItems }: ListClientProps) {
  return (
    <div className="grid grid-cols-card gap-4">
      {listItems.map((listItem) => {
        const book = listItem.book;
        return (
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
        );
      })}
    </div>
  );
}
