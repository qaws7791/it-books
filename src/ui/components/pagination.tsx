import { cn } from "@/src/feature/shared/lib/utils";
import Button from "@/src/ui/components/button";
import Link from "next/link";
import React from "react";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}

export const Pagination = ({ className, ...props }: PaginationProps) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
};

interface PaginationContentProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export const PaginationContent = ({
  className,
  ...props
}: PaginationContentProps) => {
  return <ul className={cn("flex space-x-1", className)} {...props} />;
};

interface PaginationItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const PaginationItem = ({
  className,
  ...props
}: PaginationItemProps) => {
  return (
    <li
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
};

interface PaginationLinkProps extends React.ComponentProps<typeof Link> {
  isActive?: boolean;
}

export const PaginationLink = ({ isActive, ...props }: PaginationLinkProps) => {
  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      size="icon"
      aria-current={isActive ? "page" : undefined}
    >
      <Link {...props} />
    </Button>
  );
};

export const PaginationPrevious = ({ ...props }: PaginationLinkProps) => {
  return (
    <PaginationLink {...props} aria-label="Previous page">
      <span className="material-icons">chevron_left</span>
    </PaginationLink>
  );
};

export const PaginationNext = ({ ...props }: PaginationLinkProps) => {
  return (
    <PaginationLink {...props} aria-label="Next page">
      <span className="material-icons">chevron_right</span>
    </PaginationLink>
  );
};

export const PaginationEllipsis = ({
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-10 h-10 items-center justify-center text-primary"
      {...props}
    >
      <span className="material-icons">more_horiz</span>
    </span>
  );
};
