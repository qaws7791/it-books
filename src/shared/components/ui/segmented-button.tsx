"use client";

import { cn } from "@/src/shared/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

const SegmentedButtonGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "inline-flex items-center rounded-full border border-outline divide-x divide-outline overflow-hidden",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
SegmentedButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface SegmentedButtonItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string;
}

const SegmentedButtonItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  SegmentedButtonItemProps
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "flex-1 text-on-surface data-[state=checked]:bg-secondary-container data-[state=checked]:text-on-secondary-container overflow-hidden font-medium state-layer data-[state=checked]:hover:after:bg-on-secondary-container/8 data-[state=checked]:focus:after:bg-on-secondary-container/12 data-[state=checked]:active:after:bg-on-secondary-container/12",
        className,
      )}
      {...props}
    >
      <div className="inline-flex justify-center flex-1 gap-2 w-full px-8  py-2.5 cursor-pointer items-stretch whitespace-nowrap ">
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="material-icons fill-current text-current text-base leading-none">
            check
          </span>
        </RadioGroupPrimitive.Indicator>
        <label className="text-sm cursor-pointer">{label}</label>
      </div>
    </RadioGroupPrimitive.Item>
  );
});
SegmentedButtonItem.displayName = RadioGroupPrimitive.Item.displayName;

export { SegmentedButtonGroup, SegmentedButtonItem };
