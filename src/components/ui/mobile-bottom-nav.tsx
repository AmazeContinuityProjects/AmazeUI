"use client";
import { View, Text, Pressable } from "../../lib/primitives";
import { cn } from "../../lib/utils";

export interface MobileBottomNavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export interface MobileBottomNavProps {
  items: MobileBottomNavItem[];
  className?: string;
}

export function MobileBottomNav({ items, className }: MobileBottomNavProps) {
  return (
    <View
      className={cn(
        "fixed left-1/2 z-[50] flex w-[min(24rem,calc(100vw-1.5rem))] -translate-x-1/2 flex-row items-center justify-between gap-1 rounded-[1.75rem] border border-white/55 bg-white/65 px-2 py-2 shadow-[0_18px_50px_rgba(15,23,42,0.18)] backdrop-blur-2xl md:hidden dark:border-white/10 dark:bg-gray-950/68 dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        className,
      )}
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' } as any}
    >
      {items.map((item) => (
        <Pressable
          key={item.id}
          onPress={item.onClick}
          className={cn(
            "flex min-h-[48px] flex-1 flex-col items-center justify-center rounded-[1.35rem] px-3 py-2 text-[10px] font-bold transition-all",
            item.isActive
              ? "bg-white/80 text-info shadow-sm dark:bg-white/10 scale-105"
              : "text-gray-500 hover:bg-white/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
          )}
        >
          <View className="shrink-0">{item.icon}</View>
          <Text className="mt-0.5">{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
