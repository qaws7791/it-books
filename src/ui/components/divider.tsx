import { cn } from "@/src/feature/shared/lib/utils";

export default function Divider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("bg-outline-variant h-px w-full", className)}
      {...props}
    />
  );
}
