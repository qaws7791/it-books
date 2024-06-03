import { cn } from "@/src/feature/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium text-sm rounded-full disabled:cursor-not-allowed relative state-layer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-on-primary hover:after:bg-on-primary/8  active:after:bg-on-primary/12 focus:after:bg-on-primary/12 disabled:bg-transparent disabled:after:bg-on-surface/12 disabled:text-on-surface/40",
        secondary:
          "bg-secondary-container text-on-secondary-container hover:after:bg-on-secondary-container/8 focus:after:bg-on-secondary-container/12 active:after:bg-on-secondary-container/12 disabled:bg-transparent disabled:after:bg-on-surface/12 disabled:text-on-surface/40",
        outline:
          "bg-transparent text-primary border border-outline hover:after:bg-primary/8 active:after:bg-primary/12  focus:after:bg-primary/12 disabled:after:bg-transparent disabled:border-on-surface/12 disabled:text-on-surface/40",
        ghost:
          "bg-transparent text-primary hover:after:bg-primary/8 active:after:bg-primary/12 focus:after:bg-primary/12 disabled:after:bg-transparent disabled:text-on-surface/40",
      },
      size: {
        default: "h-10 px-6 py-2",
        icon: "h-10 w-10 p-2",
        iconSmall: "h-6 w-6 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
export { buttonVariants };
