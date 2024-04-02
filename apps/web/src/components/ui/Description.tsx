import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const descriptionVariants = cva("text-sm text-neutral-400 leading-none");

const Description = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof descriptionVariants>
>(({ className, ...props }, ref) => (
  <p className={cn(descriptionVariants(), className)} ref={ref} {...props} />
));
Description.displayName = "Description";

export default Description;
