import { cn } from "@/src/feature/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { createContext } from "react";
interface NavigationRailProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
export function NavigationRail({
  children,
  className,
  asChild,
  ...props
}: NavigationRailProps) {
  const Compo = asChild ? Slot : "nav";
  return (
    <Compo
      className={`flex flex-col gap-2 w-20 text-on-surface ${className}`}
      {...props}
    >
      {children}
    </Compo>
  );
}

interface NavigationRailItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
  selected?: boolean;
}
const NavigationRailItemContext = createContext<{
  selected: boolean;
}>({
  selected: false,
});

export const NavigationRailItem = React.forwardRef<
  HTMLButtonElement,
  NavigationRailItemProps
>(({ children, className, asChild, selected, ...props }, ref) => {
  const Compo = asChild ? Slot : "button";
  return (
    <NavigationRailItemContext.Provider value={{ selected: !!selected }}>
      <Compo
        ref={ref}
        className={cn(
          "flex flex-col items-center text-xs gap-1 group h-14",
          className,
        )}
        {...props}
      >
        {children}
      </Compo>
    </NavigationRailItemContext.Provider>
  );
});
NavigationRailItem.displayName = "NavigationRailItem";

interface NavigationRailIconProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function NavigationRailIcon({
  className,
  children,
  ...props
}: NavigationRailIconProps) {
  const { selected } = React.useContext(NavigationRailItemContext);
  return (
    <div
      className={cn(
        "flex items-center justify-center w-14 h-8 rounded-full  text-gray-500 font-bold text-on-surface-variant state-layer group-hover:after:bg-on-surface/8 group-focus:after:bg-on-surface/12 group-active:after:bg-on-surface/12",
        selected && "bg-secondary-container text-on-secondary-container",
        className,
      )}
      {...props}
    >
      <span className="material-icons">{children}</span>
    </div>
  );
}

export function NavigationRailHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-on-surface-variant my-4",
        className,
      )}
      {...props}
    />
  );
}

interface NavigationRailListProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
}

export function NavigationRailList({
  className,
  align = "start",
  ...props
}: NavigationRailListProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 flex-1",
        align === "start" && "justify-start",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        className,
      )}
      {...props}
    />
  );
}
