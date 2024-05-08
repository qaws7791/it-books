import BookCreateForm from "@/src/app/(admin)/admin/books/create/_components/BookCreateForm";
import Page from "@/src/shared/components/layout/Page";

export default function AdminBookCreatePage() {
  return (
    <Page>
      <h1 className="text-2xl font-bold">도서 추가</h1>
      <BookCreateForm />
    </Page>
  );
}
