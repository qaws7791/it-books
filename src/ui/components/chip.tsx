"use client";
import { cn } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const chipVariants = cva(
  "h-8 flex items-center whitespace-nowrap gap-2 border border-outline rounded-lg text-sm leading-5 py-1 px-3 text-on-surface-variant font-medium bg-transparent state-layer hover:after:bg-on-surface-variant/8 focus:after:bg-on-surface-variant/12 active:after:bg-on-surface-variant/12 has-[button]:pr-2",
);

export interface ChipProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, asChild, children, onClick, type, ...props }, ref) => {
    const Compo = asChild ? Slot : "button";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (onClick) {
        event.preventDefault();
        onClick(event);
      }
    };

    return (
      <Compo
        type={type ?? (Compo === "button" ? "button" : undefined)}
        onClick={handleClick}
        className={cn(chipVariants({ className }), onClick && "cursor-pointer")}
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
