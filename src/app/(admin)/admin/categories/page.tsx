import CategoryForm from "@/src/app/(admin)/admin/categories/_components/category-form";
import CategoryList from "@/src/app/(admin)/admin/categories/_components/category-list";

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">카테고리 관리</h1>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}
