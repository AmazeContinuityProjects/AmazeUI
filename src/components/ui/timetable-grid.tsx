import React from 'react';
import { cn } from '../../lib/utils';

export type SlotMap = Record<string, string>;

export interface TimetablePeriod {
  start?: string;
  end?: string;
  lunch?: boolean;
  days?: SlotMap;
}

export interface AddedCourse {
  id: string;
  code: string;
  title: string;
  slots: string[];
  faculty: string;
  venue: string;
  credits: string;
  type: string;
  color: string;
  batch?: string;
}

export interface GapDetail {
  day: string;
  startMin: number;
  endMin: number;
  durationMins: number;
  fromClass?: string;
  toClass?: string;
  fromTime?: string;
  toTime?: string;
}

const DEFAULT_DAYS = [
  { id: 'mon', name: 'Monday' },
  { id: 'tue', name: 'Tuesday' },
  { id: 'wed', name: 'Wednesday' },
  { id: 'thu', name: 'Thursday' },
  { id: 'fri', name: 'Friday' },
];

export interface TimetableGridProps {
  courses: AddedCourse[];
  theoryPeriods: TimetablePeriod[];
  labPeriods: TimetablePeriod[];
  days?: { id: string; name: string }[];
  blockedSlots?: Set<string>;
  onToggleBlockSlot?: (slot: string) => void;
  selectedGapDetails?: GapDetail[] | null;
  title?: string;
  showLegend?: boolean;
  className?: string;
}

