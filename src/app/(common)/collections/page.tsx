import CollectionsClient from "@/src/app/(common)/collections/CollectionsClient";
import Page from "@/src/shared/components/layout/Page";

export default function CollectionsPage() {
  return (
    <Page>
      <h1 className="sr-only">Collections</h1>
      <CollectionsClient />
    </Page>
  );
}
