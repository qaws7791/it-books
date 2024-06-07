"use client";

import Button from "@/src/ui/components/button";
import Link from "next/link";

export default function GlobalError({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center justify-center w-screen h-screen">
        <div>
          <h2>Something went wrong!</h2>
          <Button asChild>
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
