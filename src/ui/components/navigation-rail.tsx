import { cn } from "@/src/feature/shared/lib/utils";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export const NavigationRail = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ children, className, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("flex flex-col w-22 h-full relative", className)}
    {...props}
  >
    <div
      className="
    w-22 h-full items-center text-on-surface bg-surface-container absolute z-20
    "
    >
      {children}
    </div>
    <NavigationRailViewport className="w-60" />
  </NavigationMenuPrimitive.Root>
));
NavigationRail.displayName = "NavigationRail";

export const NavigationRailList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-col items-center gap-3 flex-1 justify-start z-10 w-full",
      className,
    )}
    {...props}
  />
));

NavigationRailList.displayName = "NavigationRailList";

const NavigationRailItemContext = React.createContext({ selected: false });

interface NavigationRailItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {
  selected?: boolean;
  asChild?: boolean;
}

export const NavigationRailItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  NavigationRailItemProps
>(({ className, asChild, selected, ...props }, ref) => {
  const Compo = asChild ? Slot : NavigationMenuPrimitive.Item;
  return (
    <NavigationRailItemContext.Provider value={{ selected: !!selected }}>
      <Compo
        ref={ref}
        className={cn(
          "flex flex-col items-center text-xs gap-1 group h-14 w-full",
          className,
        )}
        {...props}
      />
    </NavigationRailItemContext.Provider>
  );
});
NavigationRailItem.displayName = "NavigationRailItem";

export const NavigationRailTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn("group w-full flex items-center flex-col", className)}
    {...props}
  />
));
NavigationRailTrigger.displayName = "NavigationRailTrigger";

export const NavigationRailContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      " flex flex-col items-center gap-3 absolute w-full",
      className,
    )}
    {...props}
  />
));
NavigationRailContent.displayName = "NavigationRailContent";

// "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",

// data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto

export const NavigationRailLink = NavigationMenuPrimitive.Link;

export const NavigationRailViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Viewport
    ref={ref}
    className={cn(
      "h-full data-[state=open]:animate-enterFromLeft data-[state=closed]:animate-exitToLeft absolute left-full top-0 ",
      className,
    )}
    {...props}
  />
));
NavigationRailViewport.displayName = "NavigationRailViewport";
// data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]

export function NavigationRailIcon({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
}: React.ComponentPropsWithoutRef<"div">) {
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
