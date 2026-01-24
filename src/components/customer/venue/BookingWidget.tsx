'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart.store';
import { useToast } from '@/components/ui/use-toast';
import { Venue } from '@/types/venue.types';
import { Badge } from '@/components/ui/badge';

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

export const BookingWidget = ({ venue }: { venue: Venue }) => {
    const price = venue.courts?.[0]?.pricePerHour || 0;
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const { addItem } = useCartStore();
    const { toast } = useToast();

    const handleAddToCart = () => {
        if (selectedSlot === null || !venue || !venue.courts?.[0]) return;

        const court = venue.courts[0];
        const slot = TIME_SLOTS[selectedSlot];

        const cartItem = {
            id: `${venue.id}-${court.id}-${date?.toISOString().split('T')[0]}-${slot.time}`,
            venueId: venue.id,
            venueName: venue.name,
            courtId: court.id,
            courtName: court.name,
            sportType: court.sportType,
            date: date?.toLocaleDateString() || '',
            startTime: slot.time,
            endTime: `${(parseInt(slot.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
            price: slot.price,
            thumbnailUrl: venue.thumbnailUrl || venue.images?.[0]?.imageUrl || ''
        };

        addItem(cartItem);
        toast({
            title: "Added to basket",
            description: `${venue.name} - ${slot.time} added successfully.`
        });
        setSelectedSlot(null);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-8 sticky top-28">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price starts from</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-primary-600 tracking-tighter">{price.toLocaleString()}đ</span>
                        <span className="text-gray-400 font-bold text-sm">/hr</span>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Date Selection */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        1. Pick a Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full h-14 justify-start text-left font-bold rounded-2xl bg-gray-50 border-none hover:bg-gray-100 transition-all",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-3 h-5 w-5 text-primary-600" />
                                {date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : <span>Select Date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-3xl overflow-hidden" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="p-4"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between ml-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            2. Select Suất
                        </label>
                        <Badge variant="secondary" className="text-[9px] font-black uppercase">60 min session</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {TIME_SLOTS.map((slot, idx) => (
                            <button
                                key={idx}
                                disabled={!slot.available}
                                onClick={() => setSelectedSlot(selectedSlot === idx ? null : idx)}
                                className={cn(
                                    "h-12 rounded-xl text-xs font-black transition-all relative border-2",
                                    !slot.available
                                        ? "bg-gray-50 text-gray-300 border-transparent cursor-not-allowed opacity-40"
                                        : selectedSlot === idx
                                            ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/30 scale-105 z-10"
                                            : "bg-white text-gray-700 border-gray-100 hover:border-primary-500 hover:text-primary-600"
                                )}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Total Summary */}
                <div className={cn(
                    "overflow-hidden transition-all duration-500",
                    selectedSlot !== null ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-[2rem] space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                            <span className="text-gray-400">Suất Price</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedSlot !== null ? TIME_SLOTS[selectedSlot].price.toLocaleString() : 0}đ</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-tight text-green-600">
                            <span className="flex items-center gap-1">Service Fee</span>
                            <span>FREE</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</span>
                            <span className="text-2xl font-black text-primary-600">{selectedSlot !== null ? TIME_SLOTS[selectedSlot].price.toLocaleString() : 0}đ</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-3">
                    <Button
                        className="w-full h-16 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-95"
                        disabled={selectedSlot === null}
                        onClick={handleAddToCart}
                    >
                        {selectedSlot !== null ? 'Add to Basket' : 'Select a Suất First'}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full h-14 rounded-2xl border-gray-100 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50"
                        disabled={selectedSlot === null}
                    >
                        Pay Now (Direct)
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Info className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Instant Booking Confirmation</span>
                </div>
            </div>
        </div>
    );
};
