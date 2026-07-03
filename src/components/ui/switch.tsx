"use client";
import * as React from "react"
import { Switch as NativeSwitch, type SwitchProps as NativeSwitchProps } from "react-native-web"

export interface SwitchProps extends NativeSwitchProps {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  onChange?: (event: any) => void;
  disabled?: boolean;
  className?: string;
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

