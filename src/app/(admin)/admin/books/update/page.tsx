import BookUpdateClient from "@/src/app/(admin)/admin/books/update/_components/book-update-client";
import PageContainer from "@/src/feature/shared/components/layout/page-container";

interface AdminBookUpdatePageProperties {
  searchParams: {
    bookId: number;
  };
}

export default function AdminBookUpdatePage({
  searchParams: { bookId },
}: AdminBookUpdatePageProperties) {
  if (!bookId) {
    return <PageContainer>책 ID가 필요합니다.</PageContainer>;
  }
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">도서 업데이트</h1>
      <BookUpdateClient bookId={bookId} />
    </PageContainer>
  );
}
