"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn("animate-spin", className)}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}

export interface FetchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  variant?: "primary" | "success" | "danger" | "gradient" | "ghost";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export const FetchButton = React.forwardRef<HTMLButtonElement, FetchButtonProps>(
  ({ children, onClick, loading = false, disabled = false, className, variant = "primary", size = "md", icon, type = "button", ...props }, ref) => {
    const sizeClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-sm border border-blue-700",
      success:
        "bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/20",
      danger:
        "bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/20",
      gradient:
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg",
      ghost:
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent",
    };

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-300 cursor-pointer",
          sizeClasses,
          variants[variant],
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? <SpinnerIcon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} /> : icon || null}
        {children}
      </button>
    );
  }
);
FetchButton.displayName = "FetchButton";
