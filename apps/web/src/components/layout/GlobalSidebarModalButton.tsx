import * as Dialog from "@radix-ui/react-dialog";
import GlobalSidebar from "@web/src/components/layout/GlobalSidebar";
import Button from "@web/src/components/ui/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function GlobalSidebarModalButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
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
                className="fixed left-0 h-full mt-16"
              >
                <GlobalSidebar className="" />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
