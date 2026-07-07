"use client";

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
      <div className="flex gap-1.5 bg-gray-50/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-1.5 border border-gray-200/50 dark:border-gray-800/50 shadow-sm min-w-max w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-white dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-200/60 dark:border-gray-700/60 scale-100"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/40 border border-transparent scale-[0.98]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
