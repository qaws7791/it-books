"use client";

import UserButton from "@/src/auth/components/user-button";
import SearchModalButton from "@/src/shared/components/layout/search-modal-button";
import SidebarModalButton from "@/src/shared/components/layout/sidebar-modal-button";
import Button from "@/src/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Header() {
  const segment = useSelectedLayoutSegment();
  const isAdmin = segment === "admin";

  return (
    <>
      <div className="w-full h-header flex gap-8 items-center justify-between px-3">
        <nav className="flex items-center gap-4">
          <SidebarModalButton isAdmin={isAdmin} />
          <Link href={"/"}>
            <Image src="/logo.svg" alt="it books" width={160} height={41} />
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="block lg:hidden">
            <SearchModalButton>
              <Button variant="ghost" size="icon">
                <span className="material-icons">search</span>
              </Button>
            </SearchModalButton>
          </div>
          <UserButton />
        </div>
      </div>
    </>
  );
}
