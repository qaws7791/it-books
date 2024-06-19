"use client";

import UserButton from "@/src/feature/auth/components/user-button";
import SearchModalButton from "@/src/feature/shared/components/layout/search-modal-button";
import SidebarModalButton from "@/src/feature/shared/components/layout/sidebar-modal-button";
import { cn } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import { useScrollbarMargin } from "@/src/ui/hooks/use-scrollbar-margin";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Header() {
  const segment = useSelectedLayoutSegment();
  const isAdmin = segment === "admin";
  const { status } = useScrollbarMargin();
  return (
    <>
      <div
        className={cn(
          "fixed w-full lg:w-header  z-20 bg-surface top-0",

          status === "hide" && "pr-[17px]",
        )}
      >
        <div className="flex items-center justify-between h-header px-4">
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
