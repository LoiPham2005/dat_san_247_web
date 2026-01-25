'use client';

import { useMemo } from 'react';
import { DateRange } from '../DateRangeSelector';

interface ComparisonChartVizProps {
    dateRange?: DateRange;
}

// Generate comparison data based on date range
const generateComparisonData = (range: DateRange = 'week') => {
    const today = new Date();
    let days = 7;
    switch (range) {
        case 'today': days = 1; break;
        case 'week': days = 7; break;
        case 'month': days = 30; break;
        case '3months': days = 90; break;
        case 'year': days = 365; break;
    }

    const data = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const current = Math.floor(Math.random() * 80) + 20;
        const previous = Math.floor(Math.random() * 80) + 20;
        data.push({
            day: date.toLocaleDateString('vi-VN', { day: '2-digit', month: days > 30 ? '2-digit' : 'short' }),
            current,
            previous,
        });
    }
    return data;
};

export const ComparisonChartViz = ({ dateRange = 'week' }: ComparisonChartVizProps) => {
    const data = useMemo(() => generateComparisonData(dateRange), [dateRange]);
    const max = Math.max(...data.flatMap(d => [d.current, d.previous]));
    const needsScroll = data.length > 14;

    return (
        <div className={`h-full w-full relative ${needsScroll ? 'overflow-x-auto custom-scrollbar' : ''}`}>
            <div className={`h-full flex flex-col ${needsScroll ? 'min-w-max' : 'w-full'}`} style={needsScroll ? { width: `${data.length * 60}px`, minWidth: '100%' } : {}}>
                {/* Legend */}
                <div className="flex items-center justify-end gap-4 mb-4 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-sm bg-primary-500" />
                        <span className="text-xs text-gray-500">This Period</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-sm bg-gray-300 dark:bg-gray-600" />
                        <span className="text-xs text-gray-500">Previous Period</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="flex-1 flex items-end justify-between gap-3 relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between opacity-30">
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className="border-t border-gray-200 dark:border-gray-700 w-full" />
                        ))}
                    </div>

                    {data.map((item, i) => {
                        const currentHeight = (item.current / max) * 100;
                        const previousHeight = (item.previous / max) * 100;
                        const diff = item.current - item.previous;
                        const diffPercent = ((diff / item.previous) * 100).toFixed(1);

                        return (
                            <div
                                key={i}
                                className="group flex flex-col items-center justify-end h-full z-10"
                                style={{ flex: needsScroll ? '0 0 50px' : '1' }}
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-[10px] px-3 py-2 rounded-lg shadow-xl pointer-events-none z-20 dark:bg-gray-100 dark:text-gray-900">
                                    <div className="font-bold mb-1">{item.day}</div>
                                    <div>This period: ${item.current}k</div>
                                    <div>Previous: ${item.previous}k</div>
                                    <div className={`font-bold ${diff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {diff >= 0 ? '↑' : '↓'} {Math.abs(diff)}k ({diffPercent}%)
                                    </div>
                                </div>

                                {/* Grouped bars */}
                                <div className="w-full max-w-[50px] flex gap-1 items-end justify-center">
                                    <div
                                        className="flex-1 max-w-[18px] bg-gray-300 dark:bg-gray-600 rounded-t-md transition-all duration-500 group-hover:opacity-80"
                                        style={{ height: `${previousHeight}%` }}
                                    />
                                    <div
                                        className="flex-1 max-w-[18px] bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md transition-all duration-500 group-hover:scale-105 shadow-sm"
                                        style={{ height: `${currentHeight}%` }}
                                    />
                                </div>

                                {/* Change indicator */}
                                <div className={`mt-1 text-[9px] font-bold ${diff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {diff >= 0 ? '+' : ''}{diff}k
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Labels */}
                <div className="flex justify-between pt-2 pb-2 flex-shrink-0">
                    {data.map((item, i) => (
                        <span
                            key={i}
                            className="text-xs font-medium text-gray-400 dark:text-gray-500 text-center"
                            style={{ flex: needsScroll ? '0 0 50px' : '1' }}
                        >
                            {item.day}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
