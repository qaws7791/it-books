import SearchClient from "@/src/app/(common)/search/search-client";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import QueryString from "@/src/feature/shared/utils/querystring";
import { Metadata } from "next";

interface SearchPageProperties {
  searchParams: {
    query?: string;
    page?: string;
    limit?: string;
  };
}

export function generateMetadata({
  searchParams,
}: SearchPageProperties): Metadata {
  const decodedQuery = decodeURIComponent(searchParams.query || "");
  const page = QueryString.toNumber(searchParams.page);
  return {
    title: `"${decodedQuery}" 검색 결과` + (page ? ` - ${page} 페이지` : ""),
  };
}

export default function SearchPage({ searchParams }: SearchPageProperties) {
  if (!searchParams.query) {
    return (
      <PageContainer>
        <h1 className="text-4xl text-center">검색어를 입력해주세요.</h1>
      </PageContainer>
    );
  }

  const decodedQuery = decodeURIComponent(searchParams.query);
  const page = QueryString.toNumber(searchParams.page);
  const limit = QueryString.toNumber(searchParams.limit);
  return (
    <PageContainer>
      <h1 className="text-4xl text-center">
        &quot;{decodedQuery}&quot; 검색 결과
      </h1>
      <SearchClient query={decodedQuery} page={page} limit={limit} />
    </PageContainer>
  );
}
