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
        "bg-indigo-50/60 dark:bg-indigo-950/30",
        "rounded-b-2xl shadow-sm px-6 py-6 sm:py-8",
        "border-b border-indigo-100/50 dark:border-indigo-900/30",
        "mb-8 max-w-7xl mx-auto w-full transition-all duration-300",
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
        "text-3xl sm:text-4xl font-black tracking-tight",
        "text-indigo-950 dark:text-indigo-100",
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
        "mt-2 text-sm font-medium",
        "text-indigo-700/80 dark:text-indigo-300/80",
        "max-w-xl",
        className
      ) } as any)}
      {...props}
    />
  )
)
Description.displayName = "Description"

export { Header, Title, Description }
