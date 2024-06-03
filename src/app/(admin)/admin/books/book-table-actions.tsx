"use client";
import { BookWithCategory } from "@/src/feature/books/types";
import Button from "@/src/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/ui/components/dropdown-menu";
import { useRouter } from "next/navigation";

interface BookTableActionsProps {
  row: BookWithCategory;
}

export default function BookTableActions({ row }: BookTableActionsProps) {
  const router = useRouter();

  const editBook = () => {
    router.push(`/admin/books/update?bookId=${row.id}`);
  };

  const deleteBook = () => {
    alert("delete book: " + row.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="material-icons">more_vert</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button onClick={editBook}>수정하기</button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={deleteBook}>삭제하기</button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
