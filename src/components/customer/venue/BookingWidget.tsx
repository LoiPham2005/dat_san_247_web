'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/format';

const TIME_SLOTS = [
    { time: '07:00', price: 200000, available: true },
    { time: '08:00', price: 200000, available: true },
    { time: '09:00', price: 250000, available: false },
    { time: '10:00', price: 250000, available: true },
    { time: '16:00', price: 300000, available: true },
    { time: '17:00', price: 350000, available: true },
    { time: '18:00', price: 400000, available: false },
    { time: '19:00', price: 400000, available: true },
    { time: '20:00', price: 350000, available: true },
];

export const BookingWidget = ({ price }: { price: number }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl p-6 sticky top-24">
            <div className="flex items-end justify-between mb-6">
                <div>
                    <p className="text-gray-500 text-sm">Price starts from</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary-600">{price.toLocaleString()}đ</span>
                        <span className="text-gray-400">/hour</span>
                    </div>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Available Today
                </div>
            </div>

            <div className="space-y-6">
                {/* Date Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" /> Select Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            {/* Using a simple div for calendar placeholder if component is missing, 
                                but assuming standard Shadcn Calendar exists */}
                            <div className="p-2">
                                <p className="text-center text-xs text-gray-500 mb-2">Calendar Component</p>
                                {/* Mock Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {[...Array(30)].map((_, i) => (
                                        <div key={i}
                                            className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${i === 15 ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}`}
                                            onClick={() => setDate(new Date())} // Mock set
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Available Slots
                        </label>
                        <span className="text-xs text-gray-400">Duration: 60m</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot, idx) => (
                            <button
                                key={idx}
                                disabled={!slot.available}
                                onClick={() => setSelectedSlot(idx)}
                                className={cn(
                                    "px-2 py-2 rounded-lg border text-sm transition-all relative",
                                    !slot.available
                                        ? "bg-gray-100 text-gray-400 border-transparent cursor-not-allowed decoration-slice line-through opacity-60"
                                        : selectedSlot === idx
                                            ? "bg-primary-600 text-white border-primary-600 shadow-md ring-2 ring-primary-200"
                                            : "bg-white hover:border-primary-500 hover:text-primary-600 text-gray-700 border-gray-200"
                                )}
                            >
                                {slot.time}
                                {selectedSlot === idx && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[9px] font-bold px-1 rounded-sm shadow-sm">
                                        -{Math.floor(Math.random() * 20)}%
                                    </span>
                                )}
                                {/* Mock Dynamic Pricing Badge */}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                {selectedSlot !== null && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Venue Price</span>
                            <span>{TIME_SLOTS[selectedSlot].price.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span className="flex items-center gap-1"><Info className="h-3 w-3" /> Service Fee</span>
                            <span>0đ</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-primary-600">{TIME_SLOTS[selectedSlot].price.toLocaleString()}đ</span>
                        </div>
                    </div>
                )}

                <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary-500/20" disabled={selectedSlot === null}>
                    {selectedSlot !== null ? 'Proceed to Payment' : 'Select a Slot'}
                </Button>

                <p className="text-center text-xs text-gray-400">
                    Free cancellation up to 2 hours before booking.
                </p>
            </div>
        </div>
    );
};
