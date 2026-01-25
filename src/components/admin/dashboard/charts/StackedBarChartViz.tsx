'use client';

import { useMemo } from 'react';
import { DateRange } from '../DateRangeSelector';

interface StackedBarChartVizProps {
    dateRange?: DateRange;
}

// Generate stacked data based on date range
const generateStackedData = (range: DateRange = 'week') => {
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
        data.push({
            day: date.toLocaleDateString('vi-VN', { day: '2-digit', month: days > 30 ? '2-digit' : 'short' }),
            soccer: Math.floor(Math.random() * 50) + 20,
            tennis: Math.floor(Math.random() * 30) + 10,
            badminton: Math.floor(Math.random() * 20) + 5,
        });
    }
    return data;
};

export const StackedBarChartViz = ({ dateRange = 'week' }: StackedBarChartVizProps) => {
    const data = useMemo(() => generateStackedData(dateRange), [dateRange]);
    const maxTotal = Math.max(...data.map(d => d.soccer + d.tennis + d.badminton));
    const needsScroll = data.length > 14;

    return (
        <div className={`h-full w-full relative ${needsScroll ? 'overflow-x-auto custom-scrollbar' : ''}`}>
            <div className={`h-full flex flex-col ${needsScroll ? 'min-w-max' : 'w-full'}`} style={needsScroll ? { width: `${data.length * 50}px`, minWidth: '100%' } : {}}>
                {/* Legend */}
                <div className="flex items-center justify-end gap-4 mb-4 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-sm bg-primary-500" />
                        <span className="text-xs text-gray-500">Soccer</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-sm bg-blue-500" />
                        <span className="text-xs text-gray-500">Tennis</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-sm bg-yellow-500" />
                        <span className="text-xs text-gray-500">Badminton</span>
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
                        const total = item.soccer + item.tennis + item.badminton;
                        const heightPercent = (total / maxTotal) * 100;

                        return (
                            <div
                                key={i}
                                className="group flex flex-col items-center justify-end h-full z-10"
                                style={{ flex: needsScroll ? '0 0 40px' : '1' }}
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-[10px] px-3 py-2 rounded-lg shadow-xl pointer-events-none z-20 dark:bg-gray-100 dark:text-gray-900">
                                    <div className="font-bold mb-1">{item.day}</div>
                                    <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary-500" /> Soccer: ${item.soccer}k</div>
                                    <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Tennis: ${item.tennis}k</div>
                                    <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-500" /> Badminton: ${item.badminton}k</div>
                                </div>

                                {/* Stacked bars */}
                                <div
                                    className="w-full max-w-[35px] flex flex-col-reverse rounded-t-lg overflow-hidden transition-all duration-500 group-hover:scale-105"
                                    style={{ height: `${heightPercent}%` }}
                                >
                                    <div className="bg-primary-500" style={{ height: `${(item.soccer / total) * 100}%` }} />
                                    <div className="bg-blue-500" style={{ height: `${(item.tennis / total) * 100}%` }} />
                                    <div className="bg-yellow-500" style={{ height: `${(item.badminton / total) * 100}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Labels */}
                <div className="flex justify-between pt-4 pb-2 flex-shrink-0">
                    {data.map((item, i) => (
                        <span
                            key={i}
                            className="text-xs font-medium text-gray-400 dark:text-gray-500 text-center"
                            style={{ flex: needsScroll ? '0 0 40px' : '1' }}
                        >
                            {item.day}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
