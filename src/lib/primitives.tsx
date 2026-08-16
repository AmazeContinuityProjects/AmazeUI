import * as React from "react";
import { Platform, View as RNView, Text as RNText, Pressable as RNPressable, TextInput as RNTextInput } from "react-native-web";

import { cn } from "./utils";

export const View = React.forwardRef<any, any>(({ className, style, onClick, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "div" as any;
    return <C ref={ref} onClick={onClick} className={cn("flex flex-col items-stretch justify-start min-w-0 min-h-0 relative", className)} style={style as any} {...props as any} />;
  }
  return <RNView ref={ref} style={style} className={className} {...(props as any)} />;
});
View.displayName = "View";

export const Text = React.forwardRef<any, any>(({ className, style, onClick, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "span" as any;
    return <C ref={ref} onClick={onClick} className={cn("inline m-0 p-0", className)} style={style as any} {...props as any} />;
  }
  return <RNText ref={ref} style={style} className={className} {...(props as any)} />;
});
Text.displayName = "Text";

export const Pressable = React.forwardRef<any, any>(({ className, style, onPress, onClick, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = "button" as any;
    return <C ref={ref} type="button" onClick={onPress || onClick} className={cn("flex flex-col items-stretch justify-start bg-transparent border-none p-0 m-0 cursor-pointer outline-none relative", className)} style={style as any} {...props as any} />;
  }
  return <RNPressable ref={ref} onPress={onPress || onClick} className={className} style={style} {...props} />;
});
Pressable.displayName = "Pressable";

export const TextInput = React.forwardRef<any, any>(({ className, style, onChangeText, onChange, value, placeholderTextColor, multiline, ...props }, ref) => {
  if (Platform.OS === 'web') {
    const C = multiline ? "textarea" : "input" as any;
    return <C ref={ref} value={value} onChange={(e: any) => { onChangeText?.(e.target.value); onChange?.(e); }} className={cn("w-full", className)} style={{ ...(style as any) }} {...props as any} />;
  }
  return <RNTextInput ref={ref} value={value} onChangeText={onChangeText} onChange={onChange} placeholderTextColor={placeholderTextColor} multiline={multiline} className={className} style={style} {...props} />;
});
TextInput.displayName = "TextInput";
