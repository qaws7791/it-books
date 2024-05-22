"use client";
import Button from "@/src/shared/components/ui/button";
import Search from "@/src/shared/components/ui/search";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchModalButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleSearch = (value: string) => {
    router.push(`/search?query=${value}`);
    setOpen(false);
  };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon">
          <span className="material-icons-outlined">search</span>
        </Button>
      </Dialog.Trigger>

      {open ? (
        <Dialog.Portal forceMount>
          <Dialog.Overlay forceMount asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/30"
            ></motion.div>
          </Dialog.Overlay>

          <Dialog.Content forceMount asChild>
            <motion.div
              initial={{ y: "-16px" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-1/4 left-0 right-0 px-6 mx-auto max-w-screen-md z-40"
            >
              <Search
                size="lg"
                placeholder="책 제목이나 저자를 검색해보세요"
                onSubmit={handleSearch}
                onClose={() => setOpen(false)}
                focus
              />
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      ) : (
        false
      )}
    </Dialog.Root>
  );
}
