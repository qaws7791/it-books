"use client";
import DUMMY from "@web/src/dummy";
import { cn } from "@web/src/lib/utils";
import Link from "next/link";

export default function GlobalSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface-container flex flex-col w-64 rounded-r-3xl h-full transition-all p-4 gap-2",
        className
      )}
      {...props}
    >
      {DUMMY.SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-4 hover:bg-surface-dim/40 rounded-full"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
