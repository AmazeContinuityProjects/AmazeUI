"use client";
import { View, Text } from "../../lib/primitives";
import * as React from "react"
import { type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

export interface EmptyStateProps extends ViewProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

const EmptyState = React.forwardRef<React.ElementRef<typeof View>, EmptyStateProps>(
  ({ className, icon, title, description, action, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "flex flex-col items-center justify-center text-center py-12",
        "bg-muted/30 rounded-3xl border border-dashed border-border",
        className
      ) } as any)}
      {...props}
    >
      {icon && (
        <View className="w-16 h-16 bg-muted rounded-full flex flex-row items-center justify-center mb-4">
          <View className="text-muted-foreground">{icon}</View>
        </View>
      )}
      {title && (
        <Text className="text-muted-foreground font-medium">{title}</Text>
      )}
      {description && (
        <Text className="text-muted-foreground/70 text-sm mt-1">{description}</Text>
      )}
      {children}
      {action && (
        <View className="mt-4">{action}</View>
      )}
    </View>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
