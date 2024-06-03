import ListsClient from "@/src/app/(common)/lists/lists-client";
import PageContainer from "@/src/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "리스트 목록",
};

export default function CollectionsPage() {
  return (
    <PageContainer>
      <h1 className="sr-only">Collections</h1>
      <ListsClient />
    </PageContainer>
  );
}
