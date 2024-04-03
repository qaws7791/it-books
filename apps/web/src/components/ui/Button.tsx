import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium text-sm rounded-full disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-[#655f3a] text-white hover:bg-[#706a42] disabled:bg-[#e1ded8] disabled:text-[#96948f]",
        secondary:
          "bg-[#eae4cd] text-[#655f3a] hover:bg-[#ded8c2] disabled:bg-[#e1ded8] disabled:text-[#96948f]",
        outline:
          "border border-[#655f3a] text-[#655f3a] bg-transparent hover:bg-neutral-100 disabled:border-[#e1ded8] disabled:text-[#96948f]",
        ghost:
          "bg-transparent text-black hover:bg-neutral-100 disabled:bg-[#e1ded8] disabled:text-[#96948f]",
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
