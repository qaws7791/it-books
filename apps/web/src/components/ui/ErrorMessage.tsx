import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const errorMessageVariants = cva("text-sm text-red-600 leading-none");

const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof errorMessageVariants>
>(({ className, ...props }, ref) => (
  <p className={cn(errorMessageVariants(), className)} ref={ref} {...props} />
));
ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
