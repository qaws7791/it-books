"use client";

import UserButton from "@web/src/auth/components/UserButton";
import SearchModalButton from "@web/src/components/layout/SearchModalButton";
import SidebarModalButton from "@web/src/components/layout/SidebarModalButton";
import Search from "@web/src/components/ui/Search";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Header() {
  const router = useRouter();
  const handleSearch = (value: string) => {
    router.push(`/search?query=${value}`);
  };
  return (
    <>
      <div className="fixed  w-full h-header bg-surface-container flex gap-8 items-center justify-between px-3">
        <nav className="flex items-center gap-4">
          <SidebarModalButton />
          <Link href={"/"}>
            <Image src="/logo.svg" alt="it books" width={160} height={41} />
          </Link>
        </nav>
        <div className="flex-auto max-w-md">
          <Search
            placeholder="책 제목이나 저자를 검색해보세요"
            onSubmit={handleSearch}
            className=" w-full hidden md:block"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="block md:hidden">
            <SearchModalButton />
          </div>
          <UserButton />
        </div>
      </div>
      <div className="w-full h-header"></div>
    </>
  );
}
