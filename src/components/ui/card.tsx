"use client";
import { View, Text } from "../../lib/primitives";
import * as React from "react"
import {  type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

export interface CardProps extends ViewProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onPress?: any;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

const Card = React.forwardRef<React.ElementRef<typeof View>, CardProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    const hasHeader = title !== undefined || subtitle !== undefined || action !== undefined;
    return (
      <View
        ref={ref}
        {...({ className: cn("rounded-xl border border-border bg-card/60 backdrop-blur-xl shadow-sm dark:bg-card/40", className) } as any)}
        {...props}
      >
        {hasHeader && (
          <CardHeader action={action}>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
      </View>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string; action?: React.ReactNode }>(
  ({ className, action, children, ...props }, ref) => {
    if (action) {
      return (
        <View
          ref={ref}
          {...({ className: cn("flex flex-row items-start justify-between gap-4 p-6", className) } as any)}
          {...props}
        >
          <View {...({ className: "flex flex-col space-y-1.5 flex-1 min-w-0" } as any)}>
            {children}
          </View>
          <View {...({ className: "shrink-0" } as any)}>
            {action}
          </View>
        </View>
      );
    }
    return (
      <View
        ref={ref}
        {...({ className: cn("flex flex-col space-y-1.5 p-6", className) } as any)}
        {...props}
      />
    );
  }
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
