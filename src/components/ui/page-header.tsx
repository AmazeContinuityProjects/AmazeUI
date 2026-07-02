"use client";
import { View, Text } from "../../lib/primitives";
import * as React from "react"
import { type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

const Header = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "rounded-b-2xl border-b px-6 py-6 sm:py-8",
        "mb-8 w-full transition-all duration-300",
        className
      ) } as any)}
      {...props}
    />
  )
)
Header.displayName = "Header"

const Title = React.forwardRef<React.ElementRef<typeof Text>, TextProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn(
        "text-3xl sm:text-4xl font-black tracking-tight text-foreground",
        className
      ) } as any)}
      {...props}
    />
  )
)
Title.displayName = "Title"

const Description = React.forwardRef<React.ElementRef<typeof Text>, TextProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn(
        "mt-2 text-sm text-muted-foreground max-w-xl",
        className
      ) } as any)}
      {...props}
    />
  )
)
Description.displayName = "Description"

export { Header, Title, Description }
