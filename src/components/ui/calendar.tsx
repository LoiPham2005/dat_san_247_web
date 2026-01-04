'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/format';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday
} from 'date-fns';

export type CalendarProps = {
    mode?: 'single' | 'range' | 'multiple';
    selected?: Date | Date[];
    onSelect?: (date: Date | undefined) => void;
    className?: string;
    classNames?: any;
    showOutsideDays?: boolean;
}

export function Calendar({ className, classNames, showOutsideDays = true, mode = "single", selected, onSelect, ...props }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    // Helper to handle date selection
    const handleDateClick = (day: Date) => {
        if (onSelect) {
            onSelect(day);
        }
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between pb-4">
                <span className="text-sm font-semibold">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={prevMonth} className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextMonth} className="h-7 w-7">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "eeee";
        const days = [];
        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="text-[0.8rem] font-medium text-gray-500 text-center" key={i}>
                    {format(startDate, 'EEEEEE')}
                </div> // "Mo", "Tu", etc
            );
            startDate = new Date(startDate.setDate(startDate.getDate() + 1)); // safe mutate for loop
        }
        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const days = eachDayOfInterval({
            start: startDate,
            end: endDate
        });

        const rows: React.JSX.Element[] = [];
        let daysInRow: React.JSX.Element[] = [];

        days.forEach((day, i) => {
            const formattedDate = format(day, "d");
            const isSelected = selected && (selected instanceof Date ? isSameDay(day, selected) : false);

            daysInRow.push(
                <div
                    key={day.toString()}
                    className={`text-center p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent`}
                >
                    <button
                        onClick={() => handleDateClick(day)}
                        disabled={!isSameMonth(day, monthStart) && !showOutsideDays}
                        className={cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md flex items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                            !isSameMonth(day, monthStart) && "text-gray-300 dark:text-gray-600",
                            isSameMonth(day, monthStart) && "text-gray-900 dark:text-gray-100",
                            (isSelected) && "bg-primary-600 text-white hover:bg-primary-700 hover:text-white",
                            isToday(day) && !isSelected && "bg-gray-100 text-primary-600 font-bold"
                        )}
                    >
                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                            {formattedDate}
                        </time>
                    </button>
                </div>
            );

            if ((i + 1) % 7 === 0 || i === days.length - 1) {
                rows.push(<div className="grid grid-cols-7 mt-2" key={day.toString()}>{daysInRow}</div>);
                daysInRow = [];
            }
        });

        return <div className="space-y-1">{rows}</div>;
    };

    return (
        <div className={cn("p-3", className)}>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
