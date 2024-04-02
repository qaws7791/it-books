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
    <aside className="w-56">
      <nav>
        <ul className="max-w-80 w-full flex flex-col gap-4">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.path} className="flex">
              <Link
                href={`/admin${item.path}`}
                className="text-lg font-bold p-4 indent-4 w-full hover:bg-neutral-100 rounded-full"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
