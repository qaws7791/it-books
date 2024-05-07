import * as React from "react";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";

export function List({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
  return (
    <ul
      className={cn(
        "flex items-center flex-col w-40 h-full gap-2 bg-[#fdf9f3]",
        className
      )}
      {...props}
    />
  );
}

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  asChild?: boolean;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "li";
    return (
      <Comp
        className={cn(
          "text-lg font-semibold p-4 w-full hover:bg-[#eceae5] rounded-full",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

ListItem.displayName = "ListItem";
