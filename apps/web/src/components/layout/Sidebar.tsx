"use client";
import { cn } from "@web/src/lib/utils";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  links: {
    name: string;
    href: string;
  }[];
}

export default function Sidebar({ className, links, ...props }: SidebarProps) {
  return (
    <nav
      className={cn(
        "bg-surface-container flex flex-col h-main p-4 gap-2 w-sidebar transition-all rounded-r-3xl",
        className
      )}
      {...props}
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
