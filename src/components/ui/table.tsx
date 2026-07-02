"use client";
import { View, Text } from "../../lib/primitives";
import * as React from "react"
import {   type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

const Table = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View {...({ className: "w-full overflow-hidden" } as any)}>
      <View
        ref={ref}
        {...({ className: cn("w-full text-sm", className) } as any)}
        {...props}
      />
    </View>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View ref={ref} {...({ className: cn("flex flex-row items-center border-b border-border bg-muted/50", className) } as any)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn("flex flex-col [&_>_view:last-child]:border-0", className) } as any)}
      {...props}
    />
  )
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "flex flex-row items-center border-b border-border transition-colors hover:bg-muted/50",
        className
      ) } as any)}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn(
        "h-12 px-4 flex justify-center text-left align-middle font-medium text-muted-foreground",
        className
      ) } as any)}
      {...props}
    >
      {typeof children === 'string' ? <Text {...({ className: "font-semibold text-muted-foreground text-sm" } as any)}>{children}</Text> : children}
    </View>
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      {...({ className: cn("p-4 align-middle", className) } as any)}
      {...props}
    >
      {typeof children === 'string' ? <Text {...({ className: "text-foreground text-sm" } as any)}>{children}</Text> : children}
    </View>
  )
)
TableCell.displayName = "TableCell"

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell}

