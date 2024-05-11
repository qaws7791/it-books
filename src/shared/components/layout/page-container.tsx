import { cn } from "@/src/shared/lib/utils";
import React from "react";

export default function PageContainer({
  className,
  children,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full bg-surface rounded-4xl p-8 max-h-full h-appbar overflow-y-auto scrollbar",
        className,
      )}
      {...properties}
    >
      <div>{children}</div>
    </div>
  );
}
