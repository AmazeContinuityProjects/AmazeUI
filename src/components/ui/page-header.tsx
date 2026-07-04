"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface PageHeaderProps {
  icon?: React.ReactNode;
  title: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ icon, title, meta, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "bg-blue-50/60 border-b border-x border-gray-200 rounded-b-2xl py-4 px-5 sm:py-4.5 sm:px-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 -mx-4 md:-mx-6 mb-6 relative z-10 dark:bg-blue-950/20 dark:border-gray-800",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5 z-10 min-w-0 w-full sm:w-auto">
        <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2.5 min-w-0">
          {icon}
          <span className="truncate">{title}</span>
        </h1>
        {meta}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 z-10 w-full sm:w-auto justify-end sm:justify-start">
          {actions}
        </div>
      )}
    </div>
  );
}
