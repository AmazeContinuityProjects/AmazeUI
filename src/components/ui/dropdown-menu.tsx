import { View, Text, Pressable } from "../../lib/primitives";
import * as React from "react"
import { Modal,    type ViewProps, type TextProps } from "react-native"
import { cn } from "../../lib/utils"

export interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null)

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <View {...({ className: "relative" } as any)}>
        {children}
      </View>
    </DropdownContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef<React.ElementRef<typeof Pressable>, React.ComponentProps<typeof Pressable>>(
  ({ onPress, children, ...props }, ref) => {
    const context = React.useContext(DropdownContext)
    return (
      <Pressable ref={ref} onPress={(e) => { context?.setOpen(!context.open); onPress?.(e); (props as any).onClick?.(e) }} {...props}>
        {children}
      </Pressable>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DropdownContext)
    if (!context?.open) return null

    return (
      <Modal visible={context.open} transparent={true} animationType="fade" onRequestClose={() => context.setOpen(false)}>
        <Pressable 
           onPress={() => context.setOpen(false)} 
           {...({ className: "flex-1 bg-black/10 justify-end sm:justify-center items-center" } as any)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              ref={ref}
              {...({ className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95", className) } as any)}
              {...props}
            >
              {children}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof Pressable>, React.ComponentProps<typeof Pressable> & { className?: string; textClassName?: string }>(
  ({ className, textClassName, onPress, children, ...props }, ref) => {
    const context = React.useContext(DropdownContext)
    return (
      <Pressable
        ref={ref}
        onPress={(e) => { context?.setOpen(false); onPress?.(e); (props as any).onClick?.(e) }}
        {...({ className: cn("relative flex-row items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent", className) } as any)}
        {...props}
      >
        {typeof children === 'string' ? (
           <Text {...({ className: cn("text-foreground", textClassName) } as any)}>{children}</Text>
        ) : children}
      </Pressable>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuLabel = React.forwardRef<React.ElementRef<typeof Text>, TextProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Text ref={ref} {...({ className: cn("px-2 py-1.5 text-sm font-semibold text-foreground", className) } as any)} {...props} />
  )
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View ref={ref} {...({ className: cn("-mx-1 my-1 h-px bg-muted", className) } as any)} {...props} />
  )
)
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator}
