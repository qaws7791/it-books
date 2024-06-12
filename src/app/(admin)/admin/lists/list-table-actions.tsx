"use client";
import { ListPreview } from "@/src/feature/lists/types";
import Button from "@/src/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/ui/components/dropdown-menu";
import { useRouter } from "next/navigation";

interface ListTableActionsProps {
  row: ListPreview;
}

export default function ListTableActions({ row }: ListTableActionsProps) {
  const router = useRouter();

  const editList = () => {
    router.push(`/admin/lists/update?listId=${row.id}`);
  };

  const deleteList = () => {
    alert("delete list: " + row.id);
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
            <button onClick={editList}>수정하기</button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={deleteList}>삭제하기</button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
