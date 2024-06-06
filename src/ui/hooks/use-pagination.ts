interface usePaginationProps {
  currentPage: number;
  totalPages: number;
  type?: "long" | "short";
}

type Page = number | "ellipsis";

interface usePaginationReturn {
  pages: Page[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

function getMiddles(
  currentPage: number,
  totalPages: number,
  type: "long" | "short",
) {
  const base = type === "long" ? 5 : 4;

  if (currentPage < base) {
    return type === "long" ? [3, 4, 5] : [3];
  }

  if (currentPage > totalPages - base + 1) {
    return type === "long"
      ? [totalPages - 4, totalPages - 3, totalPages - 2]
      : [totalPages - 2];
  }

  return type === "long"
    ? [currentPage - 1, currentPage, currentPage + 1]
    : [currentPage];
}

function getLeft(currentPage: number, type: "long" | "short") {
  return currentPage > (type === "long" ? 4 : 3) ? "ellipsis" : 2;
}

function getRight(
  currentPage: number,
  totalPages: number,
  type: "long" | "short",
) {
  return currentPage < totalPages - (type === "long" ? 3 : 2)
    ? "ellipsis"
    : totalPages - 1;
}

export default function usePagination({
  currentPage,
  totalPages,
  type = "long",
}: usePaginationProps): usePaginationReturn {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const pages =
    totalPages <= (type === "long" ? 7 : 5)
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : ([
          1,
          getLeft(currentPage, type),
          ...getMiddles(currentPage, totalPages, type),
          getRight(currentPage, totalPages, type),
          totalPages,
        ] as Page[]);

  return { pages, hasPreviousPage, hasNextPage };
}
