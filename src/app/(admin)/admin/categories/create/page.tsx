import CategoryCreateForm from "@/src/feature/categories/components/category-create-form";
import PageContainer from "@/src/feature/shared/components/layout/page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "카테고리 추가",
};

export default function AdminCategoryCreatePage() {
  return (
    <PageContainer className="max-w-screen-sm">
      <h1 className="text-2xl font-bold">카테고리 추가</h1>
      <CategoryCreateForm />
    </PageContainer>
  );
}
