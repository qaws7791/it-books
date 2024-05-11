import { List, ListItem } from "@/src/shared/components/ui/list";
import Link from "next/link";

interface SidebarItem {
  title: string;
  path: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "대시보드",
    path: "/dashboard",
  },
  {
    title: "카테고리 관리",
    path: "/categories",
  },
  {
    title: "도서 관리",
    path: "/books",
  },
];

export default function AdminSideBar() {
  return (
    <List className="max-w-80 p-4 w-56 rounded-3xl">
      {SIDEBAR_ITEMS.map((item) => (
        <ListItem key={item.path} className="flex" asChild>
          <Link href={`/admin${item.path}`} className="">
            {item.title}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
