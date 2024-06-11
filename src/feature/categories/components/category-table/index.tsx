"use client";

import CategoryTableActions from "@/src/feature/categories/components/category-table/category-table-actions";
import { useCategoriesQuery } from "@/src/feature/categories/queries";
import { Category } from "@/src/feature/categories/types";
import Button from "@/src/ui/components/button";
import { Input } from "@/src/ui/components/input";
import Label from "@/src/ui/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/ui/components/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

const categoryHelper = createColumnHelper<Category>();

const columns = [
  categoryHelper.accessor("id", {
    cell: (row) => row.getValue(),
    header: () => "ID",
    footer: (row) => row.column.id,
  }),
  categoryHelper.accessor("name", {
    cell: (row) => row.getValue(),
    header: () => "이름",
    footer: (row) => row.column.id,
  }),
  categoryHelper.accessor("slug", {
    cell: (row) => row.getValue(),
    header: () => "슬러그",
    footer: (row) => row.column.id,
  }),
  categoryHelper.display({
    id: "actions",
    cell: ({ row }) => <CategoryTableActions row={row.original} />,
  }),
];

export default function CategoryTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageInput, setPageInput] = useState<number>(1);

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageInput(Number(event.target.value));
  };

  const handlePageInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      setPagination((previous) => ({ ...previous, pageIndex: pageInput - 1 }));
    }
  };

  const categoriesQuery = useCategoriesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const refetchPage = async () => {
    try {
      void (await categoriesQuery.refetch());
      toast.info("카테고리 목록을 다시 불러왔습니다.");
    } catch {
      toast.error("카테고리 목록을 다시 불러오는데 실패했습니다.");
    }
  };

  const table = useReactTable({
    columns: columns,
    data: categoriesQuery.data.data ?? [],
    rowCount: categoriesQuery.data.pagination.total ?? 0,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    manualPagination: true,
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <Button
            onClick={refetchPage}
            variant="secondary"
            size="icon"
            aria-label="Refresh"
            className={categoriesQuery.isFetching ? "animate-spin" : ""}
          >
            <span className="material-icons">refresh</span>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            variant="ghost"
            size="icon"
          >
            <span className="material-icons">first_page</span>
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="ghost"
            size="icon"
          >
            <span className="material-icons">chevron_left</span>
          </Button>
          <div className="flex items-center gap-2">
            <Label htmlFor="page-input" className="sr-only">
              Go to page
            </Label>
            <Input
              type="number"
              id="page-input"
              value={pageInput}
              onKeyDown={handlePageInputKeyDown}
              onChange={handlePageInputChange}
              className="w-24 h-10"
              max={table.getPageCount()}
              min={1}
            />
            <span>of {table.getPageCount().toLocaleString()} pages</span>
          </div>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="ghost"
            size="icon"
          >
            <span className="material-icons">chevron_right</span>
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            variant="ghost"
            size="icon"
          >
            <span className="material-icons">last_page</span>
          </Button>
        </div>
        <Select
          defaultValue={table.getState().pagination.pageSize.toString()}
          value={pagination.pageSize.toString()}
          onValueChange={(value) =>
            setPagination((previous) => ({
              ...previous,
              pageSize: Number.parseInt(value),
            }))
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>페이지 사이즈</SelectLabel>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}개씩 보기
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
