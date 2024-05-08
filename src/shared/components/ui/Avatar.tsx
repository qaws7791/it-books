import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/src/shared/lib/utils";

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  children: React.ReactNode;
}

const AvatarCompo = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex w-10 h-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    ref={ref}
    {...props}
  />
));
AvatarCompo.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={cn("aspect-square h-full w-full", className)}
    ref={ref}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    ref={ref}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const Avatar = Object.assign(AvatarCompo, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export default Avatar;
