"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  showClose?: boolean;
  noPadding?: boolean;
}

export function Modal({
  isOpen = true,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  className,
  showClose = true,
  noPadding = false,
}: ModalProps) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/70" />
      <div
        className={cn(
          "relative w-full", maxWidth,
          "bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-3xl",
          "dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
        {title && (
          <div className="px-6 pt-5 pb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          </div>
        )}
        <div className={cn(noPadding ? "" : "p-6", !title && !noPadding && "pt-6")}>{children}</div>
      </div>
    </div>
  );
}
