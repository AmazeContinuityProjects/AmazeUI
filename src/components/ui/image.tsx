"use client";
import * as React from "react"
import { cn } from "../../lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = "", ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn("object-contain", className)}
      {...props}
    />
  )
)
Image.displayName = "Image"

export { Image }
