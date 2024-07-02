import LOCAL_CATEGORIES from "@/src/feature/categories/constants/local-categories";
import { LocalCategory } from "@/src/feature/categories/types";
import { cn } from "@/src/feature/shared/lib/utils";
import Link from "next/link";

interface CategoriesProps {}

export default function LocalCategoryList({}: CategoriesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-card gap-4 p-2 justify-items-center">
      {LOCAL_CATEGORIES.map((category) => (
        <CategoryItem key={category.slug} {...category} />
      ))}
    </div>
  );
}

interface CategoryItemProps extends LocalCategory {}

function CategoryItem({ slug, name, iconName }: CategoryItemProps) {
  return (
    <Link
      key={slug}
      href={"/books" + (slug ? `?category=${slug}` : "")}
      className={cn(
        "flex items-center justify-between gap-2 rounded-2xl border border-outline text-on-tertiary-container p-4 w-full sm:w-64 box-border hover:shadow-1 transition-shadow bg-surface-container",
      )}
    >
      <span>{name}</span>
      <span className="material-icons w-12 h-12 rounded-full bg-on-tertiary-container/20 flex items-center justify-center flex-shrink-0">
        {iconName}
      </span>
    </Link>
  );
}
