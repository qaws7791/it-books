"use client";
import { listsOptions } from "@/src/feature/lists/hooks/queries";
import CommonPagination from "@/src/feature/shared/components/common-pagination";
import NextImage from "@/src/feature/shared/components/next-image";
import Card, {
  CardContent,
  CardSubTitle,
  CardTitle,
} from "@/src/ui/components/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

interface ListsClientProps {
  page?: number;
  limit?: number;
}

export default function ListsClient({ page, limit }: ListsClientProps) {
  const {
    data: { data: lists, pagination },
  } = useSuspenseQuery(listsOptions({ page, limit }));

  return (
    <div>
      <div className="grid grid-cols-card-lg gap-4">
        {lists.map((list) => {
          const books = list.listItems.flatMap((item) => item.book);
          return (
            <Card variant="elevated" key={list.id} asChild>
              <Link
                href={`/lists/${list.slug}`}
                key={list.id}
                className="cursor-pointer"
              >
                <div className="rounded-xl flex h-40">
                  {books.map((book) => (
                    <div key={book.id} className="flex-1">
                      <NextImage
                        key={book.id}
                        src={book.coverImage}
                        alt={book.title}
                        width={200}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                <CardContent>
                  <CardTitle>{list.title}</CardTitle>
                  <CardSubTitle>{list.bookCount} 권</CardSubTitle>
                </CardContent>
              </Link>
            </Card>
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
