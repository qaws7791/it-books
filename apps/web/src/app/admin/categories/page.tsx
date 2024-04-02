import CategoryForm from "@web/src/app/admin/categories/_components/CategoryForm";
import CategoryList from "@web/src/app/admin/categories/_components/CategoryList";

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">카테고리 관리</h1>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}
