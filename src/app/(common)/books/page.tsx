import BookList from "@/src/app/(common)/books/book-list";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

interface BooksPageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata: Metadata = {
  title: "책 목록",
};

export default function BooksPage({ searchParams }: BooksPageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;

  return (
    <PageContainer>
      <h1 className="sr-only">Books</h1>
      <BookList page={page} limit={12} />
    </PageContainer>
  );
}
