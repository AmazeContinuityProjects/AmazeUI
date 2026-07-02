import * as React from "react";
import { Platform, View as RNView, Text as RNText, Pressable as RNPressable, TextInput as RNTextInput } from "react-native";
import type { ViewProps, TextProps, PressableProps, TextInputProps } from "react-native";

export const View = React.forwardRef<any, ViewProps & { className?: string }>(({ className, style, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "div" as any;
    return <C ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', minWidth: 0, minHeight: 0, ...(style as any) }} {...props as any} />;
  }
  return <RNView ref={ref} className={className} style={style} {...props} />;
});
View.displayName = "View";

export const Text = React.forwardRef<any, TextProps & { className?: string }>(({ className, style, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "span" as any;
    return <C ref={ref} className={className} style={{ display: 'inline', margin: 0, padding: 0, ...(style as any) }} {...props as any} />;
  }
  return <RNText ref={ref} className={className} style={style} {...props} />;
});
Text.displayName = "Text";

export const Pressable = React.forwardRef<any, PressableProps & { className?: string, onClick?: any }>(({ className, style, onPress, onClick, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "button" as any;
    return <C ref={ref} type="button" onClick={onPress || onClick} className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', background: 'transparent', border: 'none', padding: 0, margin: 0, cursor: 'pointer', outline: 'none', ...(style as any) }} {...props as any} />;
  }
  return <RNPressable ref={ref} onPress={onPress || onClick} className={className} style={style} {...props} />;
});
Pressable.displayName = "Pressable";

export const TextInput = React.forwardRef<any, TextInputProps & { className?: string, onChange?: any }>(({ className, style, onChangeText, onChange, value, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "input" as any;
    return <C ref={ref} value={value} onChange={(e: any) => { onChangeText?.(e.target.value); onChange?.(e); }} className={className} style={{ ...(style as any) }} {...props as any} />;
  }
  return <RNTextInput ref={ref} value={value} onChangeText={onChangeText} onChange={onChange} className={className} style={style} {...props} />;
});
TextInput.displayName = "TextInput";
