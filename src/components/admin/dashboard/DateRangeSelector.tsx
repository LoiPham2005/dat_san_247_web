'use client';

import { useState } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

export type DateRange = 'today' | 'week' | 'month' | '3months' | 'year' | 'custom';

interface DateRangeSelectorProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
}

const dateRanges = [
    { id: 'today' as DateRange, label: 'Hôm nay', days: 1 },
    { id: 'week' as DateRange, label: '7 ngày qua', days: 7 },
    { id: 'month' as DateRange, label: '30 ngày qua', days: 30 },
    { id: '3months' as DateRange, label: '3 tháng qua', days: 90 },
    { id: 'year' as DateRange, label: '1 năm qua', days: 365 },
];

export const DateRangeSelector = ({ value, onChange }: DateRangeSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedRange = dateRanges.find(r => r.id === value);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm"
            >
                <Calendar className="h-4 w-4 text-primary-500" />
                <span>{selectedRange?.label || 'Chọn thời gian'}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 dark:bg-gray-900 dark:border-gray-800">
                        {dateRanges.map((range) => (
                            <button
                                key={range.id}
                                onClick={() => {
                                    onChange(range.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${value === range.id
                                        ? 'text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <span>{range.label}</span>
                                {value === range.id && (
                                    <Check className="h-4 w-4 text-primary-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// Helper function to generate mock data based on date range
export const generateMockData = (range: DateRange) => {
    const today = new Date();
    const data: { date: string; value: number }[] = [];

    let days = 1;
    switch (range) {
        case 'today': days = 1; break;
        case 'week': days = 7; break;
        case 'month': days = 30; break;
        case '3months': days = 90; break;
        case 'year': days = 365; break;
    }

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Mock random revenue between 20k and 100k
        const value = Math.floor(Math.random() * 80) + 20;

        data.push({
            date: date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: days > 30 ? '2-digit' : 'short',
                year: days > 90 ? '2-digit' : undefined
            }),
            value
        });
    }

    return data;
};
