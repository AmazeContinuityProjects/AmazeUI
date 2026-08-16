"use client";
import * as React from "react";
import { Platform } from "react-native-web";
import { View, Text, TextInput as PrimitiveTextInput } from "../../lib/primitives";
import { cn } from "../../lib/utils";

export interface InputProps {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

export const Input = React.forwardRef<any, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <View>
        {label && (
          <Text className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
            {label}
          </Text>
        )}
        <PrimitiveTextInput
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-white dark:bg-black",
            "border border-gray-200 dark:border-gray-800",
            "rounded-xl px-4 py-2.5",
            "text-gray-900 dark:text-gray-100",
            "focus:outline-none focus:border-blue-500/50 transition-colors",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>}
      </View>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export const Textarea = React.forwardRef<any, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <View>
        {label && (
          <Text className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
            {label}
          </Text>
        )}
        <PrimitiveTextInput
          ref={ref}
          id={inputId}
          multiline
          className={cn(
            "w-full bg-white dark:bg-black",
            "border border-gray-200 dark:border-gray-800",
            "rounded-xl px-4 py-2",
            "text-sm text-gray-900 dark:text-gray-100",
            "font-mono focus:outline-none focus:border-blue-500/50 transition-colors resize-none",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>}
      </View>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps {
  label?: string;
  className?: string;
  id?: string;
  value?: string;
  onChange?: (e: any) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export const Select = React.forwardRef<any, SelectProps>(
  ({ className, label, options, id, value, onChange, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedLabel = options.find((o) => o.value === value)?.label || "Select...";

    if (Platform.OS === "web") {
      const C = "select" as any;
      return (
        <View>
          {label && (
            <Text className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
              {label}
            </Text>
          )}
          <C
            ref={ref}
            id={inputId}
            value={value}
            onChange={(e: any) => onChange?.(e)}
            className={cn(
              "w-full bg-white dark:bg-black",
              "border border-gray-200 dark:border-gray-800",
              "rounded-xl px-4 py-2.5",
              "text-gray-900 dark:text-gray-100",
              "focus:outline-none focus:border-blue-500/50 transition-colors",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </C>
        </View>
      );
    }

    return (
      <View>
        {label && (
          <Text className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
            {label}
          </Text>
        )}
        <View
          className={cn(
            "w-full bg-white dark:bg-black",
            "border border-gray-200 dark:border-gray-800",
            "rounded-xl px-4 py-2.5",
            "text-gray-900 dark:text-gray-100",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text className="text-sm text-gray-900 dark:text-gray-100">{selectedLabel}</Text>
        </View>
        {isOpen && (
          <View className="mt-1 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            {options.map((opt) => (
              <Text
                key={opt.value}
                className={cn(
                  "px-4 py-3 text-sm",
                  value === opt.value
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-gray-900 dark:text-gray-100"
                )}
                onClick={() => {
                  onChange?.({ target: { value: opt.value } });
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
);
Select.displayName = "Select";
