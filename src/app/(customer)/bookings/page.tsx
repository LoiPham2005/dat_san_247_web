'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
    Calendar,
    Clock,
    MapPin,
    QrCode,
    MoreHorizontal,
    MessageCircle,
    RotateCcw,
    Loader2,
    Search,
    X,
    Filter,
    Calendar as CalendarIcon,
    AlertCircle,
    CheckCircle2,
    XCircle,
    ChevronRight,
    History
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBooking } from '@/lib/hooks/useBooking';
import { Booking, BookingStatus } from '@/types/booking.types';
import { cn, formatDate, formatTime, formatCurrency } from '@/lib/utils/format';
import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { useDebounce } from "@/lib/hooks/useDebounce";
import { bookingService } from '@/lib/api/services/booking.service';
import { supportService } from '@/lib/api/services/support.service';
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CustomerBookingsPage() {
    const [mounted, setMounted] = useState(false);
    const {
        bookings,
        isLoading,
        error,
        refetch,
        filters,
        setFilters,
        resetFilters,
        cancelBooking
    } = useBooking();
    const { toast } = useToast();

    // Action States
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeRescheduleId, setActiveRescheduleId] = useState<string | null>(null);
    const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
    const [rescheduleTime, setRescheduleTime] = useState({ start: '08:00', end: '09:00' });

    const [activeInvoiceId, setActiveInvoiceId] = useState<string | null>(null);
    const [invoiceData, setInvoiceData] = useState({ companyName: '', taxId: '', address: '' });

    const [activeSupportId, setActiveSupportId] = useState<string | null>(null);
    const [supportMessage, setSupportMessage] = useState('');
    const [supportSubject, setSupportSubject] = useState('');

    // Local state for search to avoid immediate refetch
    const [searchInput, setSearchInput] = useState(filters.search || '');
    const debouncedSearch = useDebounce(searchInput, 500);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Effect to update global filters when debounced search changes
    useEffect(() => {
        if (mounted) {
            setFilters({ search: debouncedSearch });
        }
    }, [debouncedSearch, mounted, setFilters]);

    const { upcomingBookings, completedBookings, cancelledBookings } = useMemo(() => {
        const safeBookings = Array.isArray(bookings) ? bookings : [];
        return {
            upcomingBookings: safeBookings.filter((b: Booking) =>
                b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING || b.status === BookingStatus.CHECKED_IN
            ),
            completedBookings: safeBookings.filter((b: Booking) => b.status === BookingStatus.COMPLETED),
            cancelledBookings: safeBookings.filter((b: Booking) => b.status === BookingStatus.CANCELLED || b.status === BookingStatus.NO_SHOW)
        };
    }, [bookings]);

    const hasFilters = filters.search || filters.date;

    const handleDateSelect = (date: Date | undefined) => {
        setFilters({ date: date ? format(date, 'yyyy-MM-dd') : undefined });
    };

    const handleRescheduleSubmit = async () => {
        if (!activeRescheduleId || !rescheduleDate) return;
        setIsProcessing(true);
        try {
            await bookingService.reschedule(activeRescheduleId, {
                bookingDate: format(rescheduleDate, 'yyyy-MM-dd'),
                startTime: `${rescheduleTime.start}:00`,
                endTime: `${rescheduleTime.end}:00`
            });
            toast({ title: "📅 Rescheduled Successfully!", description: "Your booking time has been updated." });
            setActiveRescheduleId(null);
            refetch();
        } catch (err: any) {
            toast({ title: "Failed to reschedule", description: err.message, variant: "destructive" });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleInvoiceSubmit = async () => {
        if (!activeInvoiceId) return;
        setIsProcessing(true);
        try {
            await bookingService.requestInvoice(activeInvoiceId, invoiceData);
            toast({ title: "🧾 Request Sent!", description: "We will process your invoice request shortly." });
            setActiveInvoiceId(null);
        } catch (err: any) {
            toast({ title: "Request failed", description: err.message, variant: "destructive" });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSupportSubmit = async () => {
        if (!activeSupportId) return;
        setIsProcessing(true);
        try {
            await supportService.createTicket({
                subject: supportSubject,
                message: supportMessage,
                bookingId: activeSupportId,
                priority: 'NORMAL'
            });
            toast({ title: "💬 Message Sent!", description: "Support team will contact you soon." });
            setActiveSupportId(null);
        } catch (err: any) {
            toast({ title: "Failed to send", description: err.message, variant: "destructive" });
        } finally {
            setIsProcessing(false);
        }
    };


    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 pb-20">
            <div className="container mx-auto px-4 pt-24">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Bookings</h1>
                        <p className="text-gray-500 mt-1">Manage your court reservations and history</p>
                    </div>
                    {hasFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                resetFilters();
                                setSearchInput('');
                            }}
                            className="text-primary-600 hover:text-primary-700 flex items-center gap-2 h-9"
                        >
                            <RotateCcw className="h-4 w-4" /> Clear all filters
                        </Button>
                    )}
                </div>

                {/* Search and Filters Bar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8">
                    <div className="md:col-span-8 relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors">
                            <Search className="h-5 w-5" />
                        </div>
                        <Input
                            placeholder="Search by venue name or booking code..."
                            className="pl-11 h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm rounded-xl"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <div className="md:col-span-4 flex gap-3">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "h-12 px-4 rounded-xl flex-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3 justify-start",
                                        filters.date && "border-primary-500 ring-1 ring-primary-500"
                                    )}
                                >
                                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                                    <span className={cn("text-sm", !filters.date && "text-gray-500")}>
                                        {filters.date ? formatDate(filters.date) : "Select date"}
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="p-0 border-none bg-transparent">
                                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <CalendarPicker
                                        mode="single"
                                        selected={filters.date ? new Date(filters.date) : undefined}
                                        onSelect={handleDateSelect}
                                        className="rounded-xl border-none"
                                    />
                                    {filters.date && (
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setFilters({ date: undefined })}
                                                className="w-full text-xs text-red-500"
                                            >
                                                Clear Date
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-600 mb-4" />
                        <p className="text-gray-500 font-medium">Loading your bookings...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl border border-red-100 dark:border-red-800/30 text-center max-w-md mx-4 shadow-sm">
                            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
                            <p className="text-red-600 dark:text-red-400 mb-6 text-sm">
                                {error instanceof Error ? error.message : 'An error occurred while fetching bookings. Please check your connection and try again.'}
                            </p>
                            <Button onClick={() => refetch()} className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6">
                                Try again
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="mb-8 p-1 bg-gray-100/80 dark:bg-gray-800/50 rounded-2xl h-auto w-full md:w-max flex border border-gray-200/50 dark:border-gray-700/50">
                            <TabsTrigger value="upcoming" className="flex-1 md:w-32 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm text-sm font-semibold transition-all">
                                Upcoming
                            </TabsTrigger>
                            <TabsTrigger value="completed" className="flex-1 md:w-32 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm text-sm font-semibold transition-all">
                                Completed
                            </TabsTrigger>
                            <TabsTrigger value="cancelled" className="flex-1 md:w-32 rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm text-sm font-semibold transition-all">
                                Cancelled
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {upcomingBookings.length > 0 ? (
                                upcomingBookings.map((booking: Booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onCancel={cancelBooking}
                                        onReschedule={(id) => setActiveRescheduleId(id)}
                                        onRequestInvoice={(id) => setActiveInvoiceId(id)}
                                        onContactSupport={(id) => setActiveSupportId(id)}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    message={hasFilters ? "No bookings match your filters." : "No upcoming bookings found."}
                                    onAction={() => hasFilters ? resetFilters() : null}
                                />
                            )}
                        </TabsContent>
                        <TabsContent value="completed" className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {completedBookings.length > 0 ? (
                                completedBookings.map((booking: Booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onRequestInvoice={(id) => setActiveInvoiceId(id)}
                                        onContactSupport={(id) => setActiveSupportId(id)}
                                    />
                                ))
                            ) : (
                                <EmptyState message="No completed bookings found." />
                            )}
                        </TabsContent>
                        <TabsContent value="cancelled" className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {cancelledBookings.length > 0 ? (
                                cancelledBookings.map((booking: Booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onContactSupport={(id) => setActiveSupportId(id)}
                                    />
                                ))
                            ) : (
                                <EmptyState message="No cancelled bookings found." />
                            )}
                        </TabsContent>
                    </Tabs>
                )}
            </div>

            {/* Support Dialog */}
            <Dialog open={!!activeSupportId} onOpenChange={(open) => !open && setActiveSupportId(null)}>
                <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Contact Support</DialogTitle>
                        <DialogDescription className="font-medium text-gray-500">
                            Tell us what you need help with regarding booking #{bookings.find((b: Booking) => b.id === activeSupportId)?.bookingCode}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Subject</Label>
                            <Input
                                placeholder="What is this regarding?"
                                className="h-12 rounded-xl"
                                value={supportSubject}
                                onChange={(e) => setSupportSubject(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Message</Label>
                            <Textarea
                                placeholder="Explain your issue in detail..."
                                className="min-h-[120px] rounded-2xl p-4"
                                value={supportMessage}
                                onChange={(e) => setSupportMessage(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setActiveSupportId(null)}
                            className="h-12 rounded-xl px-6 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isProcessing || !supportSubject || !supportMessage}
                            onClick={handleSupportSubmit}
                            className="h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-10 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-500/20"
                        >
                            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Invoice Dialog */}
            <Dialog open={!!activeInvoiceId} onOpenChange={(open) => !open && setActiveInvoiceId(null)}>
                <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Request Invoice</DialogTitle>
                        <DialogDescription className="font-medium text-gray-500">
                            Provide your company details for booking #{bookings.find((b: Booking) => b.id === activeInvoiceId)?.bookingCode}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Company Name</Label>
                            <Input
                                placeholder="Legal name of your company"
                                className="h-12 rounded-xl"
                                value={invoiceData.companyName}
                                onChange={(e) => setInvoiceData({ ...invoiceData, companyName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Tax ID / MST</Label>
                            <Input
                                placeholder="Tax identification number"
                                className="h-12 rounded-xl"
                                value={invoiceData.taxId}
                                onChange={(e) => setInvoiceData({ ...invoiceData, taxId: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Billing Address</Label>
                            <Textarea
                                placeholder="Full address for invoice..."
                                className="min-h-[80px] rounded-2xl p-4"
                                value={invoiceData.address}
                                onChange={(e) => setInvoiceData({ ...invoiceData, address: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setActiveInvoiceId(null)}
                            className="h-12 rounded-xl px-6 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isProcessing || !invoiceData.companyName || !invoiceData.taxId}
                            onClick={handleInvoiceSubmit}
                            className="h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-10 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-500/20"
                        >
                            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reschedule Dialog */}
            <Dialog open={!!activeRescheduleId} onOpenChange={(open) => !open && setActiveRescheduleId(null)}>
                <DialogContent className="sm:max-w-[450px] rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Reschedule Booking</DialogTitle>
                        <DialogDescription className="font-medium text-gray-500">
                            Select a new date and time for your reservation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-gray-400">New Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full h-12 rounded-xl justify-start text-left font-normal border-gray-200">
                                        <CalendarIcon className="mr-2 h-4 w-4 text-primary-600" />
                                        {rescheduleDate ? format(rescheduleDate, 'PPP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarPicker
                                        mode="single"
                                        selected={rescheduleDate}
                                        onSelect={setRescheduleDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Start Time</Label>
                                <Input
                                    type="time"
                                    className="h-12 rounded-xl"
                                    value={rescheduleTime.start}
                                    onChange={(e) => setRescheduleTime({ ...rescheduleTime, start: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-gray-400">End Time</Label>
                                <Input
                                    type="time"
                                    className="h-12 rounded-xl"
                                    value={rescheduleTime.end}
                                    onChange={(e) => setRescheduleTime({ ...rescheduleTime, end: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setActiveRescheduleId(null)}
                            className="h-12 rounded-xl px-6 font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isProcessing || !rescheduleDate}
                            onClick={handleRescheduleSubmit}
                            className="h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-10 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-500/20"
                        >
                            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm New Time"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function EmptyState({ message, onAction }: { message: string, onAction?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 shadow-sm px-6 text-center">
            <div className="h-16 w-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <History className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-900 dark:text-white font-bold text-xl mb-2">{message}</p>
            <p className="text-gray-500 mb-8 max-w-sm">Why not book a court today and get some exercise?</p>
            <div className="flex gap-4">
                {onAction ? (
                    <Button onClick={onAction} variant="outline" className="rounded-xl px-10 h-12">
                        Reset Filters
                    </Button>
                ) : (
                    <Button className="rounded-xl px-10 h-12 bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        Explore Venues
                    </Button>
                )}
            </div>
        </div>
    );
}

function BookingCard({
    booking,
    onCancel,
    onReschedule,
    onRequestInvoice,
    onContactSupport
}: {
    booking: Booking,
    onCancel?: (id: string) => void,
    onReschedule?: (id: string) => void,
    onRequestInvoice?: (id: string) => void,
    onContactSupport?: (id: string) => void
}) {
    const isCompleted = booking.status === BookingStatus.COMPLETED;
    const isCancelled = booking.status === BookingStatus.CANCELLED || booking.status === BookingStatus.NO_SHOW;
    const isCheckedIn = booking.status === BookingStatus.CHECKED_IN;
    const isUpcoming = !isCompleted && !isCancelled && !isCheckedIn;

    // Backend might return time as "HH:mm:ss", we want "HH:mm"
    const displayTime = (time: string) => time ? time.split(':').slice(0, 2).join(':') : 'N/A';

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-1 group hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-500 relative shadow-sm">
            {isCheckedIn && (
                <div className="absolute top-0 right-0">
                    <div className="bg-primary-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1.5 animate-pulse">
                        <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                        In Progress
                    </div>
                </div>
            )}

            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="relative shrink-0">
                    <div className="w-full md:w-56 h-40 md:h-full rounded-2xl overflow-hidden relative shadow-lg">
                        <img
                            src={booking.venue?.thumbnailUrl || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop"}
                            alt={booking.venue?.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-4">
                            <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg w-max mb-1">
                                {booking.courtId.includes('Field') || booking.courtId.includes('Court') ? booking.courtId : `Court - ${booking.courtId.slice(-4)}`}
                            </p>
                            <h4 className="text-white font-bold text-sm truncate">{booking.venue?.name}</h4>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
                                    {booking.venue?.name || 'Unknown Venue'}
                                </h3>
                                <div className="flex-shrink-0">
                                    {booking.status === BookingStatus.CONFIRMED && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                    {booking.status === BookingStatus.CANCELLED && <XCircle className="h-4 w-4 text-red-500" />}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    #{booking.bookingCode}
                                </span>
                                <Badge variant={
                                    booking.status === BookingStatus.CONFIRMED ? 'success' :
                                        booking.status === BookingStatus.PENDING ? 'info' :
                                            booking.status === BookingStatus.CHECKED_IN ? 'info' :
                                                booking.status === BookingStatus.COMPLETED ? 'success' :
                                                    booking.status === BookingStatus.NO_SHOW ? 'destructive' : 'danger'
                                } className="px-3 py-1 text-[10px] uppercase font-bold tracking-tight">
                                    {booking.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total Amount</p>
                            <span className="font-extrabold text-2xl text-primary-600 block leading-none">
                                {formatCurrency(booking.totalAmount)}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <CalendarIcon className="h-3 w-3" /> Date
                            </span>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {formatDate(booking.bookingDate)}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <Clock className="h-3 w-3" /> Time Range
                            </span>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {displayTime(booking.startTime)} — {displayTime(booking.endTime)}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <MapPin className="h-3 w-3" /> Location
                            </span>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                                {booking.venue?.address || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 flex flex-wrap gap-4 items-center border-t border-gray-50 dark:border-gray-800 mt-6">
                        <div className="flex -space-x-2">
                            {/* Decorative court type/sport icon or similar could go here */}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                            {booking.note ? `Note: ${booking.note}` : `Booking created on ${formatDate(booking.createdAt)}`}
                        </div>
                        <div className="ml-auto block sm:hidden">
                            <span className="font-extrabold text-xl text-primary-600">
                                {formatCurrency(booking.totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions Button List */}
                <div className="flex flex-row md:flex-col items-center justify-between md:justify-start border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 pl-0 md:pl-6 gap-3 min-w-[140px]">
                    {!isCancelled ? (
                        <>
                            <Button className="w-full h-11 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary-600 dark:hover:bg-primary-600 dark:hover:text-white rounded-xl shadow-lg shadow-gray-200 dark:shadow-none transition-all flex items-center gap-2 group/btn">
                                <QrCode className="h-4 w-4" />
                                <span className="font-bold text-sm">Check In</span>
                                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all hidden sm:block" />
                            </Button>
                            <div className="flex w-full gap-2">
                                <Link href="/messages" className="flex-1">
                                    <Button variant="outline" className="w-full h-11 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors" size="icon">
                                        <MessageCircle className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex-1 h-11 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors" size="icon">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-gray-100 shadow-xl">
                                        {(isUpcoming || booking.status === BookingStatus.PENDING) && onReschedule && (
                                            <DropdownMenuItem className="rounded-xl h-10 cursor-pointer font-medium" onClick={() => onReschedule(booking.id)}>
                                                Reschedule Booking
                                            </DropdownMenuItem>
                                        )}
                                        {onRequestInvoice && (
                                            <DropdownMenuItem className="rounded-xl h-10 cursor-pointer font-medium" onClick={() => onRequestInvoice(booking.id)}>
                                                Request Invoice
                                            </DropdownMenuItem>
                                        )}
                                        {onContactSupport && (
                                            <DropdownMenuItem className="rounded-xl h-10 cursor-pointer font-medium" onClick={() => onContactSupport(booking.id)}>
                                                Contact Support
                                            </DropdownMenuItem>
                                        )}
                                        {onCancel && (isUpcoming || booking.status === BookingStatus.PENDING) && (
                                            <>
                                                <div className="my-1 border-t border-gray-100 opacity-50" />
                                                <DropdownMenuItem
                                                    className="text-red-500 focus:text-red-500 focus:bg-red-50 rounded-xl h-10 cursor-pointer font-semibold"
                                                    onClick={() => onCancel(booking.id)}
                                                >
                                                    Cancel Booking
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col w-full gap-2">
                            <Button variant="outline" className="w-full h-12 rounded-xl border-gray-200 flex gap-2 font-bold text-gray-700 hover:bg-gray-50">
                                <RotateCcw className="h-4 w-4" /> Book Again
                            </Button>
                            {booking.status === BookingStatus.COMPLETED && (
                                <Button variant="ghost" className="w-full text-primary-600 font-bold hover:bg-primary-50 rounded-xl">
                                    Rate & Review
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


