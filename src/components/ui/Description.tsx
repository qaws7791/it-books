import * as React from "react";
import { cn } from "../../lib/utils";

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
