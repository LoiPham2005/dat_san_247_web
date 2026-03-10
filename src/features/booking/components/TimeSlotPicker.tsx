"use client";

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/common/Button';
import { Check, Info } from 'lucide-react';

interface TimeSlot {
    time: string;
    isAvailable: boolean;
    price: number;
}

export const TimeSlotPicker = () => {
    const [selectedSlots, setSelectedSlots] = React.useState<string[]>([]);

    // Mock slots for a day
    const slots: TimeSlot[] = [];
    for (let i = 6; i <= 22; i++) {
        slots.push({ time: `${i}:00`, isAvailable: i !== 17 && i !== 18, price: i >= 17 ? 250000 : 150000 });
        if (i < 22) {
            slots.push({ time: `${i}:30`, isAvailable: true, price: i >= 17 ? 250000 : 150000 });
        }
    }

    const toggleSlot = (time: string, available: boolean) => {
        if (!available) return;
        setSelectedSlots(prev =>
            prev.includes(time)
                ? prev.filter(t => t !== time)
                : [...prev, time].sort()
        );
    };

    const totalPrice = selectedSlots.reduce((acc, time) => {
        const slot = slots.find(s => s.time === time);
        return acc + (slot?.price || 0);
    }, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border border-slate-300 rounded-sm" />
                    <span className="text-xs font-bold text-slate-500">Trống</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm shadow-sm" />
                    <span className="text-xs font-bold text-slate-500">Đang chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded-sm" />
                    <span className="text-xs font-bold text-slate-500">Đã đặt</span>
                </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {slots.map((slot) => {
                    const isSelected = selectedSlots.includes(slot.time);
                    return (
                        <button
                            key={slot.time}
                            disabled={!slot.isAvailable}
                            onClick={() => toggleSlot(slot.time, slot.isAvailable)}
                            className={cn(
                                "group relative flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all duration-200",
                                isSelected
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-95"
                                    : slot.isAvailable
                                        ? "bg-white border-slate-200 text-slate-700 hover:border-primary/50 hover:bg-primary/5 shadow-sm"
                                        : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                            )}
                        >
                            <span className="text-xs font-extrabold tracking-tight">{slot.time}</span>
                            <span className={cn(
                                "text-[9px] font-bold mt-0.5",
                                isSelected ? "text-white/80" : "text-slate-400 group-hover:text-primary/70"
                            )}>
                                {slot.isAvailable ? `${(slot.price / 1000)}k` : 'Hết'}
                            </span>
                            {isSelected && <Check className="absolute top-1 right-1 w-2.5 h-2.5 text-white" />}
                        </button>
                    );
                })}
            </div>

            {/* Summary Floating Bar - Inside the Card */}
            {selectedSlots.length > 0 && (
                <div className="pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 font-medium">Số slot đã chọn:</span>
                            <span className="text-primary font-bold">{selectedSlots.length} ({(selectedSlots.length * 0.5)}h)</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Tổng thanh toán</p>
                                <p className="text-2xl font-black text-slate-900 mt-1">{totalPrice.toLocaleString()}đ</p>
                            </div>
                            <Button className="font-bold px-8 py-6 rounded-xl shadow-xl shadow-primary/20">
                                Tiếp tục
                            </Button>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-600 bg-amber-50 p-2 rounded-lg">
                            <Info className="w-3 h-3 flex-shrink-0" />
                            <span>Bạn có thể hủy lịch trước 24h để nhận hoàn tiền 100%.</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
