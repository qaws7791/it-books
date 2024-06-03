import CategoryForm from "@/src/app/(admin)/admin/categories/_components/category-form";
import CategoryList from "@/src/app/(admin)/admin/categories/_components/category-list";
import PageContainer from "@/src/feature/shared/components/layout/page-container";

export default function AdminCategoriesPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">카테고리 관리</h1>
      <CategoryList />
      <CategoryForm />
    </PageContainer>
  );
}
