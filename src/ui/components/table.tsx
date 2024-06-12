import { cn } from "@/src/feature/shared/lib/utils";
import React from "react";

export const Table = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithRef<"table">
>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn("w-full text-left", className)} {...props} />
));
Table.displayName = "Table";

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithRef<"thead">
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("h-12", className)} {...props} />
));
TableHead.displayName = "TableHead";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithRef<"tbody">
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("divide-y", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithRef<"tr">
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("h-12", className)} {...props} />
));
TableRow.displayName = "TableRow";

export const TableHeader = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithRef<"th">
>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("px-2", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithRef<"td">
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-2", className)} {...props} />
));
TableCell.displayName = "TableCell";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithRef<"tfoot">
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("h-12", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentPropsWithRef<"caption">
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("sr-only", className)} {...props} />
));
TableCaption.displayName = "TableCaption";
