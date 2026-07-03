"use client";
import * as React from "react"
import { Switch as NativeSwitch, type SwitchProps as NativeSwitchProps } from "react-native-web"

export interface SwitchProps extends NativeSwitchProps {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  onChange?: (event: any) => void;
  className?: string; // Kept for interface compatibility, though Native Switch styling is limited via className
}

const Switch = React.forwardRef<React.ElementRef<typeof NativeSwitch>, SwitchProps>(
  ({ className, onCheckedChange, onChange, onValueChange, checked, value, ...props }, ref) => {
    return (
      <NativeSwitch value={checked !== undefined ? checked : value} onValueChange={(val) => { onValueChange?.(val); onCheckedChange?.(val); onChange?.(val); }}
        ref={ref}
        {...props}
      />
    )
  }
)
Switch.displayName = "Switch"

export { Switch }

