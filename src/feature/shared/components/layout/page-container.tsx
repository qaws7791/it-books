import { cn } from "@/src/feature/shared/lib/utils";
import React from "react";

export default function PageContainer({
  className,
  children,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("w-full max-w-screen-xl mx-auto p-2 md:p-4", className)}
      {...properties}
    >
      <div>{children}</div>
    </div>
  );
}
