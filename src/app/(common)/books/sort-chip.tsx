"use client";
import { sortOptionArray, sortOptions } from "@/src/feature/books/constants";
import {
  BottomSheets,
  BottomSheetsClose,
  BottomSheetsContent,
  BottomSheetsHandle,
  BottomSheetsTrigger,
} from "@/src/ui/components/bottom-sheets";
import Chip from "@/src/ui/components/chip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { z } from "zod";

export default function SortChip() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort =
    z
      .enum(["latest", "publishedAt", "pageLow"])
      .safeParse(searchParams.get("sort"))?.data ?? "latest";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <BottomSheets>
      <BottomSheetsTrigger asChild>
        <Chip
          status={sort === "latest" ? "unselected" : "selected"}
          className="pl-2"
        >
          <span className="material-icons text-lg leading-none">sort</span>
          {sortOptions[sort].label}
        </Chip>
      </BottomSheetsTrigger>
      <BottomSheetsContent height={650} duration={0.5}>
        <BottomSheetsHandle />
        <h1 className="font-bold px-4 py-2">정렬</h1>
        <ul>
          {sortOptionArray.map((option) => (
            <BottomSheetsClose asChild key={option.value}>
              <li
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("sort", option.value),
                  );
                }}
                className="cursor-pointer mx-auto py-4 text-center hover:bg-surface-container-high flex items-center justify-start gap-4 rounded-2xl p-4"
              >
                <span className="material-icons w-10 h-10 rounded-full bg-on-tertiary-container/20 flex items-center justify-center flex-shrink-0">
                  {option.iconName}
                </span>
                {option.label}
              </li>
            </BottomSheetsClose>
          ))}
        </ul>
      </BottomSheetsContent>
    </BottomSheets>
  );
}
