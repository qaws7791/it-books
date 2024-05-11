"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function useCurrentPath() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return React.useMemo(() => {
    return `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;
  }, [pathname, searchParams]);
}
