"use client";
import CategoryCreateForm from "@/src/feature/categories/components/category-create-form";
import { useCategoryQuery } from "@/src/feature/categories/queries";

interface CategoryEditFormProps {
  categoryId: number;
}

export default function CategoryEditForm({
  categoryId,
}: CategoryEditFormProps) {
  const { data: category } = useCategoryQuery(categoryId);

  return <CategoryCreateForm category={category} />;
}
