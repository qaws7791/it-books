import LOCAL_CATEGORIES from "@/src/feature/categories/constants/local-categories";
import { LocalCategory } from "@/src/feature/categories/types";
import { cn } from "@/src/feature/shared/lib/utils";
import Link from "next/link";

interface CategoriesProps {
  currentCategory?: LocalCategory;
}

export default function LocalCategoryList({
  currentCategory,
}: CategoriesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-card gap-4 p-2 justify-items-center">
      <CategoryItem
        key="all"
        name="전체"
        slug=""
        iconName="all_inclusive"
        selected={!currentCategory}
      />
      {LOCAL_CATEGORIES.map((category) => (
        <CategoryItem
          key={category.slug}
          {...category}
          selected={category === currentCategory}
        />
      ))}
    </div>
  );
}

interface CategoryItemProps extends LocalCategory {
  selected?: boolean;
}

function CategoryItem({ selected, slug, name, iconName }: CategoryItemProps) {
  return (
    <Link
      key={slug}
      href={"/books" + (slug ? `?category=${slug}` : "")}
      className={cn(
        "flex items-center justify-between gap-2 rounded-2xl border border-outline text-on-tertiary-container p-4 w-full sm:w-64 box-border hover:shadow-1 transition-shadow",
        selected ? "bg-primary-container/40" : "bg-surface-container",
      )}
    >
      <span>{name}</span>
      <span className="material-icons w-12 h-12 rounded-full bg-on-tertiary-container/20 flex items-center justify-center flex-shrink-0">
        {iconName}
      </span>
    </Link>
  );
}
