import BookList from "@/src/app/(common)/books/book-list";
import fetchBooks from "@/src/feature/books/api/fetch-books";
import CommonPagination from "@/src/feature/shared/components/common-pagination";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import QueryString from "@/src/feature/shared/utils/querystring";
import { Metadata } from "next";

interface BookDetailPageProperties {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export function generateMetadata({
  params,
  searchParams,
}: BookDetailPageProperties): Metadata {
  const decodedQuery = decodeURIComponent(params.slug || "");
  const page = QueryString.toNumber(searchParams.page);
  return {
    title: `#${decodedQuery}` + (page ? ` - ${page} 페이지` : ""),
  };
}

export default async function TaggedBooksPage({
  params,
  searchParams,
}: BookDetailPageProperties) {
  const decodedSlug = decodeURIComponent(params.slug);
  const page = QueryString.toNumber(searchParams.page) ?? 1;
  const { data: books, pagination } = await fetchBooks({
    tag: decodedSlug,
    page: page,
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
