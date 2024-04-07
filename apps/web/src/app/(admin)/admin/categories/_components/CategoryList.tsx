"use client";

import { useCategoriesQuery } from "@web/src/categories/api/getCategories";

export default function CategoryList() {
  const { data } = useCategoriesQuery();
  return (
    <div className="w-80 h-96 border border-neutral-900 rounded-3xl p-8 flex flex-col gap-2">
      {data.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}
