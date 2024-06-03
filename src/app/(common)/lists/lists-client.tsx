"use client";
import DUMMY from "@/src/dummy";
import BookCoversPreview from "@/src/feature/books/components/book-covers-preview";
import Link from "next/link";

export default function ListsClient() {
  const data = DUMMY.LISTS;
  return (
    <div className="grid grid-cols-card-lg gap-4">
      {data.map((list) => (
        <Link
          href={`/lists/${list.slug}`}
          key={list.id}
          className="rounded-xl overflow-hidden hover:bg-outline/10 flex flex-col shadow"
        >
          <div className="p-4 rounded-xl ">
            <BookCoversPreview books={list.books} count={list.count} />
          </div>
          <h2 className="font-medium text-left text-xl p-4">{list.name}</h2>
        </Link>
      ))}
    </div>
  );
}
