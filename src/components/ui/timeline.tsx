"use client";
import { View, Text } from "../../lib/primitives";
import * as React from "react"
import { type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

const dotColors = {
  blue: "bg-blue-500 dark:bg-blue-400 border-blue-200 dark:border-blue-800",
  emerald: "bg-emerald-500 dark:bg-emerald-400 border-emerald-200 dark:border-emerald-800",
  purple: "bg-purple-500 dark:bg-purple-400 border-purple-200 dark:border-purple-800",
  amber: "bg-amber-500 dark:bg-amber-400 border-amber-200 dark:border-amber-800",
  pink: "bg-pink-500 dark:bg-pink-400 border-pink-200 dark:border-pink-800",
  indigo: "bg-indigo-500 dark:bg-indigo-400 border-indigo-200 dark:border-indigo-800",
  gray: "bg-gray-400 dark:bg-gray-500 border-gray-200 dark:border-gray-700",
}

export interface TimelineProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

const Timeline = React.forwardRef<React.ElementRef<typeof View>, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn("relative flex flex-col", className) } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps extends ViewProps {
  className?: string;
  dotColor?: keyof typeof dotColors;
  children?: React.ReactNode;
}

const TimelineItem = React.forwardRef<React.ElementRef<typeof View>, TimelineItemProps>(
  ({ className, dotColor = "blue", children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "relative flex flex-row gap-4 pb-10 pl-0 group",
        className
      ) } as any)}
      {...props}
    >
      <View className="flex flex-col items-center shrink-0 pt-1.5">
        <View className={cn(
          "w-3.5 h-3.5 rounded-full border-2 shrink-0 z-10 ring-2 ring-background",
          dotColors[dotColor]
        )} />
        <View className="w-0.5 flex-1 bg-gradient-to-b from-border/80 to-border/20 mt-2" />
      </View>
      <View className="flex-1 min-w-0">
        {children}
      </View>
    </View>
  )
)
TimelineItem.displayName = "TimelineItem"

export interface TimelineCardProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

const TimelineCard = React.forwardRef<React.ElementRef<typeof View>, TimelineCardProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "rounded-xl border border-border bg-card p-4 shadow-sm",
        "transition-all duration-200 group-hover:shadow-md group-hover:border-foreground/20",
        className
      ) } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
TimelineCard.displayName = "TimelineCard"

export interface TimelineDateProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
}

const TimelineDate = React.forwardRef<React.ElementRef<typeof Text>, TimelineDateProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn(
        "text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5",
        className
      ) } as any)}
      {...props}
    >
      {children}
    </Text>
  )
)
TimelineDate.displayName = "TimelineDate"

export interface TimelineTitleProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
}

const TimelineTitle = React.forwardRef<React.ElementRef<typeof Text>, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn(
        "text-base font-semibold text-foreground leading-snug",
        className
      ) } as any)}
      {...props}
    >
      {children}
    </Text>
  )
)
TimelineTitle.displayName = "TimelineTitle"

export interface TimelineDescriptionProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
}

const TimelineDescription = React.forwardRef<React.ElementRef<typeof Text>, TimelineDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn(
        "text-sm text-muted-foreground mt-1.5 whitespace-pre-wrap",
        className
      ) } as any)}
      {...props}
    >
      {children}
    </Text>
  )
)
TimelineDescription.displayName = "TimelineDescription"

export interface TimelineActionsProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

const TimelineActions = React.forwardRef<React.ElementRef<typeof View>, TimelineActionsProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "flex flex-row items-center gap-2 mt-3 pt-3 border-t border-border/50",
        className
      ) } as any)}
      {...props}
    >
      {children}
    </View>
  )
)
TimelineActions.displayName = "TimelineActions"

export {
  Timeline,
  TimelineItem,
  TimelineCard,
  TimelineDate,
  TimelineTitle,
  TimelineDescription,
  TimelineActions,
}
