import BookUpdateForm from "@/src/app/(admin)/admin/books/update/book-update-form";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary
        fallback={
          <div>
            <p>에러가 발생했습니다. 책을 수정할 수 없습니다.</p>
          </div>
        }
      >
        <Suspense fallback="책을 불러오는 중">
          <BookUpdateForm bookId={bookId} />
        </Suspense>
      </ErrorBoundary>
    </PageContainer>
  );
}
