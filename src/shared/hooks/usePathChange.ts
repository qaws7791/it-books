import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function usePathChange(onPathChange: () => void) {
  const ref = useRef<() => void>(onPathChange);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [url, setUrl] = useState(`${pathname}${searchParams}`);

  useEffect(() => {
    setUrl(`${pathname}${searchParams}`);
  }, [pathname, searchParams]);

  useEffect(() => {
    ref.current();
  }, [url]);

  return null;
}
