import { cn } from "@/src/feature/shared/lib/utils";
import {
  BottomSheets,
  BottomSheetsClose,
  BottomSheetsContent,
  BottomSheetsHandle,
  BottomSheetsTrigger,
} from "@/src/ui/components/bottom-sheets";
import Button from "@/src/ui/components/button";
import * as Dialog from "@radix-ui/react-dialog";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/BottomSheets",
  component: BottomSheets,
  tags: ["autodocs"],
} satisfies Meta<typeof BottomSheets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const SHEET_MARGIN = 400;
    const sheetHeight = window.innerHeight - SHEET_MARGIN;
    const [open, setOpen] = useState(false);
    useEffect(() => {
      console.log(open);
    }, [open]);
    return (
      <Dialog.Root onOpenChange={setOpen} open={open}>
        <Dialog.Trigger asChild>
          <Button>Open Sheet</Button>
        </Dialog.Trigger>
        <AnimatePresence>
          {open ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("fixed inset-0 bg-scrim/30 z-40")}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ y: sheetHeight }}
                  animate={{ y: 0 }}
                  exit={{ y: sheetHeight }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-0  left-1/2 h-full max-h-[95%] bg-surface-container-low z-40 p-4 pt-1 shadow-1 rounded-t-3xl w-full max-w-screen-sm"
                  style={{
                    translateY: sheetHeight,
                    translateX: "-50%",
                  }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={(_event, info) => {
                    if (info.offset.y > 50) setOpen(false);
                  }}
                >
                  <div className="flex justify-center">
                    <span className="p-3 cursor-grab">
                      <span className="block w-8 h-1 rounded-full bg-on-surface-variant" />
                    </span>
                  </div>
                  This is a sheet
                  <Dialog.Close aria-label="Close">
                    <Button variant="secondary">Close</Button>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    );
  },
};

export const BottomSheet: Story = {
  render: () => {
    return (
      <BottomSheets>
        <BottomSheetsTrigger asChild>
          <Button>Open Sheet</Button>
        </BottomSheetsTrigger>
        <BottomSheetsContent height={400} duration={0.5}>
          <BottomSheetsHandle />
          <BottomSheetsClose asChild>
            <Button variant="secondary">Close</Button>
          </BottomSheetsClose>
          <div>
            Exercitation id Lorem labore enim. Laborum veniam nisi dolore in.
            Laborum aute commodo nostrud occaecat fugiat voluptate fugiat mollit
            deserunt. Commodo aliquip sint laborum nostrud pariatur mollit.
            Minim do consequat consequat magna mollit commodo Lorem aliquip
            voluptate qui aute magna tempor id.
          </div>
        </BottomSheetsContent>
      </BottomSheets>
    );
  },
};
