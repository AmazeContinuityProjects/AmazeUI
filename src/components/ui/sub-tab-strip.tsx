"use client";
import { motion } from "framer-motion";

export interface SubTabStripTab {
  id: string;
  label: string;
}

export interface SubTabStripProps {
  tabs: SubTabStripTab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function SubTabStrip({
  tabs,
  activeTab,
  onChange,
}: SubTabStripProps) {
  return (
    <div className="w-full overflow-x-auto mb-5" style={{ scrollbarWidth: "none" }}>
      <div className="flex gap-1 bg-gray-100/80 dark:bg-black/60 backdrop-blur-xl rounded-full p-1.5 border border-gray-200/60 dark:border-gray-800/60 shadow-inner min-w-max w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative px-5 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-colors duration-300 ${
                isActive
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/40"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="subtab-active-indicator"
                  className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-200/50 dark:border-gray-700/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
