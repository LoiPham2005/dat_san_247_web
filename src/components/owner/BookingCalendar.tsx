'use client';

import { useState } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingCalendarProps {
    bookings: any[];
}

export function BookingCalendar({ bookings }: BookingCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const getBookingsForDay = (day: Date) => {
        return bookings.filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return isSameDay(day, bookingDate);
        });
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-auto min-h-[500px]">
                {days.map((day, idx) => {
                    const dayBookings = getBookingsForDay(day);
                    const isCurrentMonth = isSameMonth(day, monthStart);

                    return (
                        <div
                            key={idx}
                            className={`min-h-[100px] p-2 border-r border-b dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/20 ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-400 dark:bg-gray-900/50' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-sm font-medium ${isSameDay(day, new Date()) ? 'bg-primary-600 text-white w-6 h-6 flex items-center justify-center rounded-full' : ''}`}>
                                    {format(day, 'd')}
                                </span>
                                {dayBookings.length > 0 && (
                                    <span className="text-[10px] text-gray-500 font-bold">{dayBookings.length} bookings</span>
                                )}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                                {dayBookings.slice(0, 3).map(booking => (
                                    <div
                                        key={booking.id}
                                        className="px-1.5 py-0.5 text-[10px] rounded bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 truncate border border-primary-100 dark:border-primary-800"
                                        title={`${booking.startTime} - ${booking.court?.name}`}
                                    >
                                        <span className="font-bold">{booking.startTime.slice(0, 5)}</span> {booking.court?.name}
                                    </div>
                                ))}
                                {dayBookings.length > 3 && (
                                    <div className="text-[10px] text-gray-400 pl-1">
                                        + {dayBookings.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
