import { cn } from "@web/src/lib/utils";
import React from "react";

export default function Page({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full bg-surface rounded-4xl p-8 max-h-full h-appbar overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
