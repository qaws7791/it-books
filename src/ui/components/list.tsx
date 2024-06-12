import { cn } from "@/src/feature/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export function List({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">): JSX.Element {
  return (
    <ul
      className={cn(
        "flex items-center flex-col w-40 h-full gap-2 bg-[#fdf9f3]",
        className,
      )}
      {...props}
    />
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  asChild?: boolean;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "li";
    return (
      <Comp
        className={cn(
          "text-lg font-bold p-4 w-full hover:bg-[#eceae5] rounded-full",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

ListItem.displayName = "ListItem";
