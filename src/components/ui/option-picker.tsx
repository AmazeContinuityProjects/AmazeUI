"use client";
import { View, Text, Pressable } from "../../lib/primitives";
import * as React from "react"
import { createPortal } from "react-dom"
import { Modal } from "react-native"
import { cn } from "../../lib/utils"

export interface OptionPickerOption {
  value: string;
  label: string;
}

export interface OptionPickerProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionPickerOption[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
  disabled?: boolean;
}

function useIsMobile() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const OptionPicker = React.forwardRef<React.ElementRef<typeof View>, OptionPickerProps>(
  ({ className, value, onChange, options, placeholder = "Select...", searchable = true, disabled = false }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const isMobile = useIsMobile();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });

    const selected = options.find(o => o.value === value);

    const filtered = query
      ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()) || o.value.toLowerCase().includes(query.toLowerCase()))
      : options;

    React.useEffect(() => {
      if (open && !isMobile && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({ top: rect.bottom + 6, left: rect.left, width: rect.width });
      }
    }, [open, isMobile]);

    React.useEffect(() => {
      if (!open) setQuery("");
    }, [open]);

    const handleSelect = (opt: OptionPickerOption) => {
      onChange(opt.value);
      setOpen(false);
    };

    const listContent = (
      <View className="flex flex-col h-full max-h-[85vh]">
        {searchable && (
          <View className="relative shrink-0 border-b border-border">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full bg-transparent pl-10 pr-10 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
            />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground">
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </View>
        )}
        <View className="flex-1 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <View className="py-8 text-center">
              <Text className="text-sm text-muted-foreground/50">No options found</Text>
            </View>
          ) : (
            filtered.map((opt) => {
              const active = opt.value === value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => handleSelect(opt)}
                  className={cn(
                    "flex flex-row items-center gap-3 px-4 py-3 transition-colors mx-1 rounded-lg",
                    active
                      ? "bg-info/10 text-info font-semibold"
                      : "text-foreground hover:bg-muted/70"
                  )}
                >
                  <Text className={cn(
                    "text-sm flex-1",
                    active ? "font-semibold" : "font-medium"
                  )}>
                    {opt.label}
                  </Text>
                  {active && (
                    <View className="w-2 h-2 rounded-full bg-info shrink-0" />
                  )}
                </Pressable>
              );
            })
          )}
        </View>
      </View>
    );

    return (
      <View ref={ref} className={cn("relative", className)}>
        <Pressable
          ref={triggerRef as any}
          onPress={() => !disabled && setOpen(true)}
          className={cn(
            "flex flex-row items-center justify-between gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/30",
            !selected && "text-muted-foreground/60"
          )}
        >
          <Text className="truncate text-sm">
            {selected ? selected.label : placeholder}
          </Text>
          <ChevronDownIcon className={`w-4 h-4 shrink-0 text-muted-foreground/60 transition-transform ${open ? "rotate-180" : ""}`} />
        </Pressable>

        {open && !isMobile && typeof document !== "undefined" && createPortal(
          <>
            <Pressable className="fixed inset-0 z-50" onPress={() => setOpen(false)} />
            <View
              {...({ className: cn(
                "fixed z-50 bg-popover border border-border rounded-xl shadow-xl overflow-hidden",
                "animate-in fade-in slide-in-from-top-2 duration-200",
                "min-w-[240px]"
              ) } as any)}
              style={{ top: position.top, left: position.left, width: Math.max(position.width, 240) }}
            >
              <View className="max-h-[320px] flex flex-col">
                {listContent}
              </View>
            </View>
          </>,
          document.body
        )}

        {open && isMobile && (
          <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
            <View className="flex-1 items-center justify-center bg-black/60 p-4">
              <View className="w-full max-w-md max-h-[85vh] bg-background rounded-2xl border border-border shadow-2xl overflow-hidden">
                {listContent}
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }
)
OptionPicker.displayName = "OptionPicker"

export { OptionPicker }
