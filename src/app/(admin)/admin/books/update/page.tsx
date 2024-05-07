import BookUpdateClient from "@web/src/app/(admin)/admin/books/update/_components/BookUpdateClient";
import Page from "@web/src/components/layout/Page";

interface AdminBookUpdatePageProps {
  searchParams: {
    bookId: number;
  };
}

export default function AdminBookUpdatePage({
  searchParams: { bookId },
}: AdminBookUpdatePageProps) {
  if (!bookId) {
    return <Page>책 ID가 필요합니다.</Page>;
  }
  return (
    <Page>
      <h1 className="text-2xl font-bold">도서 업데이트</h1>
      <BookUpdateClient bookId={bookId} />
    </Page>
  );
}
