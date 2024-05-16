import { cn } from "@/src/shared/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-10 rounded-lg border border-[#655f3a] bg-transparent p-3 text-sm text-[#655f3a] file:border-0 hover:bg-neutral-100 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#655f3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
