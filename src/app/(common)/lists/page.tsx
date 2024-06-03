import ListsClient from "@/src/app/(common)/lists/lists-client";
import getListsPagination from "@/src/feature/lists/api/get-lists-pagination";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "리스트 목록",
};

interface ListsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export default async function CollectionsPage({
  searchParams,
}: ListsPageProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? Number.parseInt(searchParams.limit) : 10;
  const { data } = await getListsPagination({ page, limit });

  return (
    <PageContainer>
      <h1 className="sr-only">Collections</h1>
      <ListsClient lists={data} />
    </PageContainer>
  );
}
