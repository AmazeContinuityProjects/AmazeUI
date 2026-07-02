"use client";
import { View, TextInput } from "../../lib/primitives";
import * as React from "react"
import { type TextInputProps } from "react-native"
import { cn } from "../../lib/utils"

export interface TextareaProps extends Omit<TextInputProps, 'multiline'> {
  className?: string;
}

const Textarea = React.forwardRef<React.ElementRef<typeof TextInput>, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <View className="relative w-full">
        <TextInput
          ref={ref}
          multiline
          placeholderTextColor="#a3a3a3"
          {...({ className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className) } as any)}
          {...props}
        />
      </View>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
