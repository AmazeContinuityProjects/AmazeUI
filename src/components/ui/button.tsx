import * as React from "react"
import { Pressable, Text, type PressableProps, type TextProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "flex flex-row items-center justify-center gap-2 rounded-md font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90",
        destructive: "bg-danger hover:bg-danger/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const buttonTextVariants = cva(
  "font-medium",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-white",
        outline: "text-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground",
        link: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, children, textClassName, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...({ className: cn(buttonVariants({ variant, size }), className) } as any)}
        {...props}
      >
        {React.Children.map(children, (child) => 
          typeof child === 'string' || typeof child === 'number' ? (
            <Text {...({ className: cn(buttonTextVariants({ variant }), textClassName) } as any)}>{child}</Text>
          ) : (
            child
          )
        )}
      </Pressable>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, buttonTextVariants }
