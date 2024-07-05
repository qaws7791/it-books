"use client";
import { cn } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const chipVariants = cva(
  "h-8 flex items-center whitespace-nowrap gap-2 rounded-lg text-sm leading-5 px-4 text-on-surface-variant font-medium bg-transparent state-layer hover:after:bg-on-surface-variant/8 focus:after:bg-on-surface-variant/12 active:after:bg-on-surface-variant/12 border transition-spacing duration-100 ease-out	",
  {
    variants: {
      status: {
        unselected: "border-outline",
        selected:
          "border-transparent bg-secondary-container text-on-secondary-container",
      },
    },
    defaultVariants: {
      status: "unselected",
    },
  },
);

export interface ChipProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, asChild, children, type, status, ...props }, ref) => {
    const Compo = asChild ? Slot : "button";

    return (
      <Compo
        type={type ?? (Compo === "button" ? "button" : undefined)}
        className={cn(chipVariants({ className, status }))}
        ref={ref}
        {...props}
      >
        {children}
      </Compo>
    );
  },
);
Chip.displayName = "Chip";

const ChipRemoveIcon = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<"button">
>(({ className, ...props }, ref) => (
  <Button
    variant="ghost"
    size="iconSmall"
    className={cn("material-icons", className)}
    ref={ref}
    {...props}
  >
    close
  </Button>
));
ChipRemoveIcon.displayName = "ChipRemoveIcon";

export default Chip;
export { ChipRemoveIcon };
