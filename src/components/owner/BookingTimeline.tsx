'use client';

import { useState, useEffect, useMemo } from 'react';
import { format, addDays, subDays, startOfDay, addHours, eachHourOfInterval, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { venueService } from '@/lib/api/services/venue.service';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BookingTimelineProps {
    bookings: any[];
    venueId: string;
}

export function BookingTimeline({ bookings, venueId }: BookingTimelineProps) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [courts, setCourts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (venueId && venueId !== 'all') {
            const fetchCourts = async () => {
                setIsLoading(true);
                try {
                    const data = await venueService.getOwnerCourts(venueId);
                    setCourts(data);
                } catch (error) {
                    console.error("Failed to fetch courts", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCourts();
        } else {
            setCourts([]);
        }
    }, [venueId]);

    const hours = useMemo(() => {
        const start = startOfDay(selectedDate);
        const end = addHours(start, 23);
        return eachHourOfInterval({ start, end });
    }, [selectedDate]);

    const getBookingsForCourt = (courtId: string) => {
        return bookings.filter(b =>
            b.courtId === courtId &&
            isSameDay(new Date(b.bookingDate), selectedDate)
        );
    };

    const calculatePosition = (timeStr: string) => {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60 + minutes); // total minutes from midnight
    };

    const minuteWidth = 2; // px per minute

    if (!venueId || venueId === 'all') {
        return (
            <div className="h-[400px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                <div className="text-center">
                    <MapPin className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>Please select a specific venue to view the timeline</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">{format(selectedDate, 'EEEE, MMM d, yyyy')}</h2>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedDate(subDays(selectedDate, 1))}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedDate(new Date())}>Today</Button>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-1 w-full overflow-auto">
                <div className="inline-block min-w-full">
                    {/* Time Header */}
                    <div className="flex border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                        <div className="w-32 flex-shrink-0 p-4 font-bold text-xs uppercase text-gray-400 border-r dark:border-gray-800">
                            Court / Time
                        </div>
                        <div className="flex">
                            {hours.map(hour => (
                                <div key={hour.toString()} className="flex-shrink-0 border-r dark:border-gray-800" style={{ width: `${60 * minuteWidth}px` }}>
                                    <div className="p-2 text-[10px] font-bold text-gray-400">
                                        {format(hour, 'HH:mm')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Court Rows */}
                    <div className="relative">
                        {courts.map(court => {
                            const courtBookings = getBookingsForCourt(court.id);
                            return (
                                <div key={court.id} className="flex border-b dark:border-gray-800 min-h-[80px] group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/20">
                                    <div className="w-32 flex-shrink-0 p-4 border-r dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                                        <p className="font-bold text-sm text-gray-700 dark:text-gray-200">{court.name}</p>
                                        <p className="text-[10px] text-gray-400">{court.type}</p>
                                    </div>
                                    <div className="flex relative flex-1">
                                        {/* Grid lines */}
                                        {hours.map(hour => (
                                            <div key={hour.toString()} className="flex-shrink-0 border-r border-gray-100 dark:border-gray-800/50 h-full" style={{ width: `${60 * minuteWidth}px` }}></div>
                                        ))}

                                        {/* Bookings */}
                                        {courtBookings.map(booking => {
                                            const startMin = calculatePosition(booking.startTime);
                                            const endMin = calculatePosition(booking.endTime);
                                            const duration = endMin - startMin;

                                            // Handle cases where booking crosses midnight (simple overlap)
                                            if (duration <= 0) return null;

                                            const statusColors: Record<string, string> = {
                                                'COMPLETED': 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-300',
                                                'CONFIRMED': 'bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300',
                                                'PENDING': 'bg-yellow-500/10 border-yellow-500 text-yellow-700 dark:text-yellow-300',
                                                'CANCELLED': 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-300',
                                                'CHECKED_IN': 'bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                                            };

                                            const colorClass = statusColors[booking.status] || 'bg-primary-500/10 border-primary-500 text-primary-700';

                                            return (
                                                <div
                                                    key={booking.id}
                                                    className={`absolute top-2 bottom-2 rounded-lg border-l-4 p-2 overflow-hidden shadow-sm transition-all hover:scale-[1.01] hover:z-10 cursor-pointer ${colorClass}`}
                                                    style={{
                                                        left: `${startMin * minuteWidth}px`,
                                                        width: `${duration * minuteWidth}px`
                                                    }}
                                                >
                                                    <p className="text-[10px] font-bold truncate">
                                                        {booking.customer?.fullName || 'Walk-in'}
                                                    </p>
                                                    <p className="text-[9px] opacity-80 truncate">
                                                        {booking.startTime.slice(0, 5)} - {booking.endTime.slice(0, 5)}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                        {courts.length === 0 && !isLoading && (
                            <div className="p-8 text-center text-gray-400">
                                No courts found for this venue.
                            </div>
                        )}
                        {isLoading && (
                            <div className="p-8 text-center text-gray-400">
                                Loading courts...
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
