import BookTable from "@/src/app/(admin)/admin/books/book-table";
import PageContainer from "@/src/shared/components/layout/page-container";
import Button from "@/src/shared/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function AdminBooksPage() {
  return (
    <PageContainer>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">책 관리</h1>
        <Button asChild>
          <Link href="/admin/books/create">책 추가하기</Link>
        </Button>
      </header>
      <Suspense fallback="loading...">
        <BookTable />
      </Suspense>
    </PageContainer>
  );
}
