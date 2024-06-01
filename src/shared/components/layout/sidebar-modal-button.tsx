import DUMMY from "@/src/dummy";
import Button from "@/src/shared/components/ui/button";
import {
  Drawer,
  DrawerIcon,
  DrawerItem,
} from "@/src/shared/components/ui/drawer";
import useBoolean from "@/src/shared/hooks/use-boolean";
import usePathChange from "@/src/shared/hooks/use-path-change";
import useWindowSize from "@/src/shared/hooks/use-window-size";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Link {
  name: string;
  href: string;
  icon: string;
}

const getSelectedLink = (links: Link[], pathname: string) => {
  return links.reduce((selectedLink, link) => {
    if (pathname.startsWith(link.href)) {
      return link;
    }
    return selectedLink;
  });
};

interface SidebarModalButtonProps {
  isAdmin?: boolean;
}

export default function SidebarModalButton({
  isAdmin,
}: SidebarModalButtonProps) {
  const [open, setOpen] = useBoolean(false);
  const windowSize = useWindowSize();
  usePathChange(() => setOpen(false));

  const pathname = usePathname();
  const links = isAdmin ? DUMMY.ADMIN_SIDEBAR_LINKS : DUMMY.SIDEBAR_LINKS;
  const selectedLink = getSelectedLink(links, pathname);

  useEffect(() => {
    if (windowSize.width > 1440) {
      setOpen(false);
    }
  }, [windowSize, setOpen]);

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
                className="fixed inset-0 bg-black/20"
              ></motion.div>
            </Dialog.Overlay>

            <Dialog.Content forceMount asChild>
              <motion.div
                initial={{ x: "-50%", opacity: 0.3 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-50%", opacity: 0.3 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed left-0 h-screen z-40 w-sidebar"
              >
                <Drawer className="h-full transition-all rounded-l-none">
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <span className="material-icons-outlined">
                        {open ? "menu_open" : "menu"}
                      </span>
                    </Button>
                  </Dialog.Close>
                  <div className="mt-4">
                    {links.map((link) => (
                      <DrawerItem
                        key={link.href}
                        asChild
                        selected={link.name === selectedLink.name}
                      >
                        <Link href={link.href}>
                          <DrawerIcon>{link.icon}</DrawerIcon>
                          <span>{link.name}</span>
                        </Link>
                      </DrawerItem>
                    ))}
                  </div>
                </Drawer>
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