export function TimetableGrid({
  courses,
  theoryPeriods,
  labPeriods,
  days = DEFAULT_DAYS,
  blockedSlots,
  onToggleBlockSlot,
  selectedGapDetails,
  title = 'Unified Schedule',
  showLegend = true,
  className,
}: TimetableGridProps) {
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCourse = (slotName: string) => courses.find(c => c.slots.includes(slotName));

  return (
    <div className={cn('mb-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-950', className)}>
      <div className="p-4 bg-gray-100/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          {title}
        </h3>
        {showLegend && (
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm" />
              Theory (Top)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm border-dashed" />
              Lab (Bottom)
            </div>
          </div>
        )}
      </div>
      <div className="min-w-max">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-gray-900">
              <th className="p-3 border-b border-r border-gray-200 dark:border-gray-800 font-semibold text-gray-500 dark:text-gray-400 w-24 text-center sticky left-0 z-20 bg-white dark:bg-gray-900">
                Day
              </th>
              {theoryPeriods.map((period, idx) => (
                <th key={idx} className="p-2 border-b border-r border-gray-200 dark:border-gray-800 text-xs text-center text-gray-500 dark:text-gray-400 font-medium">
                  <div className="flex flex-col">
                    <span>{period.start}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">to</span>
                    <span>{period.end}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/5 dark:hover:bg-gray-800/5 transition-colors">
                <td className="p-3 border-r border-gray-200 dark:border-gray-800 font-semibold text-gray-600 dark:text-gray-300 text-center bg-white/95 dark:bg-gray-950/95 sticky left-0 z-20">
                  {day.name.substring(0, 3).toUpperCase()}
                </td>
                {theoryPeriods.map((period, pIdx) => {
                  const theorySlotName = period.days?.[day.id];
                  const labSlotName = labPeriods[pIdx]?.days?.[day.id];

                  if (!theorySlotName && !labSlotName) {
                    return (
                      <td key={pIdx} className="border-r border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 h-[76px] min-h-[76px]" />
                    );
                  }

                  const tCourse = theorySlotName ? getCourse(theorySlotName) : undefined;
                  const lCourse = labSlotName ? getCourse(labSlotName) : undefined;

                  const isTBlocked = blockedSlots && theorySlotName ? blockedSlots.has(theorySlotName) : false;
                  const isLBlocked = blockedSlots && labSlotName ? blockedSlots.has(labSlotName) : false;

                  const timeStart = period.start || '';

                  return (
                    <td key={pIdx} className="border-r border-gray-200 dark:border-gray-800 text-center relative group min-w-[80px] align-top hover:z-50 h-[76px] min-h-[76px]">
                      <div className="w-full h-full flex flex-col items-stretch">
                        {theorySlotName ? (
                          <div
                            onClick={() => onToggleBlockSlot?.(theorySlotName)}
                            className={cn(
                              'h-[38px] p-1 border-b border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center transition-all duration-300 relative',
                              onToggleBlockSlot && 'cursor-pointer',
                              isTBlocked
                                ? 'bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(239,68,68,0.3)_2px,rgba(239,68,68,0.3)_4px)] bg-red-950/40 border-red-500/30 text-red-200 shadow-inner'
                                : tCourse
                                  ? cn(tCourse.color, 'shadow-lg text-gray-900 dark:text-gray-100 z-10')
                                  : (selectedGapDetails?.some(g => g.day === day.id && timeToMinutes(timeStart) >= g.startMin && timeToMinutes(timeStart) < g.endMin)
                                    ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-600 dark:text-yellow-200 animate-pulse'
                                    : 'bg-gray-100/20 dark:bg-gray-900/20 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-100/30 dark:hover:bg-gray-900/30')
                            )}
                          >
                            <span className={cn('text-[11px] font-bold', (tCourse || isTBlocked) ? 'opacity-100' : 'opacity-60')}>
                              {isTBlocked ? 'Blocked' : theorySlotName}
                            </span>
                            {!isTBlocked && tCourse && (
                              <span className="text-[9px] font-medium leading-tight px-1 text-center truncate w-full">{tCourse.code}</span>
                            )}

                            {!isTBlocked && tCourse && (
                              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-1 w-max max-w-[200px] bg-gray-900 dark:bg-gray-950 text-gray-100 text-xs rounded-lg py-1.5 px-3 shadow-xl z-50 pointer-events-none border border-gray-700 text-center">
                                <p className="font-bold">{tCourse.title}</p>
                                <p className="text-gray-300 mt-0.5">{tCourse.faculty}</p>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-950 rotate-45 border-r border-b border-gray-700" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-[38px] border-b border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900/50" />
                        )}

                        {labSlotName ? (
                          <div
                            onClick={() => onToggleBlockSlot?.(labSlotName)}
                            className={cn(
                              'h-[38px] p-1 flex flex-col items-center justify-center transition-all duration-300 relative',
                              onToggleBlockSlot && 'cursor-pointer',
                              isLBlocked
                                ? 'bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(239,68,68,0.3)_2px,rgba(239,68,68,0.3)_4px)] bg-red-950/40 text-red-200 shadow-inner'
                                : lCourse
                                  ? cn(lCourse.color, 'shadow-lg text-gray-900 dark:text-gray-100 z-10')
                                  : (selectedGapDetails?.some(g => g.day === day.id && timeToMinutes(timeStart) >= g.startMin && timeToMinutes(timeStart) < g.endMin)
                                    ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-600 dark:text-yellow-200 animate-pulse'
                                    : 'bg-gray-100/50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-500 hover:bg-gray-100/60 dark:hover:bg-gray-900/60')
                            )}
                          >
                            <span className={cn('text-[11px] font-bold', (lCourse || isLBlocked) ? 'opacity-100' : 'opacity-60')}>
                              {isLBlocked ? 'Blocked' : labSlotName}
                            </span>
                            {!isLBlocked && lCourse && (
                              <span className="text-[9px] font-medium leading-tight px-1 text-center truncate w-full">{lCourse.code}</span>
                            )}

                            {!isLBlocked && lCourse && (
                              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-[200px] bg-gray-900 dark:bg-gray-950 text-gray-100 text-xs rounded-lg py-1.5 px-3 shadow-xl z-50 pointer-events-none border border-gray-700 text-center">
                                <p className="font-bold">{lCourse.title}</p>
                                <p className="text-gray-300 mt-0.5">{lCourse.faculty}</p>
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-950 rotate-45 border-t border-l border-gray-700" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-[38px] bg-gray-100/50 dark:bg-gray-900/50" />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
