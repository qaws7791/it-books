"use client";
import Button from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const chipVariants = cva(
  "h-8 whitespace-nowrap gap-2 border border-outline rounded-lg text-sm leading-5 text-on-surface-variant font-medium bg-transparent state-layer hover:after:bg-on-surface-variant/8 focus:after:bg-on-surface-variant/12 active:after:bg-on-surface-variant/12",
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, asChild, children, onRemove, onClick, ...props }, ref) => {
    const Compo = asChild ? Slot : "button";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (onClick) {
        event.preventDefault();
        onClick(event);
      }
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (onRemove) {
        event.preventDefault();
        onRemove();
      }
    };

    return (
      <Compo
        onClick={handleClick}
        className={cn(chipVariants({ className }), onClick && "cursor-pointer")}
        ref={ref}
        {...props}
      >
        <div className="inline-flex items-center">
          <span className={cn(onRemove ? "pl-4" : "px-4")}>{children}</span>
          {onRemove && (
            <Button
              variant="ghost"
              size="iconSmall"
              className="material-icons m-1"
              onClick={handleRemove}
            >
              close
            </Button>
          )}
        </div>
      </Compo>
    );
  },
);
Chip.displayName = "Chip";

export default Chip;
