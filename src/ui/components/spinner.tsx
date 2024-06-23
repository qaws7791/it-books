import { cn } from "@/src/feature/shared/lib/utils";
import React from "react";

export default function Spinner({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "w-12 h-12 border-primary border-5 rounded-full inline-block box-border animate-spin border-b-transparent",
        className,
      )}
      {...props}
    />
  );
}
