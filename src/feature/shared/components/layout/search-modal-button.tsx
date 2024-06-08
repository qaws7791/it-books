"use client";
import useBoolean from "@/src/feature/shared/hooks/use-boolean";
import Search from "@/src/ui/components/search";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useBoolean(false);
  const router = useRouter();
  const handleSearch = (value: string) => {
    router.push(`/search?query=${value}`);
    setOpen(false);
  };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams, setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      {open ? (
        <Dialog.Portal forceMount>
          <Dialog.Overlay forceMount asChild>
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-shadow/30 z-50"
            ></motion.div>
          </Dialog.Overlay>

          <Dialog.Content forceMount asChild>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-1/4 left-0 right-0 px-6 mx-auto max-w-screen-md z-50"
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
