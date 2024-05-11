import CollectionsClient from "@/src/app/(common)/collections/collections-client";
import PageContainer from "@/src/shared/components/layout/page-container";

export default function CollectionsPage() {
  return (
    <PageContainer>
      <h1 className="sr-only">Collections</h1>
      <CollectionsClient />
    </PageContainer>
  );
}
