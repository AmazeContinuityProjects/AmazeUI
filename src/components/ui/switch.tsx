import * as React from "react"
import { Switch as NativeSwitch, type SwitchProps as NativeSwitchProps } from "react-native"

export interface SwitchProps extends NativeSwitchProps {
  className?: string; // Kept for interface compatibility, though Native Switch styling is limited via className
}

const Switch = React.forwardRef<React.ElementRef<typeof NativeSwitch>, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <NativeSwitch
        ref={ref}
        {...props}
      />
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
