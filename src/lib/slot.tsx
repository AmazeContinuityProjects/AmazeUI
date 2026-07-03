"use client";
import * as React from "react";

function Slot({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...(children.props as any),
      ...props,
    });
  }
  return React.Children.only(children) as any;
}

export { Slot };
