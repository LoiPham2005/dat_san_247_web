'use client';

interface ChartData {
    date: string;
    value: number;
}

interface SmoothLineChartVizProps {
    data?: ChartData[];
}

export const SmoothLineChartViz = ({ data }: SmoothLineChartVizProps) => {
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

    // Generate smooth curve using quadratic bezier
    const generateSmoothPath = () => {
        const points = chartData.map((item, i) => ({
            x: (i / (chartData.length - 1)) * 100,
            y: 100 - (item.value / max) * 80
        }));

        let path = `M ${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const midX = (current.x + next.x) / 2;

            path += ` Q ${current.x},${current.y} ${midX},${(current.y + next.y) / 2}`;
            path += ` T ${next.x},${next.y}`;
        }

        return path;
    };

    return (
        <div className={`h-full w-full relative ${needsScroll ? 'overflow-x-auto custom-scrollbar' : ''}`}>
            <div className={`h-full flex flex-col ${needsScroll ? 'min-w-max' : 'w-full'}`} style={needsScroll ? { width: `${chartData.length * 50}px`, minWidth: '100%' } : {}}>
                <div className="flex-1 relative">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                        <defs>
                            <linearGradient id="smoothGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className="text-primary-500" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary-500" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.1" className="text-gray-200 dark:text-gray-800" />

                        {/* Gradient area under curve */}
                        <path
                            d={`${generateSmoothPath()} L 100,100 L 0,100 Z`}
                            fill="url(#smoothGradient)"
                        />

                        {/* Smooth curve line */}
                        <path
                            d={generateSmoothPath()}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.6"
                            className="text-primary-600"
                            filter="url(#glow)"
                            strokeLinecap="round"
                        />

                        {/* Data points with animation */}
                        {chartData.map((item, i) => {
                            const x = (i / (chartData.length - 1)) * 100;
                            const y = 100 - (item.value / max) * 80;
                            return (
                                <g key={i}>
                                    <circle cx={x} cy={y} r="1.5" fill="currentColor" className="text-primary-500 opacity-50">
                                        <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                                    </circle>
                                    <circle cx={x} cy={y} r="0.8" fill="white" />
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
