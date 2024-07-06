"use client";
import LOCAL_CATEGORIES from "@/src/feature/categories/constants/local-categories";
import { LocalCategory } from "@/src/feature/categories/types";
import {
  BottomSheets,
  BottomSheetsClose,
  BottomSheetsContent,
  BottomSheetsHandle,
  BottomSheetsTrigger,
} from "@/src/ui/components/bottom-sheets";
import Chip from "@/src/ui/components/chip";
import { useRouter } from "next/navigation";

interface CategoryChipProps {
  category?: LocalCategory;
}

export default function CategoryChip({ category }: CategoryChipProps) {
  const router = useRouter();
  console.log("category", category);
  const hasCategory = category?.name !== "전체";
  return (
    <BottomSheets>
      <BottomSheetsTrigger asChild>
        <Chip status={hasCategory ? "selected" : "unselected"} className="pl-2">
          <span className="material-icons text-lg leading-none">category</span>
          {category?.name ?? "카테고리"}
        </Chip>
      </BottomSheetsTrigger>
      <BottomSheetsContent height={650} duration={0.5}>
        <BottomSheetsHandle />
        <h1 className="font-bold px-4 py-2">카테고리</h1>
        <ul>
          {LOCAL_CATEGORIES.map((category) => (
            <BottomSheetsClose asChild key={category.slug}>
              <li
                onClick={() => {
                  router.push(`/books?category=${category.slug}`);
                }}
                className="cursor-pointer mx-auto py-4 text-center hover:bg-surface-container-high flex items-center justify-start gap-4 rounded-2xl p-4"
              >
                <span className="material-icons w-10 h-10 rounded-full bg-on-tertiary-container/20 flex items-center justify-center flex-shrink-0">
                  {category.iconName}
                </span>
                {category.name}
              </li>
            </BottomSheetsClose>
          ))}
        </ul>
      </BottomSheetsContent>
    </BottomSheets>
  );
}
