import ListsClient from "@/src/app/(common)/lists/lists-client";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import QueryString from "@/src/feature/shared/utils/querystring";
import { Metadata } from "next";

export function generateMetadata({ searchParams }: ListsPageProps): Metadata {
  const page = QueryString.toNumber(searchParams.page);
  return {
    title: "리스트" + (page ? ` - ${page} 페이지` : ""),
  };
}

interface ListsPageProps {
  searchParams: {
    page?: string;
  };
}

export default function CollectionsPage({ searchParams }: ListsPageProps) {
  const page = QueryString.toNumber(searchParams.page);
  return (
    <PageContainer>
      <h1 className="sr-only">Collections</h1>
      <ListsClient page={page} limit={12} />
    </PageContainer>
  );
}
