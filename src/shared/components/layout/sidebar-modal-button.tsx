import * as Dialog from "@radix-ui/react-dialog";
import Sidebar from "@/src/shared/components/layout/sidebar";
import Button from "@/src/shared/components/ui/button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DUMMY from "@/src/dummy";
import useWindowSize from "@/src/shared/hooks/use-window-size";
import usePathChange from "@/src/shared/hooks/use-path-change";

export default function SidebarModalButton() {
  const [open, setOpen] = useState(false);
  const windowSize = useWindowSize();
  usePathChange(() => setOpen(false));

  useEffect(() => {
    if (windowSize.width > 1440) {
      setOpen(false);
    }
  }, [windowSize]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="2xl:hidden">
          <span className="material-icons-outlined">
            {open ? "menu_open" : "menu"}
          </span>
        </Button>
      </Dialog.Trigger>
      <AnimatePresence mode="wait">
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed inset-0 bg-black/20 top-16"
              ></motion.div>
            </Dialog.Overlay>

            <Dialog.Content forceMount asChild>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed left-0 h-full mt-16 z-40"
              >
                <Sidebar links={DUMMY.SIDEBAR_LINKS} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : (
          false
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
