"use client";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/primitives";

export interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <Pressable
      onPress={onClick}
      className={cn(
        "p-2 rounded-full bg-white dark:bg-gray-900",
        "shadow-sm border border-gray-200 dark:border-gray-800",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-all duration-200",
        className
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
        <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
      </svg>
    </Pressable>
  );
}
