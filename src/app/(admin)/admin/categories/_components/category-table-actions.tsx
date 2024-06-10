"use client";
import { Category } from "@/src/feature/categories/types";
import Button from "@/src/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/ui/components/dropdown-menu";
import { useRouter } from "next/navigation";

interface CategoryTableActionsProps {
  row: Category;
}

export default function CategoryTableActions({
  row,
}: CategoryTableActionsProps) {
  const router = useRouter();

  const editCategory = () => {
    router.push(`/admin/categories/update?categoryId=${row.id}`);
  };

  const deleteCategory = () => {
    alert(`delete category? id:${row.id} name:${row.name}`);
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
            <button onClick={editCategory}>수정하기</button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={deleteCategory}>삭제하기</button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
