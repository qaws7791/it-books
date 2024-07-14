import CategoryEditForm from "@/src/app/(admin)/admin/categories/update/category-edit-form";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import QueryString from "@/src/feature/shared/utils/querystring";
import { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AdminCategoryUpdatePageProperties {
  searchParams: {
    categoryId?: string;
  };
}

export const metadata: Metadata = {
  title: "카테고리 수정",
};

export default function AdminCategoryUpdatePage({
  searchParams,
}: AdminCategoryUpdatePageProperties) {
  const categoryId = QueryString.toNumber(searchParams?.categoryId);

  if (!categoryId) {
    return <PageContainer>카테고리 ID가 필요합니다.</PageContainer>;
  }

  return (
    <PageContainer className="max-w-screen-sm">
      <h1 className="text-2xl font-bold">카테고리 수정</h1>
      <ErrorBoundary
        fallback={
          <div>
            <p>에러가 발생했습니다. 카테고리를 수정할 수 없습니다.</p>
          </div>
        }
      >
        <Suspense fallback="카테고리를 불러오는 중">
          <CategoryEditForm categoryId={categoryId} />
        </Suspense>
      </ErrorBoundary>
    </PageContainer>
  );
}
