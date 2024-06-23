"use client";
import BookPreview from "@/src/feature/books/components/book-preview";
import { useUserLikesPagination } from "@/src/feature/user/queries";
import Button from "@/src/ui/components/button";
import { useEffect, useRef } from "react";

export default function LikesList({ userId }: { userId: number }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserLikesPagination({ page: 1, limit: 2, userId });
  const fetchMoreButtonRef = useRef<HTMLButtonElement>(null);

  const books = data.pages.flatMap((page) => page.data);

  useEffect(() => {
    if (fetchMoreButtonRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          console.log(entry);
          if (entry.isIntersecting) {
            void fetchNextPage();
          }
        },
        {
          rootMargin: "0px 0px 100px 0px",
        },
      );
      observer.observe(fetchMoreButtonRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [fetchNextPage, data]);

  return (
    <div className="mt-12">
      <div className="grid grid-cols-card gap-4">
        {books.map((book) => (
          <BookPreview key={book.slug} book={book} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          ref={fetchMoreButtonRef}
          onClick={() => {
            if (hasNextPage) {
              void fetchNextPage();
            }
          }}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "불러오는 중"
            : hasNextPage
              ? "더 불러오기"
              : "더 이상 불러올 내용이 없습니다"}
        </Button>
      </div>
    </div>
  );
}
