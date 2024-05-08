import * as React from "react";
import { cn } from "@/src/shared/lib/utils";

const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm text-error leading-none", className)}
    ref={ref}
    {...props}
  />
));
ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
