import ListTable from "@/src/app/(admin)/admin/lists/list-table";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import Button from "@/src/ui/components/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ListAdminPage() {
  return (
    <PageContainer>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">리스트 관리</h1>
        <Button asChild>
          <Link href="/admin/lists/create">리스트 추가하기</Link>
        </Button>
      </header>
      <Suspense fallback="loading...">
        <ListTable />
      </Suspense>
    </PageContainer>
  );
}
