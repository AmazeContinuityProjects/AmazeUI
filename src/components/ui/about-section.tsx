"use client";
import { cn } from "../../lib/utils";

export interface AboutSectionProps {
  wordmarkLightSrc?: string;
  wordmarkDarkSrc?: string;
  tagline?: string;
  className?: string;
  version?: string;
  buildNumber?: string;
  lastUpdated?: string;
  platform?: string;
  credits?: string;
}

export function AboutSection({
  wordmarkLightSrc,
  wordmarkDarkSrc,
  tagline,
  className,
  version,
  buildNumber,
  lastUpdated,
  platform,
  credits = "MADE WITH ❤️ BY AMAZE CONTINUITY PROJECTS",
}: AboutSectionProps) {
  const showWordmark = wordmarkLightSrc || wordmarkDarkSrc;
  const hasInfoGrid = version || buildNumber || lastUpdated || platform;

  return (
    <div
      className={cn(
        "bg-transparent sm:bg-white/50 dark:sm:bg-slate-900/50 sm:rounded-2xl sm:border sm:border-gray-200/80 dark:sm:border-gray-800 p-6 flex flex-col items-center text-center space-y-4",
        className
      )}
    >
      {(showWordmark || tagline) && (
        <div className="space-y-3.5 pt-1.5">
          {wordmarkLightSrc && (
            <img
              src={wordmarkLightSrc}
              alt=""
              className="h-6 object-contain mx-auto block dark:hidden"
            />
          )}
          {wordmarkDarkSrc && (
            <img
              src={wordmarkDarkSrc}
              alt=""
              className="h-6 object-contain mx-auto hidden dark:block"
            />
          )}
          {tagline && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{tagline}</p>
          )}
        </div>
      )}

      {hasInfoGrid && (
        <div className="w-full max-w-xs grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-left pt-2 border-t border-gray-150 dark:border-gray-800/60 mt-2">
          {version && (
            <div>
              <span className="text-gray-400 font-medium block">Version</span>
              <span className="font-bold text-gray-850 dark:text-gray-200">{version}</span>
            </div>
          )}
          {buildNumber && (
            <div>
              <span className="text-gray-400 font-medium block">Build Number</span>
              <span className="font-bold text-gray-850 dark:text-gray-200">{buildNumber}</span>
            </div>
          )}
          {lastUpdated && (
            <div>
              <span className="text-gray-400 font-medium block">Last Updated</span>
              <span className="font-bold text-gray-850 dark:text-gray-200">{lastUpdated}</span>
            </div>
          )}
          {platform && (
            <div>
              <span className="text-gray-400 font-medium block">Platform</span>
              <span className="font-bold text-gray-850 dark:text-gray-200">{platform}</span>
            </div>
          )}
        </div>
      )}

      {credits && (
        <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase pt-2 border-t border-gray-150 dark:border-gray-850/60 w-full">
          {credits}
        </p>
      )}
    </div>
  );
}
