"use client";

import UserButton from "@/src/feature/auth/components/user-button";
import SearchModalButton from "@/src/feature/shared/components/layout/search-modal-button";
import SidebarModalButton from "@/src/feature/shared/components/layout/sidebar-modal-button";
import Button from "@/src/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Header() {
  const segment = useSelectedLayoutSegment();
  const isAdmin = segment === "admin";
  return (
    <>
      <div className="sticky w-full z-20 top-0 backdrop-blur border-b border-outline/20 bg-surface/70">
        <div className="flex items-center justify-between h-14 px-4">
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
      </div>
    </>
  );
}
