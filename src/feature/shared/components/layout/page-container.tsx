import { cn } from "@/src/feature/shared/lib/utils";
import React from "react";

export default function PageContainer({
  className,
  children,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full", className)} {...properties}>
      <div>{children}</div>
    </div>
  );
}
