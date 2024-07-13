import BookList from "@/src/app/(common)/books/book-list";
import CategoryBooksView from "@/src/app/(common)/books/category-books-view";
import fetchBooks from "@/src/feature/books/api/fetch-books";
import { sortOptions } from "@/src/feature/books/constants";
import { booksOptions } from "@/src/feature/books/hooks/queries";
import LocalCategoryList from "@/src/feature/categories/components/local-category-list";
import { getLocalCategory } from "@/src/feature/categories/helpers";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import QueryString from "@/src/feature/shared/utils/querystring";
import Spinner from "@/src/ui/components/spinner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";
import { z } from "zod";

// categories about it books

interface BooksPageProps {
  searchParams: {
    page?: string;
    category?: string;
    sort?: "latest" | "publishedAt" | "pageLow";
  };
}

export function generateMetadata({ searchParams }: BooksPageProps): Metadata {
  const category = searchParams.category
    ? getLocalCategory(searchParams.category)
    : null;
  const page = QueryString.toNumber(searchParams.page);
  const title = category ? `${category.name}` : "책 목록";
  return {
    title: title + (page ? ` - ${page} 페이지` : ""),
  };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const categorySlug = searchParams["category"];
  const category = categorySlug ? getLocalCategory(categorySlug) : undefined;
  const sort =
    z.enum(["latest", "publishedAt", "pageLow"]).safeParse(searchParams["sort"])
      ?.data ?? "latest";

  const sortOption = sortOptions[sort];
  const orderBy = sortOption.orderBy;
  const order = sortOption.order;

  // books in category page
  if (category) {
    const page = QueryString.toNumber(searchParams.page) ?? 1;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      booksOptions({ limit: 12, page, categorySlug, orderBy, order }),
    );
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageContainer>
          <CategoryBooksView
            sort={sortOption}
            category={category}
            page={page}
            limit={12}
          />
        </PageContainer>
      </HydrationBoundary>
    );
  }

  // books in home page
  const { data: books } = await fetchBooks({ page: 1, limit: 12 });

  return (
    <PageContainer>
      <h1 className="sr-only">Books</h1>
      <section className="flex items-center justify-center w-full h-96 rounded-3xl bg-surface-container mb-16 ">
        <h2 className="text-4xl font-bold">책 목록</h2>
      </section>
      <h2 className="text-2xl font-bold my-8">카테고리</h2>
      <LocalCategoryList />
      <h2 className="text-2xl font-bold my-8">책 목록</h2>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <BookList books={books} />
      </Suspense>
    </PageContainer>
  );
}
