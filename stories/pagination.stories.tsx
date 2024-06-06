import Button from "@/src/ui/components/button";
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
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: 5 }).map((page, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#" isActive={index === 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

export const LongWithHooks: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { pages, hasPreviousPage, hasNextPage } = usePagination({
      currentPage,
      totalPages: 10,
    });

    const goPreviousPage = () => {
      if (hasPreviousPage) {
        setCurrentPage((previous) => previous - 1);
      }
    };

    const goNextPage = () => {
      if (hasNextPage) {
        setCurrentPage((previous) => previous + 1);
      }
    };

    const goPage = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={goPreviousPage} />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => goPage(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={goNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

export const ShortWithHooks: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { pages, hasPreviousPage, hasNextPage } = usePagination({
      currentPage,
      totalPages: 10,
      type: "short",
    });

    const goPreviousPage = () => {
      if (hasPreviousPage) {
        setCurrentPage((previous) => previous - 1);
      }
    };

    const goNextPage = () => {
      if (hasNextPage) {
        setCurrentPage((previous) => previous + 1);
      }
    };

    const goPage = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={goPreviousPage} />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => goPage(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={goNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};
