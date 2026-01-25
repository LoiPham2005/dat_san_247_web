'use client';

interface ChartData {
    date: string;
    value: number;
}

interface BarChartVizProps {
    data?: ChartData[];
}

export const BarChartViz = ({ data }: BarChartVizProps) => {
    // Default data if not provided
    const chartData = data || [
        { date: 'Mon', value: 40 },
        { date: 'Tue', value: 60 },
        { date: 'Wed', value: 45 },
        { date: 'Thu', value: 90 },
        { date: 'Fri', value: 75 },
        { date: 'Sat', value: 100 },
        { date: 'Sun', value: 85 },
    ];

    const max = Math.max(...chartData.map(d => d.value));
    const needsScroll = chartData.length > 14;

    return (
        <div className={`h-full w-full relative ${needsScroll ? 'overflow-x-auto custom-scrollbar' : ''}`}>
            <div className={`h-full flex flex-col ${needsScroll ? 'min-w-max' : 'w-full'}`} style={needsScroll ? { width: `${chartData.length * 50}px`, minWidth: '100%' } : {}}>
                <div className="flex-1 flex items-end justify-between gap-2 relative pt-10">
                    {/* Grid lines */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between opacity-30 py-10">
                        <div className="border-t border-gray-200 dark:border-gray-700 w-full" />
                        <div className="border-t border-gray-200 dark:border-gray-700 w-full" />
                        <div className="border-t border-gray-200 dark:border-gray-700 w-full" />
                    </div>

                    {chartData.map((item, i) => {
                        const heightPercent = (item.value / max) * 100;
                        return (
                            <div
                                key={i}
                                className="group relative flex flex-col items-center justify-end h-full z-10"
                                style={{ flex: needsScroll ? '0 0 40px' : '1' }}
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-xl pointer-events-none whitespace-nowrap z-20 dark:bg-gray-100 dark:text-gray-900 font-bold">
                                    ${item.value}k Revenue
                                </div>

                                {/* Bar */}
                                <div
                                    style={{ height: `${heightPercent}%` }}
                                    className="w-full max-w-[40px] bg-gradient-to-t from-primary-500/20 to-primary-500 rounded-t-lg transition-all duration-500 group-hover:from-primary-500/40 group-hover:to-primary-600 shadow-sm"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Labels */}
                <div className="flex justify-between pt-4 pb-2 flex-shrink-0">
                    {chartData.map((item, i) => (
                        <span
                            key={i}
                            className="text-xs font-medium text-gray-400 dark:text-gray-500 text-center"
                            style={{ flex: needsScroll ? '0 0 40px' : '1' }}
                        >
                            {item.date}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scroll hint */}
            {needsScroll && (
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-1 text-[10px] text-gray-400 bg-gradient-to-t from-white dark:from-gray-900">
                    ← Cuộn ngang để xem thêm →
                </div>
            )}
        </div>
    );
};
