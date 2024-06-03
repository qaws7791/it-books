import { cn } from "@/src/feature/shared/lib/utils";
import * as React from "react";

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
