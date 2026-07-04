"use client";
import { cn } from "../../lib/utils";

export interface LoadingScreenProps {
  logoSrc?: string;
  wordmarkLightSrc?: string;
  wordmarkDarkSrc?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  progress?: number;
}

export function LoadingScreen({
  logoSrc = "/logo.png",
  wordmarkLightSrc,
  wordmarkDarkSrc,
  title,
  subtitle = "Loading",
  className,
  progress,
}: LoadingScreenProps) {
  const showWordmark = wordmarkLightSrc || wordmarkDarkSrc;
  const showText = title;

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#03060F] transition-colors relative overflow-hidden",
        className
      )}
    >
      <style>{`
        @keyframes loaderBar {
          0% { left: -35%; }
          100% { left: 100%; }
        }
        .animate-loaderBar {
          animation: loaderBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col items-center space-y-6 max-w-xs text-center z-10">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 shadow-2xl animate-pulse">
          <img
            src={logoSrc}
            alt={title || "Logo"}
            className="w-14 h-14 object-contain"
          />
          <div className="absolute -inset-1.5 rounded-[28px] border border-blue-500/20 animate-ping duration-3000 pointer-events-none" />
        </div>

        <div className="space-y-3 pt-2.5">
          {showWordmark && (
            <>
              {wordmarkLightSrc && (
                <img
                  src={wordmarkLightSrc}
                  alt={title || ""}
                  className="h-6 object-contain mx-auto block dark:hidden"
                />
              )}
              {wordmarkDarkSrc && (
                <img
                  src={wordmarkDarkSrc}
                  alt={title || ""}
                  className="h-6 object-contain mx-auto hidden dark:block"
                />
              )}
            </>
          )}
          {showText && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">
              {title}
            </p>
          )}
          {!showWordmark && !showText && subtitle && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-40 h-1 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden relative shadow-inner">
          {progress !== undefined ? (
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          ) : (
            <div className="absolute top-0 bottom-0 left-0 w-[35%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-loaderBar" />
          )}
        </div>
      </div>
    </div>
  );
}
