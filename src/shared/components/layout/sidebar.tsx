"use client";
import { cn } from "@/src/shared/lib/utils";
import Link from "next/link";

interface SidebarProperties extends React.HTMLAttributes<HTMLDivElement> {
  links: {
    name: string;
    href: string;
  }[];
}

export default function Sidebar({
  className,
  links,
  ...properties
}: SidebarProperties) {
  return (
    <nav
      className={cn(
        "bg-surface-container flex flex-col h-main p-4 gap-2 w-sidebar transition-all rounded-r-3xl",
        className,
      )}
      {...properties}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-4 hover:bg-surface-dim/40 rounded-full"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
