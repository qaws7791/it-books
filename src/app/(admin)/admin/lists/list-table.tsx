"use client";
import ListTableActions from "@/src/app/(admin)/admin/lists/list-table-actions";
import { listsOptions } from "@/src/feature/lists/hooks/queries";
import { ListPreview } from "@/src/feature/lists/types";
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
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

const columnHelper = createColumnHelper<ListPreview>();

const columns = [
  columnHelper.accessor("id", {
    cell: (row) => row.getValue(),
    header: () => "ID",
    footer: (row) => row.column.id,
  }),
  columnHelper.accessor("title", {
    cell: (row) => row.getValue(),
    header: () => "제목",
    footer: (row) => row.column.id,
  }),
  columnHelper.accessor("bookCount", {
    cell: (row) => row.getValue(),
    header: () => "아이템 개수",
    footer: (row) => row.column.id,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ListTableActions row={row.original} />,
  }),
];

export default function ListTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
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
  const listsQuery = useSuspenseQuery(
    listsOptions({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }),
  );

  const table = useReactTable({
    columns: columns,
    data: listsQuery.data.data ?? [],
    rowCount: listsQuery.data.pagination.total ?? 0,
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
        <div></div>
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
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>페이지 사이즈</SelectLabel>
              {[1, 2, 3, 4, 5].map((pageSize) => (
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
