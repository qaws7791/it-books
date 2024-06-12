import BookCreateForm from "@/src/feature/books/components/book-create-form";
import PageContainer from "@/src/feature/shared/components/layout/page-container";

export default function AdminBookCreatePage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">도서 추가</h1>
      <BookCreateForm />
    </PageContainer>
  );
}
