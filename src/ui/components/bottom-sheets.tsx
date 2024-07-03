"use client";
import { cn } from "@/src/feature/shared/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

interface BottomSheetsProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

interface BottomSheetContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheetContext = React.createContext<BottomSheetContext | null>(null);

export function useBottomSheet() {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
}

export function BottomSheets({ children, ...props }: BottomSheetsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root onOpenChange={setOpen} open={open} {...props}>
      <BottomSheetContext.Provider value={{ open, setOpen }}>
        {children}
      </BottomSheetContext.Provider>
    </DialogPrimitive.Root>
  );
}

export const BottomSheetsTrigger = DialogPrimitive.Trigger;

export const BottomSheetsPortal = (
  props: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>,
) => <DialogPrimitive.Portal {...props} />;

export const BottomSheetsClose = DialogPrimitive.Close;

export const BottomSheetsOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, forwardedRef) => (
  <DialogPrimitive.Overlay
    forceMount
    ref={forwardedRef}
    className={cn("fixed inset-0 bg-scrim/30 z-40", className)}
    {...props}
  />
));
BottomSheetsOverlay.displayName = "BottomSheetsOverlay";

interface BottomSheetsContentProps extends HTMLMotionProps<"div"> {
  height?: number;
  duration?: number;
}
/**
 * BottomSheetsContent
 * height: height of the sheet
 * duration: duration of the sheet animation
 */
export const BottomSheetsContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  BottomSheetsContentProps
>(
  (
    { className, children, height = 0, duration = 0.3, ...props },
    forwardedRef,
  ) => {
    const y = window.innerHeight - height;

    const { open, setOpen } = useBottomSheet();
    return (
      <AnimatePresence>
        {open ? (
          <BottomSheetsPortal forceMount>
            <BottomSheetsOverlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
                className={cn("fixed inset-0 bg-scrim/30 z-40")}
              />
            </BottomSheetsOverlay>
            <DialogPrimitive.Content asChild>
              <motion.div
                ref={forwardedRef}
                initial={{ y }}
                animate={{ y: 0 }}
                exit={{ y }}
                transition={{ duration }}
                className={cn(
                  "fixed bottom-0  left-1/2 h-full max-h-[95%] bg-surface-container-low z-40 p-4 shadow-1 rounded-t-3xl w-full max-w-screen-sm",
                  className,
                )}
                style={{
                  translateY: y,
                  translateX: "-50%",
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(_event, info) => {
                  if (info.offset.y > 50) setOpen(false);
                }}
                {...props}
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </BottomSheetsPortal>
        ) : null}
      </AnimatePresence>
    );
  },
);
BottomSheetsContent.displayName = "BottomSheetsContent";

export const BottomSheetsHandle = React.forwardRef<
  React.ElementRef<"span">,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, forwardedRef) => (
  <span
    ref={forwardedRef}
    className={cn(
      "block w-8 h-1 rounded-full bg-on-surface-variant mx-auto cursor-grab",
      className,
    )}
    {...props}
  />
));
BottomSheetsHandle.displayName = "BottomSheetsHandle";
