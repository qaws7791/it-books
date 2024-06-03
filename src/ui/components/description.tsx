import { cn } from "@/src/feature/shared/lib/utils";
import * as React from "react";

const Description = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm text-neutral-400 leading-none mt-2", className)}
    ref={ref}
    {...props}
  />
));
Description.displayName = "Description";

export default Description;
