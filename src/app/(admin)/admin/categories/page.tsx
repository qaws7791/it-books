import CategoryTable from "@/src/feature/categories/components/category-table";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import Button from "@/src/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "카테고리 관리",
};

export default function AdminCategoriesPage() {
  return (
    <PageContainer>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">카테고리 관리</h1>
        <Button asChild>
          <Link href="/admin/categories/create">카테고리 추가하기</Link>
        </Button>
      </header>
      <Suspense fallback="loading...">
        <CategoryTable />
      </Suspense>
    </PageContainer>
  );
}
