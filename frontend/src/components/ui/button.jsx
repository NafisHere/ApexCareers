import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground bg-primary hover:bg-primary/90 shadow-[0_0_0_1px_rgba(88,166,255,0.30),0_10px_30px_rgba(88,166,255,0.10)] before:absolute before:inset-0 before:rounded-md before:bg-[linear-gradient(120deg,rgba(255,255,255,0.20),rgba(255,255,255,0.00),rgba(255,255,255,0.18))] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:pointer-events-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_0_1px_rgba(248,81,73,0.35),0_10px_30px_rgba(248,81,73,0.12)]",
        outline:
          "border border-input bg-transparent hover:bg-accent/20 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.25)]",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
