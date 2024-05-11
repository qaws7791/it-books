import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/src/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium text-sm rounded-full disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-dark",
        secondary:
          "bg-secondary-container text-on-secondary-container hover:bg-secondary-container-dark",
        outline:
          "border border-primary text-primary bg-transparent hover:bg-primary/10",
        ghost: "bg-transparent text-black hover:bg-primary/10",
      },
      size: {
        default: "h-10 px-6 py-2",
        icon: "h-10 w-10 p-2",
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
