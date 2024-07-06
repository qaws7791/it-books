"use client";
import BookList from "@/src/app/(common)/books/book-list";
import CategoryChip from "@/src/app/(common)/books/category-chip";
import { booksOptions } from "@/src/feature/books/hooks/queries";
import { LocalCategory } from "@/src/feature/categories/types";
import CommonPagination from "@/src/feature/shared/components/common-pagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface CategoryBooksViewProps {
  category: LocalCategory;
  page: number;
  limit: number;
}

export default function CategoryBooksView({
  category,
  page,
  limit,
}: CategoryBooksViewProps) {
  const categorySlug = category.name === "전체" ? undefined : category.slug;
  const {
    data: { data: books, pagination },
  } = useSuspenseQuery(booksOptions({ page, limit, categorySlug }));

  // 만약 페이지가 마지막 페이지보다 크다면 첫 페이지로 리다이렉트
  if (pagination.currentPage > pagination.lastPage) {
    redirect(`/books?category=${category.slug}&page=1`);
  }

  return (
    <div>
      <h1 className="sr-only">{category.name}</h1>
      <p className="text-2xl my-4 text-center">
        {category.name} - {pagination.total}권의 책
      </p>
      <div id="filters" className="p-4 flex justify-center items-center">
        <CategoryChip category={category} />
      </div>
      <BookList books={books} />
      <CommonPagination currentPage={page} totalPages={pagination.lastPage} />
    </div>
  );
}
