import * as React from "react"
import { View, Text, type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn("rounded-xl border border-border bg-card shadow-sm", className) } as any)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn("flex flex-col space-y-1.5 p-6", className) } as any)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<React.ElementRef<typeof Text>, TextProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn("font-semibold text-lg leading-none tracking-tight text-foreground", className) } as any)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<React.ElementRef<typeof Text>, TextProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn("text-sm text-muted-foreground", className) } as any)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View ref={ref} {...({ className: cn("p-6 pt-0", className) } as any)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn("flex flex-row items-center p-6 pt-0", className) } as any)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
