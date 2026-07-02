"use client";
import { View, Text, Pressable } from "../../lib/primitives";
import * as React from "react"
import { cn } from "../../lib/utils"

export interface FabProps {
  icon?: React.ReactNode;
  label?: string;
  onPress?: () => void;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  variant?: "primary" | "secondary" | "info";
  className?: string;
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-foreground text-background hover:bg-foreground/90",
  secondary: "bg-card text-foreground border border-border hover:bg-muted",
  info: "bg-info text-info-foreground hover:bg-info/90",
};

const positionStyles = {
  "bottom-right": "right-5 bottom-5",
  "bottom-left": "left-5 bottom-5",
  "bottom-center": "left-1/2 -translate-x-1/2 bottom-5",
};

const Fab = React.forwardRef<React.ElementRef<typeof View>, FabProps>(
  ({ className, icon, label, onPress, position = "bottom-right", variant = "primary", disabled = false }, ref) => {
    return (
      <Pressable
        ref={ref as any}
        onPress={onPress}
        disabled={disabled}
        className={cn(
          "fixed z-50 flex flex-row items-center transition-all duration-200 backdrop-blur-xl shadow-xl active:scale-95",
          label
            ? `gap-2.5 pl-4 pr-5 h-12 rounded-2xl ${variantStyles[variant]}`
            : `items-center justify-center w-14 h-14 rounded-full ${variantStyles[variant]}`,
          positionStyles[position],
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        {icon && <View className="shrink-0">{icon}</View>}
        {label && <Text className="text-sm font-semibold tracking-tight">{label}</Text>}
      </Pressable>
    );
  }
)
Fab.displayName = "Fab"

export interface FabAction {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "info" | "danger";
}

export interface FabSpeedDialProps {
  icon?: React.ReactNode;
  actions: FabAction[];
  position?: "bottom-right" | "bottom-left";
  className?: string;
}

function FabSpeedDial({ icon, actions, position = "bottom-right", className }: FabSpeedDialProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <View className={cn("fixed z-50", position === "bottom-right" ? "right-5 bottom-5" : "left-5 bottom-5", className)}>
      {open && (
        <Pressable className="fixed inset-0 z-40" onPress={() => setOpen(false)} />
      )}
      <View className="relative z-50 flex flex-col items-end gap-3">
        {open && (
          <View className="flex flex-col gap-2 mb-2">
            {actions.map((action, i) => (
              <Pressable
                key={i}
                onPress={() => { action.onPress(); setOpen(false); }}
                className={cn(
                  "flex flex-row items-center gap-3 px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-xl transition-all duration-200",
                  !action.variant || action.variant === "primary"
                    ? "bg-foreground text-background"
                    : action.variant === "danger"
                    ? "bg-danger text-danger-foreground"
                    : "bg-card text-foreground border border-border"
                )}
              >
                <View className="shrink-0">{action.icon}</View>
                <Text className="text-sm font-semibold whitespace-nowrap">{action.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <Pressable
          onPress={() => setOpen(!open)}
          className="flex flex-row items-center justify-center w-14 h-14 rounded-full bg-foreground text-background shadow-xl transition-all duration-200 hover:bg-foreground/90 active:scale-95"
        >
          <View className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
            {icon || (
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
FabSpeedDial.displayName = "FabSpeedDial"

export { Fab, FabSpeedDial }
