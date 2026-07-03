"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { View } from "../../lib/primitives";

export interface AppLibraryProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  children?: React.ReactNode;
  headerRight?: React.ReactNode;
  className?: string;
}

export function AppLibrary({
  open,
  onClose,
  title,
  subtitle,
  showBack,
  onBack,
  searchQuery,
  onSearchChange,
  children,
  headerRight,
  className,
}: AppLibraryProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-xs md:hidden"
            style={{ willChange: "opacity" }}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.8 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-[60] flex max-h-[86vh] flex-col overflow-hidden bg-gray-50/98 backdrop-blur-xl md:hidden dark:bg-black/98 rounded-t-[2rem] border-t border-gray-200/50 dark:border-neutral-900/60 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.3)]",
              className,
            )}
            style={{ willChange: "transform", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex w-full shrink-0 justify-center pt-3 pb-1">
              <div className="h-1 w-12 rounded-full bg-gray-300 dark:bg-neutral-800" />
            </div>

            <div className="shrink-0 border-b border-gray-200/50 px-5 pb-4 pt-5 dark:border-gray-800/50">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {showBack && (
                      <button
                        onClick={onBack}
                        className="-ml-1 flex items-center gap-1 rounded-lg p-1 text-xs font-bold text-info hover:bg-gray-200 dark:hover:bg-slate-800"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                      </button>
                    )}
                    <h2 className="truncate text-xl font-black tracking-tight text-gray-900 dark:text-white">
                      {title}
                    </h2>
                  </div>
                  {subtitle && (
                    <p className="mt-0.5 text-xs font-semibold text-gray-500">
                      {subtitle}
                    </p>
                  )}
                </div>
                {headerRight}
                <button
                  onClick={onClose}
                  className="shrink-0 rounded-full border border-gray-200/30 bg-gray-100 p-2.5 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {onSearchChange && (
              <div className="shrink-0 border-b border-gray-200/20 px-5 py-3 dark:border-gray-800/20">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200/50 bg-white px-3 py-2.5 dark:border-gray-800/80 dark:bg-gray-900">
                  <svg className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery || ""}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange("")}
                      className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-4 pb-36">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
