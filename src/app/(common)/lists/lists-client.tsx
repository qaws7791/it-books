"use client";
import BookCoversPreview from "@/src/feature/books/components/book-covers-preview";
import { useListsPagination } from "@/src/feature/lists/queries";
import CommonPagination from "@/src/feature/shared/components/common-pagination";
import Link from "next/link";

interface ListsClientProps {
  page?: number;
  limit?: number;
}

export default function ListsClient({ page, limit }: ListsClientProps) {
  const {
    data: { data: lists, pagination },
  } = useListsPagination({ page, limit });
  return (
    <div>
      <div className="grid grid-cols-card-lg gap-4">
        {lists.map((list) => {
          const books = list.listItems.flatMap((item) => item.book);
          return (
            <Link
              href={`/lists/${list.slug}`}
              key={list.id}
              className="rounded-xl overflow-hidden hover:bg-outline/10 flex flex-col shadow"
            >
              <div className="p-4 rounded-xl ">
                <BookCoversPreview books={books} count={list.bookCount} />
              </div>
              <h2 className="font-medium text-left text-xl p-4">
                {list.title}
              </h2>
            </Link>
          );
        })}
      </div>
      <CommonPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.lastPage}
      />
    </div>
  );
}
