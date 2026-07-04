import { cn } from "../../lib/utils";
import { View, Text } from "../../lib/primitives";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn("animate-spin text-blue-500", className)}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <View className={cn("flex flex-row items-center justify-center gap-3", className)}>
      <SpinnerIcon className={sizes[size]} />
      {label && (
        <Text className="text-sm text-gray-400 dark:text-gray-500">
          {label}
        </Text>
      )}
    </View>
  );
}
