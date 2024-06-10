import CategoryCreateForm from "@/src/app/(admin)/admin/categories/create/_components/category-create-form";
import PageContainer from "@/src/feature/shared/components/layout/page-container";

export default function AdminCategoryCreatePage() {
  return (
    <PageContainer className="max-w-screen-sm">
      <h1 className="text-2xl font-bold">카테고리 추가</h1>
      <CategoryCreateForm />
    </PageContainer>
  );
}
