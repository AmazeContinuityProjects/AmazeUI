"use client";
import { View } from "../../lib/primitives";
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

const colorMap = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  pink: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  gray: "bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400",
}

export interface IconBadgeProps extends ViewProps {
  color?: keyof typeof colorMap
  size?: "sm" | "md"
  className?: string
  children?: React.ReactNode
}

const IconBadge = React.forwardRef<React.ElementRef<typeof View>, IconBadgeProps>(
  ({ className, color = "blue", size = "md", children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "shrink-0 flex flex-row items-center justify-center",
        size === "sm" ? "w-8 h-8 rounded-full" : "w-10 h-10 rounded-xl",
        colorMap[color] || colorMap.blue,
        className
      ) } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
IconBadge.displayName = "IconBadge"

export { IconBadge }
