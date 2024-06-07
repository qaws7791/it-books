import ListsClient from "@/src/app/(common)/lists/lists-client";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "리스트 목록",
};

interface ListsPageProps {
  searchParams: {
    page?: string;
  };
}

export default function CollectionsPage({ searchParams }: ListsPageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  return (
    <PageContainer>
      <h1 className="sr-only">Collections</h1>
      <ListsClient page={page} limit={12} />
    </PageContainer>
  );
}
