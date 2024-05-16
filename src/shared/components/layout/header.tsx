"use client";

import UserButton from "@/src/auth/components/user-button";
import SearchModalButton from "@/src/shared/components/layout/search-modal-button";
import SidebarModalButton from "@/src/shared/components/layout/sidebar-modal-button";
import Search from "@/src/shared/components/ui/search";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const handleSearch = (value: string) => {
    router.push(`/search?query=${value}`);
  };
  const isAdmin = segment === "admin";

  return (
    <>
      <div className="fixed  w-full h-header bg-surface-container flex gap-8 items-center justify-between px-3">
        <nav className="flex items-center gap-4">
          <SidebarModalButton isAdmin={isAdmin} />
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
