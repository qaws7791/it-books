import BookList from "@/src/app/(common)/books/book-list";
import fetchBooks from "@/src/feature/books/api/fetch-books";
import CommonPagination from "@/src/feature/shared/components/common-pagination";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

interface BookDetailPageProperties {
  params: {
    slug: string;
    page?: string;
  };
}

export function generateMetadata({
  params,
}: BookDetailPageProperties): Metadata {
  const decodedQuery = decodeURIComponent(params.slug || "");

  return {
    title: `#${decodedQuery}`,
  };
}

export default async function TaggedBooksPage({
  params,
}: BookDetailPageProperties) {
  const decodedSlug = decodeURIComponent(params.slug);
  const page = params.page ? Number.parseInt(params.page, 10) : 1;
  const { data: books, pagination } = await fetchBooks({
    tag: decodedSlug,
    page: 1,
    limit: 20,
  });

  return (
    <PageContainer>
      <h1 className="text-4xl text-center my-8">#{decodedSlug}</h1>
      <BookList books={books} />
      <CommonPagination currentPage={page} totalPages={pagination.lastPage} />
    </PageContainer>
  );
}
