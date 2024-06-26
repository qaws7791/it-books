import BookList from "@/src/app/(common)/books/book-list";
import { booksOptions } from "@/src/feature/books/hooks/queries";
import LocalCategoryList from "@/src/feature/categories/components/local-category-list";
import { getLocalCategory } from "@/src/feature/categories/helpers";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import Spinner from "@/src/ui/components/spinner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";

// categories about it books

interface BooksPageProps {
  searchParams: {
    page?: string;
    category?: string;
  };
}

export function generateMetadata({ searchParams }: BooksPageProps): Metadata {
  const category = searchParams.category
    ? getLocalCategory(searchParams.category)
    : null;
  const title = category ? `${category.name}` : "책 목록";
  return {
    title: title,
  };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const categorySlug = searchParams["category"];
  const category = categorySlug ? getLocalCategory(categorySlug) : undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(booksOptions({ page, categorySlug }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <h1 className="sr-only">Books</h1>
        <section className="flex items-center justify-center w-full h-96 rounded-3xl bg-surface-container mb-16 ">
          <h2 className="text-4xl font-bold">
            {category ? category.name : "책 목록"}
          </h2>
        </section>
        <h2 className="text-2xl font-bold my-8">카테고리</h2>
        <LocalCategoryList currentCategory={category} />
        <h2 className="text-2xl font-bold my-8">책 목록</h2>
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
        >
          <BookList page={page} limit={12} categorySlug={categorySlug} />
        </Suspense>
      </PageContainer>
    </HydrationBoundary>
  );
}
