import BooksClient from "@/src/app/(common)/books/books-client";
import getBooksPagination from "@/src/books/api/get-books-pagination";
import PageContainer from "@/src/shared/components/layout/page-container";
import { Metadata } from "next";

interface BooksPageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export const metadata: Metadata = {
  title: "책 목록",
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? Number.parseInt(searchParams.limit) : 10;
  const { data } = await getBooksPagination({ page, limit });

  return (
    <PageContainer>
      <h1 className="sr-only">Books</h1>
      <BooksClient books={data} />
    </PageContainer>
  );
}
