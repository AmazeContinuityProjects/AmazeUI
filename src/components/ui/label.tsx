import { Text } from "../../lib/primitives";
import * as React from "react"
import {  type TextProps } from "react-native"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const labelVariants = cva(
  "text-sm font-medium leading-none text-foreground peer-disabled:opacity-70",
  {
    variants: {},
    defaultVariants: {}}
)

export interface LabelProps extends TextProps, VariantProps<typeof labelVariants> {
  className?: string;
}

const Label = React.forwardRef<React.ElementRef<typeof Text>, LabelProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      {...({ className: cn(labelVariants(), className) } as any)}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }
