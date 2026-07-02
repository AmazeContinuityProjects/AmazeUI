"use client";
import { TextInput } from "../../lib/primitives";
import * as React from "react"
import {  type TextInputProps } from "react-native"
import { cn } from "../../lib/utils"

export interface InputProps extends TextInputProps {
  className?: string;
  name?: string;
  type?: string;
  required?: boolean;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        placeholderTextColor="#a3a3a3" // gray-400 equivalent for default placeholder
        {...({ className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm text-foreground", className) } as any)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

