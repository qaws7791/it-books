import BookTable from "@/src/feature/books/components/book-table";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import Button from "@/src/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "책 관리",
};

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
