import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium text-sm rounded-full",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-black/70 disabled:bg-neutral-300",
        outline:
          "border border-black text-black bg-transparent hover:bg-neutral-100 disabled:text-neutral-300",
        ghost: "bg-transparent text-black hover:bg-neutral-100",
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
  }
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
  }
);
Button.displayName = "Button";

export default Button;
export { buttonVariants };
