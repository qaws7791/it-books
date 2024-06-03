import { cn } from "@/src/feature/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-xl flex flex-col text-on-surface overflow-hidden",
  {
    variants: {
      variant: {
        elevated: "bg-surface-container-low shadow-1 hover:shadow-2",
        filled:
          "bg-surface-container-highest hover:shadow-1 focus:shadow-1 active:shadow-1",
        outlined: "bg-surface border border-outline-variant hover:shadow-1",
      },
      clickable: {
        true: "cursor-pointer state-layer hover:after:bg-on-surface/8 focus:after:bg-on-surface/12 active:after:bg-on-surface/12 after:transition-colors",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      variant: "elevated",
      clickable: false,
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

function Card({
  className,
  variant,
  asChild = false,
  clickable,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(cardVariants({ variant, className, clickable }))}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cn("p-4", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("font-bold text-lg", className)} {...props} />;
}

export function CardSubTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h6 className={cn("text-base", className)} {...props} />;
}

export function CardText({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-on-surface-variant", className)}
      {...props}
    />
  );
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asChild?: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function CardImage({
  className,
  asChild = false,
  ...props
}: CardImageProps) {
  const Comp = asChild ? Slot : "img";
  return (
    <Comp
      className={cn("w-full object-cover rounded-xl", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function CardMedia({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative", className)} {...props} />;
}

export function CardActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex justify-end gap-2", className)} {...props} />;
}

export default Card;
export { cardVariants };
