'use client';

interface ChartData {
    date: string;
    value: number;
}

interface LineChartVizProps {
    data?: ChartData[];
}

export const LineChartViz = ({ data }: LineChartVizProps) => {
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

    // Generate SVG path
    const points = chartData.map((item, i) => {
        const x = (i / (chartData.length - 1)) * 100;
        const y = 100 - (item.value / max) * 80;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className={`h-full w-full relative ${needsScroll ? 'overflow-x-auto custom-scrollbar' : ''}`}>
            <div className={`h-full flex flex-col ${needsScroll ? 'min-w-max' : 'w-full'}`} style={needsScroll ? { width: `${chartData.length * 50}px`, minWidth: '100%' } : {}}>
                <div className="flex-1 relative">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />

                        {/* Line */}
                        <polyline
                            points={points}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-primary-500 drop-shadow-lg"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {chartData.map((item, i) => {
                            const x = (i / (chartData.length - 1)) * 100;
                            const y = 100 - (item.value / max) * 80;
                            return (
                                <g key={i}>
                                    <circle cx={x} cy={y} r="1" fill="currentColor" className="text-primary-600" />
                                    <circle cx={x} cy={y} r="0.5" fill="white" className="opacity-60" />
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Labels */}
                <div className="flex justify-between px-4 pt-4 pb-2">
                    {chartData.map((item, i) => (
                        <span key={i} className="text-xs font-medium text-gray-400 dark:text-gray-500" style={{ flex: needsScroll ? '0 0 40px' : '1', textAlign: 'center' }}>
                            {item.date}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
