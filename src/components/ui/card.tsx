"use client";
import * as React from "react";
import { View, Text } from "../../lib/primitives";
import { cn } from "../../lib/utils";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  variant?: "default" | "glass" | "gradient" | "outline";
  gradient?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export function Card({
  children,
  className,
  onClick,
  hover = false,
  variant = "default",
  gradient,
  title,
  subtitle,
  action,
}: CardProps) {
  const base = "rounded-2xl transition-all duration-300";

  const variants = {
    default: "bg-white text-gray-900 border border-gray-200 shadow-sm dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800",
    glass: "bg-white/70 backdrop-blur-xl border border-gray-200 dark:bg-gray-950/40 dark:border-gray-800",
    gradient: gradient
      ? `border-none text-white shadow-md ${gradient}`
      : "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white shadow-md",
    outline: "border border-gray-200 bg-transparent text-gray-900 dark:border-gray-800 dark:text-gray-100",
  };

  const hoverClasses = hover
    ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
    : onClick
      ? "cursor-pointer"
      : "";

  const hasHeader = title !== undefined || subtitle !== undefined || action !== undefined;

  return (
    <View
      onClick={onClick}
      className={cn(base, variants[variant], hoverClasses, onClick && "cursor-pointer", className)}
    >
      {hasHeader && (
        <CardHeader action={action}>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      )}
      {children}
    </View>
  );
}

export function CardHeader({ className, action, children, ...props }: { className?: string; action?: React.ReactNode; children?: React.ReactNode; [key: string]: any }) {
  if (action) {
    return (
      <View className={cn("flex items-start justify-between gap-4 p-6", className)} {...props}>
        <View className="flex flex-col space-y-1.5 flex-1 min-w-0">{children}</View>
        <View className="shrink-0">{action}</View>
      </View>
    );
  }
  return <View className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</View>;
}

export function CardTitle({ className, ...props }: { className?: string; [key: string]: any }) {
  return <Text className={cn("font-semibold text-lg leading-none tracking-tight text-gray-900 dark:text-gray-100", className)} {...props} />;
}

export function CardDescription({ className, ...props }: { className?: string; [key: string]: any }) {
  return <Text className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props} />;
}

export function CardContent({ className, ...props }: { className?: string; [key: string]: any }) {
  return <View className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: { className?: string; [key: string]: any }) {
  return <View className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
