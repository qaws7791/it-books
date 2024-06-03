"use client";
import BookCoversPreview from "@/src/feature/books/components/book-covers-preview";
import { ListPreview } from "@/src/feature/lists/types";
import Link from "next/link";

interface ListsClientProps {
  lists: ListPreview[];
}

export default function ListsClient({ lists }: ListsClientProps) {
  const books = lists
    .flatMap((list) => list.listItems)
    .map((item) => item.book);
  return (
    <div className="grid grid-cols-card-lg gap-4">
      {lists.map((list) => (
        <Link
          href={`/lists/${list.slug}`}
          key={list.id}
          className="rounded-xl overflow-hidden hover:bg-outline/10 flex flex-col shadow"
        >
          <div className="p-4 rounded-xl ">
            <BookCoversPreview books={books} count={list.bookCount} />
          </div>
          <h2 className="font-medium text-left text-xl p-4">{list.title}</h2>
        </Link>
      ))}
    </div>
  );
}
