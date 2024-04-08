"use client";

import SearchModalButton from "@web/src/components/layout/SearchModalButton";
import SidebarModalButton from "@web/src/components/layout/SidebarModalButton";
import Avatar from "@web/src/components/ui/Avatar";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS: { name: string; href: string }[] = [
  { name: "책 찾기", href: "/books" },
  { name: "컬렉션", href: "/collections" },
  { name: "관리자", href: "/admin" },
];

export default function Header() {
  return (
    <>
      <header className="fixed w-full h-header bg-surface-container flex items-center justify-between px-3">
        <nav className="flex items-center gap-4">
          <SidebarModalButton />
          <Link href={"/"}>
            <Image src="/logo.svg" alt="it books" width={160} height={41} />
          </Link>
          <ul className="space-x-6 hidden sm:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <SearchModalButton />
          {/* <button className="bg-white p-3 w-60 rounded-full hidden gap-2 items-center md:flex">
            <span className="material-icons-outlined">search</span>
            <p>책 검색</p>
          </button> */}
          <Avatar>
            <Avatar.Image src="https://placehold.co/40" alt="avatar" />
            <Avatar.Fallback>IT</Avatar.Fallback>
          </Avatar>
        </div>
      </header>
      <div className="w-full h-header"></div>
    </>
  );
}