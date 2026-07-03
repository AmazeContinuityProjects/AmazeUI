"use client";
import { View, Pressable } from "../../lib/primitives";
import * as React from "react"
import { Modal,   type ViewProps } from "react-native"
import { cn } from "../../lib/utils"

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null)

function Popover({ children, open: controlledOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = React.useCallback((val: boolean) => {
    if (!isControlled) setInternalOpen(val)
    onOpenChange?.(val)
  }, [isControlled, onOpenChange])
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <View {...({ className: "relative" } as any)}>
        {children}
      </View>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<React.ElementRef<typeof Pressable>, React.ComponentProps<typeof Pressable> & { asChild?: boolean }>(
  ({ onPress, children, asChild, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    const handler = (e: any) => { context?.setOpen(!context.open); onPress?.(e); (props as any).onClick?.(e) }
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...(children.props as any),
        ...props,
        onPress: handler,
        onClick: handler,
      })
    }
    return (
      <Pressable ref={ref} onPress={handler} {...props}>
        {children}
      </Pressable>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<React.ElementRef<typeof View>, ViewProps & { className?: string; align?: "start" | "end" | "center" }>(
  ({ className, children, align, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    if (!context?.open) return null

    return (
      <Modal visible={context.open} transparent={true} animationType="fade" onRequestClose={() => context.setOpen(false)}>
        <Pressable 
           onPress={() => context.setOpen(false)} 
           {...({ className: "flex-1 bg-transparent justify-center items-center" } as any)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View
              ref={ref}
              {...({ className: cn("z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none", className) } as any)}
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
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

