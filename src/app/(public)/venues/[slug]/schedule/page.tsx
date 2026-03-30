"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { ChevronLeft, Calendar as CalendarIcon, Info, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useVenueSchedule } from '@/features/venue/hooks/useVenueSearch';

// Thời gian từ 05:00 đến 23:00, mỗi slot 30ph
const generateTimeSlots = () => {
    let slots = [];
    for (let h = 5; h <= 23; h++) {
        slots.push(`${h.toString().padStart(2, '0')}:00`);
        slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
};
const timeSlots = generateTimeSlots();

const generateNextDays = () => {
    return Array.from({length: 4}).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        let label = '';
        if (i === 0) label = 'Hôm nay';
        else if (i === 1) label = 'Ngày mai';
        else label = `Thứ ${d.getDay() === 0 ? 'CN' : d.getDay() + 1}, ${d.getDate()}/${d.getMonth() + 1}`;
        return { label, value: d.toISOString().split('T')[0] };
    });
};

export default function VenueGlobalSchedulePage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [bookingMode, setBookingMode] = useState<'single' | 'recurring'>('single');
    const dayTabs = generateNextDays();
    
    // selectedSlots stores detailed info so checkout can reuse
    const [selectedSlots, setSelectedSlots] = useState<{ courtId: string, courtName: string, time: string, price: number }[]>([]);

    const { data: scheduleData, isLoading } = useVenueSchedule(params.slug, selectedDate);

    const getSlotPrice = (court: any, time: string, dateStr: string) => {
        const d = new Date(dateStr);
        const dayOfWeekStr = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][d.getDay()];
        
        let matchingRule = null;
        if (court.pricing_rules && court.pricing_rules.length > 0) {
            matchingRule = court.pricing_rules.find((pr: any) => {
                const matchDay = !pr.day_of_week || pr.day_of_week === dayOfWeekStr;
                const matchTime = time >= pr.start_time && time < pr.end_time;
                return matchDay && matchTime;
            });
        }
        
        const hourlyPrice = matchingRule ? matchingRule.price : court.price_per_hour;
        return hourlyPrice / 2; // Price for 30 minutes
    };

    const isBooked = (courtId: string, time: string) => {
        if (!scheduleData?.bookings) return false;
        return scheduleData.bookings.some((b: any) => {
            return b.court_id === courtId && time >= b.start_time && time < b.end_time;
        });
    };

    const toggleSlot = (court: any, time: string) => {
        if (isBooked(court.id, time)) return;
        
        const exists = selectedSlots.find(s => s.courtId === court.id && s.time === time);
        if (exists) {
            setSelectedSlots(prev => prev.filter(s => !(s.courtId === court.id && s.time === time)));
        } else {
            const price = getSlotPrice(court, time, selectedDate);
            setSelectedSlots(prev => [...prev, { courtId: court.id, courtName: court.name, time, price }]);
        }
    };

    const handleConfirmBooking = () => {
        // Build payload for checkout
        const bookingDraft = {
            venue: scheduleData?.venue,
            date: selectedDate,
            slots: selectedSlots,
            mode: bookingMode
        };
        localStorage.setItem('booking_draft', JSON.stringify(bookingDraft));
        router.push('/checkout');
    };

    const totalPrice = selectedSlots.reduce((sum, s) => sum + s.price, 0);

    return (
        <div className="bg-slate-50 min-h-screen pb-32 flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 md:top-16 z-40 shadow-sm">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-slate-100" onClick={() => router.back()}>
                            <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </Button>
                        <div>
                            {isLoading ? (
                                <div className="h-6 w-48 bg-slate-200 animate-pulse rounded"></div>
                            ) : (
                                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{scheduleData?.venue?.name || 'Lịch trống bao quát'}</h1>
                            )}
                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3.5 h-3.5" /> 
                                {scheduleData?.venue?.address || 'Đang tải...'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Mode Switcher */}
                        <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                            <button 
                                onClick={() => { setBookingMode('single'); setSelectedSlots([]); }}
                                className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all", bookingMode === 'single' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800")}
                            >
                                Đặt sân lẻ
                            </button>
                            <button 
                                onClick={() => { setBookingMode('recurring'); setSelectedSlots([]); }}
                                className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all", bookingMode === 'recurring' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800")}
                            >
                                Đặt cố định
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {bookingMode === 'single' ? (
                                <>
                                    {dayTabs.map(tab => (
                                        <button 
                                            key={tab.value}
                                            className={cn("px-4 py-2 font-bold text-sm rounded-xl transition-all shrink-0", selectedDate === tab.value ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800")}
                                            onClick={() => setSelectedDate(tab.value)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                    <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                    <input 
                                        type="date" 
                                        className="bg-transparent border-none text-sm font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-200/50 px-2 py-1 rounded-lg transition-colors"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            if(e.target.value) {
                                                setSelectedDate(e.target.value);
                                            }
                                        }}
                                        title="Chọn ngày khác"
                                    />
                                </>
                            ) : (
                                <div className="px-4 py-2 text-sm font-bold text-slate-600 flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-primary" /> Lịch cố định hàng tuần
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Matrix Schedule */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/60 overflow-hidden flex flex-col">
                    
                    {/* Toolbar / Legend */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-6 items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-bold text-slate-700">
                            <CalendarIcon className="w-4 h-4 text-primary" /> Lịch Trống Bao Quát - {selectedDate.split('-').reverse().join('/')}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><div className="w-4 h-4 rounded bg-white border border-slate-200 shadow-inner"></div> Trống</div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><div className="w-4 h-4 rounded bg-rose-200 border border-rose-300"></div> Đã đặt</div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><div className="w-4 h-4 rounded bg-primary border border-primary"></div> Đang chọn</div>
                        </div>
                    </div>

                    <div className="overflow-x-auto relative min-h-[400px]">
                        {isLoading ? (
                            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                                <div className="font-bold text-slate-500 animate-pulse">Đang tải lịch...</div>
                            </div>
                        ) : null}

                        <div className="min-w-[1200px]">
                            {/* Matrix Header (Times) */}
                            <div className="flex border-b border-slate-200 bg-slate-100/50 sticky top-0 z-10">
                                <div className="w-32 md:w-48 shrink-0 p-4 font-bold text-slate-400 uppercase tracking-widest text-xs border-r border-slate-200 flex items-center justify-center bg-slate-100">
                                    Sân \ Giờ
                                </div>
                                <div className="flex-1 flex text-[10px] font-bold text-slate-400">
                                    {timeSlots.map((time, idx) => (
                                        <div key={idx} className="flex-1 min-w-[60px] border-r border-slate-200 py-4 flex items-center justify-start relative">
                                            <span className="absolute left-0 -translate-x-1/2 bg-slate-100 px-1 py-0.5 rounded shadow-sm z-10">{time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Matrix Body (Courts) */}
                            <div className="divide-y divide-slate-100">
                                {scheduleData?.courts?.length === 0 && !isLoading && (
                                    <div className="p-8 text-center text-slate-500 italic">Cơ sở này chưa có sân nào hoạt động.</div>
                                )}
                                {scheduleData?.courts?.map((court: any) => (
                                    <div key={court.id} className="flex group hover:bg-primary/5 transition-colors">
                                        <div className="w-32 md:w-48 shrink-0 p-3 border-r border-slate-100 bg-white group-hover:bg-transparent flex flex-col justify-center sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                            <span className="font-bold text-slate-800">{court.name}</span>
                                            <span className="text-[10px] text-slate-400 font-semibold">{court.type}</span>
                                        </div>
                                        <div className="flex-1 flex">
                                            {timeSlots.map((time, idx) => {
                                                const booked = isBooked(court.id, time);
                                                const selected = selectedSlots.some(s => s.courtId === court.id && s.time === time);
                                                
                                                return (
                                                    <div 
                                                        key={idx} 
                                                        onClick={() => toggleSlot(court, time)}
                                                        className={cn(
                                                            "flex-1 min-w-[60px] border-r border-slate-50 p-1 flex items-center justify-center transition-all cursor-pointer relative",
                                                            booked 
                                                                ? "bg-rose-50/80 cursor-not-allowed group/slot" 
                                                                : selected 
                                                                    ? "bg-primary text-white" 
                                                                    : "bg-white hover:bg-emerald-50 text-transparent hover:text-emerald-500 hover:border-emerald-200"
                                                        )}
                                                    >
                                                        {selected ? (
                                                            <CheckCircle2 className="w-4 h-4 animate-in zoom-in" />
                                                        ) : booked ? (
                                                            <div className="w-full h-full bg-rose-200/40 rounded border border-rose-300/60 striped-bg flex items-center justify-center"></div>
                                                        ) : (
                                                            <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100">+</span >
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Sticky Action Bar */}
            {selectedSlots.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom-full">
                    <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500">Đã chọn</p>
                                <p className="text-lg font-black text-slate-900">{selectedSlots.length} Ca <span className="text-sm font-semibold text-slate-400">({selectedSlots.length * 30} phút)</span></p>
                            </div>
                        </div>

                        <div className="flex w-full md:w-auto items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tạm tính</p>
                                <p className="text-2xl font-black text-primary">{totalPrice.toLocaleString('vi-VN')} ₫</p>
                            </div>
                            <Button 
                                size="lg" 
                                className="w-full md:w-auto h-14 px-10 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 shrink-0"
                                onClick={handleConfirmBooking}
                            >
                                Xác Nhận & Đặt Ngay
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{__html:`
                .striped-bg {
                    background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(225, 29, 72, 0.15) 5px, rgba(225, 29, 72, 0.15) 10px);
                }
            `}} />
        </div>
    );
}
