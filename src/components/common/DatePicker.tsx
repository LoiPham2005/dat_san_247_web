"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfToday, isSameDay, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';
import { Portal } from './Portal';

interface DatePickerProps {
    date: Date;
    onChange: (date: Date) => void;
    className?: string;
    placeholder?: string;
}

export const DatePicker = ({ date, onChange, className, placeholder = "Chọn ngày" }: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date(date));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(date));

    useEffect(() => {
        setSelectedDate(date);
    }, [date]);

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
    });

    const handleDateClick = (day: Date) => {
        setSelectedDate(day);
    };

    const handleApply = () => {
        onChange(selectedDate);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="rounded-xl border-slate-200 font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-2 h-10 px-4"
                size="sm"
            >
                <CalendarIcon className="w-4 h-4 text-indigo-600" />
                <span>{format(date, 'dd/MM/yyyy')}</span>
            </Button>

            {isOpen && (
                <Portal>
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />

                        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm border border-white/20 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col min-h-[400px]">
                            {/* Calendar Header */}
                            <div className="p-6 pb-0 flex flex-col font-sans">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight">
                                        {format(viewDate, 'MMMM yyyy', { locale: vi })}
                                    </h3>
                                    <div className="flex items-center gap-1 mr-12">
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
                                        const isSelected = isSameDay(day, selectedDate);
                                        const isToday = isSameDay(day, startOfToday());
                                        const isOutsideMonth = !isSameDay(startOfMonth(day), startOfMonth(viewDate));

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleDateClick(day)}
                                                className={cn(
                                                    "h-10 w-full flex items-center justify-center text-sm font-bold rounded-xl transition-all relative",
                                                    isSelected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 z-10" :
                                                        isOutsideMonth ? "text-slate-200" : "text-slate-600 hover:bg-slate-50",
                                                    isToday && !isSelected && "text-indigo-600"
                                                )}
                                            >
                                                {format(day, 'd')}
                                                {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-indigo-600 rounded-full"></div>}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 py-6 border-t border-slate-100 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang chọn</span>
                                        <span className="text-sm font-black text-slate-800">{format(selectedDate, 'dd/MM/yyyy')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-bold text-slate-400">
                                            Hủy
                                        </Button>
                                        <Button
                                            onClick={handleApply}
                                            className="rounded-xl font-black bg-indigo-600 shadow-lg shadow-indigo-500/20 px-6"
                                        >
                                            Chọn <Check className="w-4 h-4 ml-2" />
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
