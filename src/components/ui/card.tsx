"use client";
import * as React from "react";
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
    <div
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
    </div>
  );
}

export function CardHeader({ className, action, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { action?: React.ReactNode }) {
  if (action) {
    return (
      <div className={cn("flex items-start justify-between gap-4 p-6", className)} {...props}>
        <div className="flex flex-col space-y-1.5 flex-1 min-w-0">{children}</div>
        <div className="shrink-0">{action}</div>
      </div>
    );
  }
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold text-lg leading-none tracking-tight text-gray-900 dark:text-gray-100", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
