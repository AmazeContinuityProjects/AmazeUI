"use client";
import * as React from "react";
import { useTheme } from "./theme-provider";
import { useColorPalette, PALETTE_OPTIONS } from "../../hooks/use-color-palette";
import { Pressable, View, Text } from "../../lib/primitives";
import { cn } from "../../lib/utils";

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const { paletteId, setPaletteId } = useColorPalette();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <View className={cn("p-2 rounded-xl bg-card border border-border", className)}><View className="w-5 h-5" /></View>;
  }

  const Icon = theme === "dark" ? MoonIcon : SunIcon;

  return (
    <View className={cn("relative", className)}>
      <Pressable
        onPress={() => setOpen(!open)}
        className="flex items-center justify-center p-2 rounded-xl bg-card border border-border hover:bg-muted/60 transition-colors"
      >
        <Icon className="w-5 h-5 text-foreground/80" />
      </Pressable>

      {open && (
        <>
          <Pressable className="fixed inset-0 z-40" onPress={() => setOpen(false)} />
          <View
            className={cn(
              "absolute z-50 top-full mt-1 left-1/2 -translate-x-1/2",
              "w-44 rounded-2xl bg-card/90 backdrop-blur-2xl border border-border shadow-xl overflow-hidden",
              "animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <View className="flex flex-col p-2 gap-1">
              <Text className="text-xs font-semibold text-muted-foreground/70 px-2 pt-1">Mode</Text>
              <View className="flex flex-row gap-1">
                <Pressable
                  onPress={() => { setTheme("light"); setOpen(false); }}
                  className={cn(
                    "flex flex-row items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    theme === "light"
                      ? "bg-info/10 text-info"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <SunIcon className="w-4 h-4" />
                  <Text className="text-sm">Light</Text>
                </Pressable>
                <Pressable
                  onPress={() => { setTheme("dark"); setOpen(false); }}
                  className={cn(
                    "flex flex-row items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    theme === "dark"
                      ? "bg-info/10 text-info"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <MoonIcon className="w-4 h-4" />
                  <Text className="text-sm">Dark</Text>
                </Pressable>
              </View>

              <View className="h-px bg-border my-1" />

              <Text className="text-xs font-semibold text-muted-foreground/70 px-2 pt-1">Accent</Text>
              <View className="grid grid-cols-2 gap-1">
                {PALETTE_OPTIONS.map((p) => {
                  const active = p.id === paletteId;
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => { setPaletteId(p.id); setOpen(false); }}
                      className={cn(
                        "flex flex-row items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                        active
                          ? "bg-info/10 text-info"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <View
                        className="w-3 h-3 rounded-full shrink-0 border border-border"
                        style={{ backgroundColor: p.swatches[0] }}
                      />
                      <Text className="text-xs">{p.label}</Text>
                      {active && <CheckIcon className="w-3 h-3 ml-auto shrink-0 text-info" />}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
