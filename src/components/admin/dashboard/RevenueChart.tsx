'use client';

import { useState, useMemo } from 'react';
import { BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, TrendingUp, Layers, GitCompare } from 'lucide-react';
import { DateRangeSelector, DateRange, generateMockData } from './DateRangeSelector';
import { BarChartViz } from './charts/BarChartViz';
import { LineChartViz } from './charts/LineChartViz';
import { AreaChartViz } from './charts/AreaChartViz';
import { SmoothLineChartViz } from './charts/SmoothLineChartViz';
import { StackedBarChartViz } from './charts/StackedBarChartViz';
import { ComparisonChartViz } from './charts/ComparisonChartViz';

type ChartType = 'bar' | 'line' | 'area' | 'smooth' | 'stacked' | 'comparison';

const chartTypes = [
    { id: 'bar' as ChartType, name: 'Bar', icon: BarChart3, description: 'So sánh giá trị theo ngày' },
    { id: 'line' as ChartType, name: 'Line', icon: LineChartIcon, description: 'Theo dõi xu hướng' },
    { id: 'area' as ChartType, name: 'Area', icon: AreaChartIcon, description: 'Trực quan hóa tích lũy' },
    { id: 'smooth' as ChartType, name: 'Smooth', icon: TrendingUp, description: 'Phân tích mượt mà' },
    { id: 'stacked' as ChartType, name: 'Stacked', icon: Layers, description: 'So sánh nhiều nguồn' },
    { id: 'comparison' as ChartType, name: 'Compare', icon: GitCompare, description: 'So sánh tuần này/trước' },
];

export const RevenueChart = () => {
    const [selectedChart, setSelectedChart] = useState<ChartType>('bar');
    const [dateRange, setDateRange] = useState<DateRange>('today');

    // Generate mock data based on selected date range
    const chartData = useMemo(() => generateMockData(dateRange), [dateRange]);

    const renderChart = () => {
        switch (selectedChart) {
            case 'bar':
                return <BarChartViz data={chartData} />;
            case 'line':
                return <LineChartViz data={chartData} />;
            case 'area':
                return <AreaChartViz data={chartData} />;
            case 'smooth':
                return <SmoothLineChartViz data={chartData} />;
            case 'stacked':
                return <StackedBarChartViz dateRange={dateRange} />;
            case 'comparison':
                return <ComparisonChartViz dateRange={dateRange} />;
            default:
                return <BarChartViz data={chartData} />;
        }
    };

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {/* Header with Chart Type Selector and Date Range */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                {/* Chart Type Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                    {chartTypes.map((type) => {
                        const Icon = type.icon;
                        const isActive = selectedChart === type.id;
                        return (
                            <button
                                key={type.id}
                                onClick={() => setSelectedChart(type.id)}
                                className={`
                                    group relative flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-xs
                                    transition-all duration-300 hover:scale-105
                                    ${isActive
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-800'
                                    }
                                `}
                            >
                                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                <span className="hidden md:inline">{type.name}</span>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap dark:bg-gray-100 dark:text-gray-900 z-50">
                                    {type.description}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Date Range Selector */}
                <DateRangeSelector value={dateRange} onChange={setDateRange} />
            </div>

            {/* Chart Container */}
            <div className="flex-1 min-h-0 relative">
                {renderChart()}
            </div>
        </div>
    );
};
