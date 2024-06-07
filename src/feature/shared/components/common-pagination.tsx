"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/ui/components/pagination";
import usePagination from "@/src/ui/hooks/use-pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function CommonPagination({
  currentPage,
  totalPages,
}: CommonPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { pages, hasPreviousPage, hasNextPage } = usePagination({
    currentPage,
    totalPages,
  });

  const createLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createLink(hasPreviousPage ? currentPage - 1 : currentPage)}
          />
        </PaginationItem>
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createLink(hasNextPage ? currentPage + 1 : currentPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
