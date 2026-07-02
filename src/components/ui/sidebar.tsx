"use client";
import * as React from "react"
import { cn } from "../../lib/utils"

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "left" | "right"
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, isOpen = true, onOpenChange, side = "left", children, ...props }, ref) => {
    // We let the parent control state if onOpenChange is passed
    const [internalOpen, setInternalOpen] = React.useState(isOpen)
    const isControlled = onOpenChange !== undefined
    const openState = isControlled ? isOpen : internalOpen
    
    const handleToggle = React.useCallback((open: boolean) => {
      if (isControlled) {
        onOpenChange(open)
      } else {
        setInternalOpen(open)
      }
    }, [isControlled, onOpenChange])

    return (
      <SidebarContext.Provider value={{ isOpen: openState, setIsOpen: handleToggle }}>
        <aside
          ref={ref}
          data-state={openState ? "expanded" : "collapsed"}
          className={cn(
            "fixed top-4 z-50 hidden h-[calc(100vh-2rem)] flex-col overflow-visible rounded-[24px] border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:flex",
            openState ? "w-[280px]" : "w-[72px]",
            side === "left" ? "left-4" : "right-4",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col border-b border-sidebar-border shrink-0",
          isOpen ? "px-4 pb-4 pt-5" : "px-3.5 py-4",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth",
          isOpen ? "px-3 py-4" : "px-2 py-4 items-center",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarContent.displayName = "SidebarContent"

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1 w-full", className)}
        {...props}
      />
    )
  }
)
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    if (!isOpen) return null
    return (
      <div
        ref={ref}
        className={cn("px-3 mb-1 mt-4 text-[10px] font-bold uppercase tracking-[0.1em] text-sidebar-foreground/50", className)}
        {...props}
      />
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  isActive?: boolean
  label?: React.ReactNode
  rightElement?: React.ReactNode
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, isActive, label, rightElement, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <button
        ref={ref}
        data-active={isActive}
        className={cn(
          "group relative flex items-center rounded-xl transition-all duration-200 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isOpen ? "gap-3 px-3 py-2.5 justify-start text-sm" : "justify-center p-3 h-11 w-11 mt-1",
          isActive 
            ? "bg-sidebar-accent border border-sidebar-border text-info font-semibold shadow-sm" 
            : "text-sidebar-foreground/70 border border-transparent",
          className
        )}
        {...props}
      >
        <div className={cn("shrink-0", isActive ? "text-info" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground")}>
          {icon}
        </div>
        {isOpen && label && (
          <span className={cn("truncate flex-1 text-left", isActive ? "font-semibold" : "font-medium")}>
            {label}
          </span>
        )}
        {isOpen && rightElement && (
          <div className="shrink-0">
            {rightElement}
          </div>
        )}
        {!isOpen && label && (
          <div className="absolute left-full ml-4 hidden group-hover:block z-50 px-3 py-1.5 rounded-lg bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 text-xs font-medium whitespace-nowrap shadow-xl">
            {label}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
          </div>
        )}
      </button>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 border-t border-sidebar-border bg-sidebar-accent/30 backdrop-blur-md",
          isOpen ? "p-4" : "p-3 flex justify-center",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

