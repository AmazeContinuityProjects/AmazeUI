"use client";
import * as React from "react";
import { View, Text } from "../../lib/primitives";
import { cn } from "../../lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <View className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && <View className="mb-4 text-gray-300 dark:text-gray-700">{icon}</View>}
      <Text className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</Text>
      {description && (
        <Text className="mt-2 text-sm text-gray-400 dark:text-gray-500 max-w-xs">{description}</Text>
      )}
      {action && <View className="mt-6">{action}</View>}
    </View>
  );
}
