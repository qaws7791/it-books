import LOCAL_CATEGORIES from "@/src/feature/categories/constants/local-categories";

export function getLocalCategory(categorySlug: string) {
  return LOCAL_CATEGORIES.find((category) => category.slug === categorySlug);
}
