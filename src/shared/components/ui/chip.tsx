import { cn } from "@/src/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const chipVariants = cva(
  "inline-flex items-center whitespace-nowrap border border-outline rounded-lg px-3 py-1.5 text-sm leading-5 text-on-surface-variant font-medium bg-transparent state-layer hover:after:bg-on-surface-variant/8 focus:after:bg-on-surface-variant/12 active:after:bg-on-surface-variant/12",
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, asChild, ...props }, ref) => {
    const Compo = asChild ? Slot : "button";
    return (
      <Compo className={cn(chipVariants({ className }))} ref={ref} {...props} />
    );
  },
);
Chip.displayName = "Chip";

export default Chip;
