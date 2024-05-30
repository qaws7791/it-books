import { cn } from "@/src/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { createContext } from "react";

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export function Drawer({
  className,
  asChild = false,
  children,
  ...props
}: DrawerProps) {
  const Compo = asChild ? Slot : "div";
  return (
    <Compo
      className={cn(
        "bg-surface-container-low rounded-2xl p-3 text-on-surface-variant flex flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </Compo>
  );
}

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}
export function DrawerTitle({
  className,
  asChild = false,
  ...props
}: DrawerTitleProps) {
  const Compo = asChild ? Slot : "span";
  return (
    <Compo
      className={cn("text-sm font-medium px-4 py-2 h-14 p-4", className)}
      {...props}
    />
  );
}

export interface DrawerItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  selected?: boolean;
}
const DrawerItemContext = createContext<{
  selected: boolean;
}>({
  selected: false,
});
export const DrawerItem = React.forwardRef<HTMLButtonElement, DrawerItemProps>(
  (
    { className, asChild = false, selected = false, ...props }: DrawerItemProps,
    ref,
  ) => {
    const Compo = asChild ? Slot : "button";
    return (
      <DrawerItemContext.Provider value={{ selected }}>
        <Compo
          data-active={selected === true}
          className={cn(
            "group flex items-center gap-3 p-4 pr-6 rounded-full hover:bg-surface-dim/40 h-14 state-layer hover:after:bg-on-surface/8 focus:after:bg-on-surface/12 active:bg-on-surface/12 data-[active=true]:bg-secondary-container data-[active=true]:text-on-secondary-container data-[active=true]:font-bold data-[active=true]:hover:after:bg-on-secondary-container/8 data-[active=true]:focus:after:bg-on-secondary-container/8 data-[active=true]:active:after:bg-on-secondary-container/8",
            className,
          )}
          ref={ref}
          {...props}
        />
      </DrawerItemContext.Provider>
    );
  },
);
DrawerItem.displayName = "DrawerItem";

export function DrawerIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { selected } = React.useContext(DrawerItemContext);
  return (
    <span
      className={cn(
        "text-on-surface-variant",
        selected ? "material-icons" : "material-icons-outlined",
        className,
      )}
      {...props}
    />
  );
}

export interface DrawerSectionHeaderProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export function DrawerSectionHeader({
  className,
  asChild = false,
  ...props
}: DrawerSectionHeaderProps) {
  const Compo = asChild ? Slot : "span";
  return (
    <Compo
      className={cn("text-sm font-medium h-14 p-4", className)}
      {...props}
    />
  );
}

export function DrawerDivider() {
  return <div className="mx-4 my-2 h-px bg-outline-variant" />;
}
