'use client';

import { useState, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Calendar as CalendarIcon,
    Clock,
    Info,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    Check,
    X,
    CreditCard,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart.store';
import { useAuthStore } from '@/lib/store/auth.store';
import { useToast } from '@/components/ui/use-toast';
import { Venue } from '@/types/venue.types';
import { Badge } from '@/components/ui/badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/lib/api/services/booking.service';
import { useRouter } from 'next/navigation';
import { useVenueAvailability } from '@/lib/hooks/useVenueAvailability';
import { format } from 'date-fns';

// Sport Type Labels with Emojis
const SPORT_TYPE_LABELS: Record<string, { emoji: string; label: string }> = {
    'BADMINTON': { emoji: '🏸', label: 'Cầu Lông' },
    'TENNIS': { emoji: '🎾', label: 'Tennis' },
    'FOOTBALL': { emoji: '⚽', label: 'Bóng Đá' },
    'BASKETBALL': { emoji: '🏀', label: 'Bóng Rổ' },
    'VOLLEYBALL': { emoji: '🏐', label: 'Bóng Chuyền' },
    'TABLE_TENNIS': { emoji: '🏓', label: 'Bóng Bàn' }
};

interface Selection {
    courtId: string;
    startSlot: string;
    endSlot: string;
}

export const BookingWidget = ({ venue }: { venue: Venue }) => {
    const [date, setDate] = useState<Date>(new Date());
    const dateStr = format(date, 'yyyy-MM-dd');

    const {
        data: availabilityData,
        isLoading: isAvailabilityLoading,
        error: availabilityError
    } = useVenueAvailability(venue.id, dateStr);

    const [selection, setSelection] = useState<Selection | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ courtId: string; slot: string } | null>(null);
    const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState(false);

    // Track if slot was selected before mousedown (for toggle)
    const wasAlreadySelected = useRef<boolean>(false);

    // Calendar modal states
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

    const { addItem } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Mutation for instant payment/checkout
    const payMutation = useMutation({
        mutationFn: async (bookingData: any) => {
            return bookingService.create(bookingData);
        },
        onSuccess: (data) => {
            toast({
                title: "✅ Thanh toán thành công!",
                description: `Đơn hàng ${data.bookingCode} đã được lưu và xác nhận.`,
                className: "bg-green-600 text-white border-none",
            });
            setSelection(null);
            queryClient.invalidateQueries({ queryKey: ['venue-availability'] });
        },
        onError: (error: any) => {
            toast({
                title: "❌ Lỗi thanh toán",
                description: error.response?.data?.message || "Không thể thực hiện thanh toán lúc này.",
                variant: "destructive",
            });
        }
    });

    const timeSlots = useMemo(() => {
        if (!availabilityData?.courts?.[0]?.slots) return [];
        return availabilityData.courts[0].slots.map(s => s.time);
    }, [availabilityData]);

    const allCourts = venue.courts || [];

    const sportTypes = useMemo(() => {
        const types = new Set(allCourts.map((c: any) => c.sportType));
        return Array.from(types);
    }, [allCourts]);

    const [selectedSportType, setSelectedSportType] = useState<string>(sportTypes[0] || '');

    const courts = useMemo(() => {
        if (!availabilityData?.courts) return [];
        return availabilityData.courts.filter((c: any) => c.sportType === selectedSportType);
    }, [availabilityData, selectedSportType]);

    const availabilityMap = useMemo(() => {
        const map: Record<string, Record<string, { available: boolean, price: number }>> = {};
        if (availabilityData?.courts) {
            availabilityData.courts.forEach(court => {
                map[court.courtId] = {};
                court.slots.forEach(slot => {
                    map[court.courtId][slot.time] = {
                        available: slot.available,
                        price: slot.price
                    };
                });
            });
        }
        return map;
    }, [availabilityData]);

    const next14Days = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            days.push(d);
        }
        return days;
    }, []);

    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const handleMouseDown = (courtId: string, slot: string) => {
        if (!availabilityMap[courtId]?.[slot]?.available) return;

        setIsDragging(true);
        setHasMovedDuringDrag(false);
        setDragStart({ courtId, slot });

        // If there's an existing selection on the same court, try to EXTEND it
        const canExtend = selection && selection.courtId === courtId;

        if (canExtend) {
            const startIdx = timeSlots.indexOf(selection.startSlot);
            const currentIdx = timeSlots.indexOf(slot);

            // Check if we already have this range or if it's a toggle-off scenario
            wasAlreadySelected.current = (
                currentIdx === startIdx && selection.startSlot === selection.endSlot
            ) || (
                    currentIdx >= timeSlots.indexOf(selection.startSlot) &&
                    currentIdx <= timeSlots.indexOf(selection.endSlot)
                );

            if (currentIdx !== startIdx) {
                // Try to extend range from existing start to new clicked slot
                const lowIdx = Math.min(startIdx, currentIdx);
                const highIdx = Math.max(startIdx, currentIdx);

                let allAvailable = true;
                for (let i = lowIdx; i <= highIdx; i++) {
                    if (!availabilityMap[courtId]?.[timeSlots[i]]?.available) {
                        allAvailable = false;
                        break;
                    }
                }

                if (allAvailable) {
                    setSelection({
                        courtId,
                        startSlot: timeSlots[lowIdx],
                        endSlot: timeSlots[highIdx]
                    });
                    return; // Extension successful
                }
            }
        } else {
            wasAlreadySelected.current = false;
        }

        // Default: Start new selection
        setSelection({ courtId, startSlot: slot, endSlot: slot });
    };

    const handleMouseEnter = (courtId: string, slot: string) => {
        if (!isDragging || !dragStart || dragStart.courtId !== courtId) return;
        if (!availabilityMap[courtId]?.[slot]?.available) return;

        setHasMovedDuringDrag(true);

        const startIdx = timeSlots.indexOf(dragStart.slot);
        const currentIdx = timeSlots.indexOf(slot);

        if (currentIdx >= startIdx) {
            let allAvailable = true;
            for (let i = startIdx; i <= currentIdx; i++) {
                if (!availabilityMap[courtId]?.[timeSlots[i]]?.available) {
                    allAvailable = false;
                    break;
                }
            }

            if (allAvailable) {
                setSelection({
                    courtId,
                    startSlot: dragStart.slot,
                    endSlot: slot
                });
            }
        }
    };

    const handleMouseUp = (courtId: string, slot: string) => {
        if (!isDragging) return;

        if (!hasMovedDuringDrag && dragStart && dragStart.courtId === courtId && dragStart.slot === slot) {
            if (wasAlreadySelected.current) {
                setSelection(null);
            }
        }

        setIsDragging(false);
        setDragStart(null);
    };

    const isSlotSelected = (courtId: string, slot: string) => {
        if (!selection || selection.courtId !== courtId) return false;
        const startIdx = timeSlots.indexOf(selection.startSlot);
        const endIdx = timeSlots.indexOf(selection.endSlot);
        const slotIdx = timeSlots.indexOf(slot);
        return slotIdx >= startIdx && slotIdx <= endIdx;
    };

    const isSlotStart = (courtId: string, slot: string) => {
        return selection?.courtId === courtId && selection?.startSlot === slot;
    };

    const getSelectedDuration = () => {
        if (!selection) return 0;
        const startIdx = timeSlots.indexOf(selection.startSlot);
        const endIdx = timeSlots.indexOf(selection.endSlot);
        return (endIdx - startIdx + 1) * 30;
    };

    const calculateTotal = () => {
        if (!selection) return 0;
        const courtId = selection.courtId;
        const startIdx = timeSlots.indexOf(selection.startSlot);
        const endIdx = timeSlots.indexOf(selection.endSlot);

        let total = 0;
        for (let i = startIdx; i <= endIdx; i++) {
            total += availabilityMap[courtId]?.[timeSlots[i]]?.price || 0;
        }
        return total;
    };

    const handleAddToCart = () => {
        if (!selection) return;
        const court = courts.find((c: any) => c.courtId === selection.courtId);
        if (!court) return;
        const endSlotIdx = timeSlots.indexOf(selection.endSlot);
        const endTime = timeSlots[endSlotIdx + 1] || availabilityData?.closingTime || '23:00';

        addItem({
            id: `${venue.id}-${court.courtId}-${dateStr}-${selection.startSlot}`,
            venueId: venue.id,
            venueName: venue.name,
            courtId: court.courtId,
            courtName: court.courtName,
            sportType: court.sportType,
            date: date.toLocaleDateString('vi-VN'),
            startTime: selection.startSlot,
            endTime: endTime,
            price: calculateTotal(),
            thumbnailUrl: venue.thumbnailUrl || venue.images?.[0]?.imageUrl || ''
        });
        toast({ title: "🎉 Đã thêm vào giỏ hàng!" });
        setSelection(null);
    };

    const handleInstantPay = () => {
        if (!selection || !isAuthenticated) return;
        const court = courts.find((c: any) => c.courtId === selection.courtId);
        if (!court) return;
        const endSlotIdx = timeSlots.indexOf(selection.endSlot);
        const endTime = timeSlots[endSlotIdx + 1] || availabilityData?.closingTime || '23:00';

        payMutation.mutate({
            venueId: venue.id,
            courtId: court.courtId,
            bookingDate: dateStr,
            startTime: selection.startSlot,
            endTime: endTime,
            totalHours: getSelectedDuration() / 60,
            pricePerHour: court.pricePerHour,
            totalAmount: calculateTotal(),
            customerName: user?.fullName || 'Khách hàng',
            customerPhone: user?.phone || '0000000000',
            customerEmail: user?.email || '',
            status: 'CONFIRMED',
        });
    };

    const scrollTimeline = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (availabilityError) {
        return (
            <div className="bg-red-50 border-2 border-dashed border-red-200 rounded-[2rem] p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-900 mb-2">Không thể tải lịch sân</h3>
                <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['venue-availability'] })}>Thử lại</Button>
            </div>
        );
    }

    return (
        <div className={cn("bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden transition-all duration-500", isAvailabilityLoading && "opacity-60")}>
            {isAvailabilityLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                    <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
                </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-black uppercase">Đặt Lịch Ngày Trực Quan</h3>
                    <p className="text-primary-100 text-sm">Kéo để chọn • Click để chọn/bỏ nhanh</p>
                </div>
                <div className="text-right">
                    <p className="text-xs uppercase opacity-70">Ngày đang xem</p>
                    <p className="text-xl font-black">{date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}</p>
                </div>
            </div>

            {/* Sport Type Tabs */}
            {sportTypes.length > 1 && (
                <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-4">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
                        {sportTypes.map((type) => {
                            const sportInfo = SPORT_TYPE_LABELS[type] || { emoji: '🏆', label: type };
                            const isActive = selectedSportType === type;
                            return (
                                <button
                                    key={type}
                                    onClick={() => { setSelectedSportType(type); setSelection(null); }}
                                    className={cn(
                                        "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border-2",
                                        isActive ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/30" : "bg-gray-50 text-gray-700 border-gray-100 hover:border-primary-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                                    )}
                                >
                                    <span className="text-xl">{sportInfo.emoji}</span>
                                    <span className="uppercase tracking-tight">{sportInfo.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Legend + Quick Date */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded border-2 border-gray-200 bg-white"></div>
                        <span className="text-xs font-black uppercase text-gray-400">Trống</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-red-400"></div>
                        <span className="text-xs font-black uppercase text-gray-400">Đã đặt</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-primary-500"></div>
                        <span className="text-xs font-black uppercase text-gray-400">Đang chọn</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {next14Days.slice(0, 7).map((d, i) => {
                        const isSelected = date.toDateString() === d.toDateString();
                        return (
                            <button
                                key={i}
                                onClick={() => { setDate(d); setSelection(null); }}
                                className={cn(
                                    "w-12 h-14 rounded-2xl border-2 flex flex-col items-center justify-center transition-all group",
                                    isSelected ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-500/20" : "bg-white border-gray-100 hover:border-primary-400 dark:bg-gray-800 dark:border-gray-700"
                                )}
                            >
                                <span className={cn("text-[9px] font-black uppercase mb-0.5", isSelected ? "text-primary-200" : "text-gray-400 group-hover:text-primary-500")}>
                                    {i === 0 ? 'Nay' : dayNames[d.getDay()]}
                                </span>
                                <span className="text-lg font-black">{d.getDate()}</span>
                            </button>
                        );
                    })}
                    <Button variant="outline" size="icon" onClick={() => setShowCalendar(true)} className="h-14 w-14 rounded-2xl border-2 border-gray-200 hover:bg-primary-50 hover:border-primary-200 transition-all">
                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                </div>
            </div>

            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scrollTimeline('left')}
                    className="absolute left-[128px] top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-white/90 dark:bg-gray-900/90 shadow-xl flex items-center justify-center hover:bg-white transition-all border-y border-r border-gray-200 rounded-r-xl"
                >
                    <ChevronLeft className="w-5 h-5 text-primary-600" />
                </button>
                <button
                    onClick={() => scrollTimeline('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-white/90 dark:bg-gray-900/90 shadow-xl flex items-center justify-center hover:bg-white transition-all border-y border-l border-gray-200 rounded-l-xl"
                >
                    <ChevronRight className="w-5 h-5 text-primary-600" />
                </button>

                <div className="flex">
                    {/* Court Names Column */}
                    <div className="w-32 flex-shrink-0 bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-800 z-10">
                        <div className="h-12 flex items-center justify-center border-b-2 border-gray-100 dark:border-gray-800">
                            <span className="text-[10px] font-black uppercase text-gray-400">Danh sách sân</span>
                        </div>
                        {courts.map((court: any, i) => (
                            <div key={court.courtId} className={cn("h-16 flex flex-col justify-center px-4 border-b border-gray-50 dark:border-gray-800", i % 2 === 0 ? "bg-white" : "bg-gray-50/50")}>
                                <p className="font-black text-xs uppercase tracking-tight text-gray-900 truncate">{court.courtName}</p>
                                <p className="text-[8px] font-bold text-primary-600">{(court.pricePerHour / 1000)}k/giờ</p>
                            </div>
                        ))}
                    </div>

                    {/* Timeline Scrollable */}
                    <div ref={scrollRef} className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="inline-flex flex-col min-w-max">
                            {/* Time Slots Header */}
                            <div className="flex h-12 border-b-2 border-gray-100 dark:border-gray-800">
                                {timeSlots.map(slot => (
                                    <div key={slot} className="w-16 flex-shrink-0 border-r border-gray-50 dark:border-gray-800 flex items-center justify-center">
                                        <span className={cn("text-[10px] font-black", slot.endsWith(':00') ? "text-gray-900" : "text-gray-300")}>{slot}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Grid Cells */}
                            {courts.map((court: any) => (
                                <div key={court.courtId} className="flex h-16 border-b border-gray-50 dark:border-gray-800">
                                    {timeSlots.map(slot => {
                                        const slotData = availabilityMap[court.courtId]?.[slot];
                                        const isSelected = isSlotSelected(court.courtId, slot);
                                        const isStart = isSlotStart(court.courtId, slot);
                                        return (
                                            <div
                                                key={slot}
                                                onMouseDown={() => {
                                                    wasAlreadySelected.current = selection?.courtId === court.courtId && selection?.startSlot === slot && selection?.endSlot === slot;
                                                    handleMouseDown(court.courtId, slot);
                                                }}
                                                onMouseEnter={() => handleMouseEnter(court.courtId, slot)}
                                                onMouseUp={() => {
                                                    if (!hasMovedDuringDrag && wasAlreadySelected.current) setSelection(null);
                                                    handleMouseUp(court.courtId, slot);
                                                }}
                                                className={cn(
                                                    "w-16 h-full flex-shrink-0 border-r border-gray-50 dark:border-gray-800 transition-all cursor-pointer relative group",
                                                    !slotData?.available ? "bg-red-400" : isSelected ? "bg-primary-500 shadow-inner" : "hover:bg-primary-50 bg-white"
                                                )}
                                            >
                                                {slotData?.available && isStart && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-lg animate-pulse" />
                                                    </div>
                                                )}
                                                {slotData?.available && !isSelected && (
                                                    <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-[7px] font-black text-primary-400">{(slotData.price / 1000)}k</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {selection && (
                <div className="p-6 bg-gray-900 dark:bg-black text-white flex flex-col sm:flex-row justify-between items-center gap-6 border-t-4 border-primary-500 animate-in slide-in-from-bottom-6 duration-500">
                    <div className="flex gap-8 items-center bg-white/5 p-4 rounded-[2rem] border border-white/10">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Sân đã chọn</p>
                            <p className="text-xl font-black text-white">{courts.find((c: any) => c.courtId === selection.courtId)?.courtName}</p>
                        </div>
                        <div className="h-full w-px bg-white/10" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Thời gian</p>
                            <p className="text-xl font-black text-primary-500">
                                {selection.startSlot} → {timeSlots[timeSlots.indexOf(selection.endSlot) + 1] || '22:00'}
                            </p>
                        </div>
                        <div className="h-full w-px bg-white/10" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tạm tính</p>
                            <p className="text-3xl font-black text-primary-600">{calculateTotal().toLocaleString()}đ</p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" size="icon" onClick={() => setSelection(null)} className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 hover:bg-red-500 hover:border-red-500 transition-all">
                            <X className="h-6 w-6" />
                        </Button>
                        <Button onClick={handleAddToCart} className="h-16 px-8 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-black uppercase tracking-wider text-xs border border-white/10">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            + Giỏ hàng
                        </Button>
                        <Button onClick={handleInstantPay} disabled={payMutation.isPending} className="h-16 px-10 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary-500/20 flex-1">
                            {payMutation.isPending ? <Loader2 className="animate-spin h-6 w-6" /> : "Thanh Toán Ngay"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
