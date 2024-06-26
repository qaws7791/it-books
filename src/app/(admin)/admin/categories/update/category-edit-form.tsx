"use client";
import CategoryCreateForm from "@/src/feature/categories/components/category-create-form";
import { categoryOptions } from "@/src/feature/categories/hooks/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

interface CategoryEditFormProps {
  categoryId: number;
}

export default function CategoryEditForm({
  categoryId,
}: CategoryEditFormProps) {
  const { data: category } = useSuspenseQuery(categoryOptions(categoryId));

  return <CategoryCreateForm category={category} />;
}
