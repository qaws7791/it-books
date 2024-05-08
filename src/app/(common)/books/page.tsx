import BooksClient from "@/src/app/(common)/books/BooksClient";
import Page from "@/src/shared/components/layout/Page";

export default function BooksPage() {
  return (
    <Page>
      <h1 className="sr-only">Books</h1>
      <BooksClient />
    </Page>
  );
}
