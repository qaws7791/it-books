import { cn } from "@/src/feature/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const floatingButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium  relative state-layer leading-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-container text-on-primary-container hover:after:bg-on-primary-container/8  active:after:bg-on-primary-container/12 focus:after:bg-on-primary-container/12",
        secondary:
          "bg-secondary-container text-on-secondary-container hover:after:bg-on-secondary-container/8 focus:after:bg-on-secondary-container/12 active:after:bg-on-secondary-container/12",
        tertiary:
          "bg-tertiary-container text-on-tertiary-container hover:after:bg-on-tertiary-container/8 focus:after:bg-on-tertiary-container/12 active:after:bg-on-tertiary-container/12",
        surface:
          "bg-surface-container-high text-primary hover:after:bg-primary/8 active:after:bg-primary/12 focus:after:bg-primary/12",
      },
      size: {
        medium: "w-14 h-14 rounded-2xl",
        small: "w-10 h-10 rounded-xl",
        large: "w-24 h-24 rounded-3xl text-4xl",
      },
    },
    defaultVariants: {
      variant: "surface",
      size: "medium",
    },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof floatingButtonVariants> {
  asChild?: boolean;
  icon?: string;
  noShadow?: boolean;
}

const FloatingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, noShadow, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          floatingButtonVariants({ variant, size, className }),
          noShadow !== true && "shadow-3 hover:shadow-4",
        )}
        ref={ref}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "material-icons",
              size === "large" && "text-4xl leading-none",
            )}
          >
            {icon}
          </span>
        )}
      </Comp>
    );
  },
);
FloatingButton.displayName = "FloatingButton";

export default FloatingButton;
export { floatingButtonVariants };
