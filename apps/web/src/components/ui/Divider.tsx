import { cn } from "@web/src/lib/utils";

export default function Divider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-outline-variant h-px w-full", className)}
      {...props}
    />
  );
}
