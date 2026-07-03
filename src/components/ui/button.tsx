"use client";
import { Text, Pressable } from "../../lib/primitives";
import * as React from "react"
import {   type PressableProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Slot } from "../../lib/slot"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-danger text-white hover:bg-danger/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"},
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10"}},
    defaultVariants: {
      variant: "default",
      size: "default"}}
)

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  onClick?: (event: any) => void;
  type?: "button" | "submit" | "reset";
  asChild?: boolean;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, children, textClassName, onClick, onPress, asChild, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className)

    if (asChild) {
      return (
        <Slot className={classes} onClick={onPress || onClick} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <Pressable onPress={onPress || onClick}
        ref={ref}
        {...({ className: classes } as any)}
        {...props}
      >
        {React.Children.map(children, (child) => 
          typeof child === 'string' || typeof child === 'number' ? (
            <Text {...({ className: cn("font-medium", textClassName) } as any)}>{child}</Text>
          ) : (
            child
          )
        )}
      </Pressable>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

