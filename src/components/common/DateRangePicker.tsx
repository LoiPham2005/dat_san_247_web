"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfToday, endOfToday, subDays, isSameDay, isWithinInterval, isAfter, isBefore, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

import { Portal } from './Portal';

interface DateRangePickerProps {
    startDate: Date;
    endDate: Date;
    onChange: (start: Date, end: Date) => void;
    className?: string;
}

export const DateRangePicker = ({ startDate, endDate, onChange, className }: DateRangePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date(startDate));
    const [tempStart, setTempStart] = useState<Date | null>(new Date(startDate));
    const [tempEnd, setTempEnd] = useState<Date | null>(new Date(endDate));

    useEffect(() => {
        setTempStart(startDate);
        setTempEnd(endDate);
    }, [startDate, endDate]);

    const quickRanges = [
        { label: 'Hôm nay', getRange: () => [startOfToday(), endOfToday()] },
        { label: 'Hôm qua', getRange: () => [startOfToday(), endOfToday()].map(d => subDays(d, 1)) },
        { label: '7 ngày qua', getRange: () => [subDays(startOfToday(), 6), endOfToday()] },
        { label: '30 ngày qua', getRange: () => [subDays(startOfToday(), 29), endOfToday()] },
        { label: 'Tháng này', getRange: () => [startOfMonth(new Date()), endOfToday()] },
        {
            label: 'Tháng trước', getRange: () => {
                const prev = subMonths(new Date(), 1);
                return [startOfMonth(prev), endOfMonth(prev)];
            }
        },
    ];

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
    });

    const handleDateClick = (day: Date) => {
        if (!tempStart || (tempStart && tempEnd)) {
            setTempStart(day);
            setTempEnd(null);
        } else if (tempStart && !tempEnd) {
            if (isBefore(day, tempStart)) {
                setTempStart(day);
            } else {
                setTempEnd(day);
            }
        }
    };

    const handleApply = () => {
        if (tempStart && tempEnd) {
            onChange(tempStart, tempEnd);
            setIsOpen(false);
        } else if (tempStart) {
            onChange(tempStart, tempStart);
            setIsOpen(false);
        }
    };

    return (
        <div className={cn("relative", className)}>
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="rounded-xl border-slate-200 font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-2 h-11"
            >
                <CalendarIcon className="w-4 h-4 text-emerald-600" />
                <span>{format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}</span>
            </Button>

            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />

                        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col md:flex-row min-h-[460px]">
                            {/* Sidebar Quick Ranges */}
                            <div className="w-full md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 p-4 space-y-1">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Phím tắt</div>
                                {quickRanges.map(range => (
                                    <button
                                        key={range.label}
                                        onClick={() => {
                                            const [s, e] = range.getRange();
                                            setTempStart(s);
                                            setTempEnd(e);
                                            setViewDate(s);
                                        }}
                                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:shadow-sm hover:text-emerald-600 transition-all font-sans"
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>

                            {/* Calendar Body */}
                            <div className="flex-1 p-6 flex flex-col font-sans">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">
                                        {format(viewDate, 'MMMM yyyy', { locale: vi })}
                                    </h3>
                                    <div className="flex items-center gap-2 mr-16">
                                        <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                                        <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase py-2">{d}</div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1 flex-1">
                                    {days.map((day, idx) => {
                                        const isSelected = (tempStart && isSameDay(day, tempStart)) || (tempEnd && isSameDay(day, tempEnd));
                                        const isInRange = tempStart && tempEnd && isWithinInterval(day, { start: tempStart, end: tempEnd });
                                        const isOutsideMonth = !isSameDay(startOfMonth(day), startOfMonth(viewDate));

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleDateClick(day)}
                                                className={cn(
                                                    "h-10 w-full flex items-center justify-center text-sm font-bold rounded-xl transition-all relative",
                                                    isSelected ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 z-10" :
                                                        isInRange ? "bg-emerald-50 text-emerald-700" :
                                                            isOutsideMonth ? "text-slate-200" : "text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {format(day, 'd')}
                                                {isSelected && !tempEnd && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                                    <div className="hidden sm:block">
                                        {tempStart && (
                                            <div className="text-xs font-bold text-slate-400">
                                                Đã chọn: <span className="text-slate-800">{format(tempStart, 'dd/MM/yyyy')}</span>
                                                {tempEnd && <> - <span className="text-slate-800">{format(tempEnd, 'dd/MM/yyyy')}</span></>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-xl font-bold border-slate-200">
                                            Hủy
                                        </Button>
                                        <Button
                                            onClick={handleApply}
                                            className="rounded-xl font-black bg-emerald-600 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 px-6"
                                            disabled={!tempStart}
                                        >
                                            Áp Dụng <Check className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    );
};
