import SearchClient from "@/src/app/(common)/search/search-client";
import PageContainer from "@/src/shared/components/layout/page-container";

interface SearchPageProperties {
  searchParams: {
    query?: string;
    page?: string;
    limit?: string;
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

  return (
    <PageContainer>
      <h1 className="text-4xl text-center">
        &quot;{decodedQuery}&quot; 검색 결과
      </h1>
      <SearchClient
        query={decodedQuery}
        page={
          searchParams.page ? Number.parseInt(searchParams.page) : undefined
        }
        limit={
          searchParams.limit ? Number.parseInt(searchParams.limit) : undefined
        }
      />
    </PageContainer>
  );
}
