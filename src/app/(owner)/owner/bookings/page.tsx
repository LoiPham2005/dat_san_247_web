'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Calendar as CalendarIcon,
    ListFilter,
    Plus,
    Search,
    Clock,
    CheckCircle2,
    XCircle,
    MoreHorizontal,
    Printer,
    MessageCircle,
    RotateCcw,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useOwnerBookings } from '@/lib/hooks/useOwnerBookings';
import { useVenueStore } from '@/lib/store/venue.store';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { NewBookingModal } from '@/components/owner/NewBookingModal';
import { BookingCalendar } from '@/components/owner/BookingCalendar';
import { BookingTimeline } from '@/components/owner/BookingTimeline';

export default function OwnerBookingsPage() {
    const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'timeline'>('list');
    const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

    // Filters state
    const [searchTerm, setSearchTerm] = useState('');
    const [venueId, setVenueId] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const {
        bookings,
        isLoading,
        isFetching,
        confirmBooking,
        checkInBooking,
        completeBooking,
        cancelBooking,
        refetch
    } = useOwnerBookings({
        search: searchTerm,
        venueId: venueId === 'all' ? '' : venueId,
        status: status === 'all' ? '' : status,
        date: date
    });

    const { venues, fetchOwnerVenues } = useVenueStore();
    const { toast } = useToast();

    useEffect(() => {
        fetchOwnerVenues();
    }, [fetchOwnerVenues]);

    const handleAction = (action: string, id: string) => {
        switch (action) {
            case 'confirm':
                confirmBooking(id);
                break;
            case 'check-in':
                checkInBooking(id);
                break;
            case 'complete':
                completeBooking(id);
                break;
            case 'cancel':
                const reason = window.prompt('Enter cancellation reason:');
                if (reason !== null) {
                    cancelBooking({ id, reason });
                }
                break;
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "bookingCode",
            header: "ID",
            cell: ({ row }) => <span className="font-mono text-xs font-bold text-gray-500">#{row.original.bookingCode || row.original.id.slice(0, 8)}</span>
        },
        {
            header: "Customer",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{row.original.customer?.fullName || 'Walk-in'}</p>
                    <p className="text-xs text-gray-500">{row.original.customer?.phone || 'N/A'}</p>
                </div>
            )
        },
        {
            header: "Venue / Court",
            cell: ({ row }) => (
                <div>
                    <p className="text-sm font-medium">{row.original.venue?.name}</p>
                    <p className="text-xs text-gray-500">{row.original.court?.name}</p>
                </div>
            )
        },
        {
            header: "Schedule",
            cell: ({ row }) => (
                <div>
                    <p className="text-sm font-medium">{row.original.bookingDate}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {row.original.startTime?.slice(0, 5)} - {row.original.endTime?.slice(0, 5)}
                    </p>
                </div>
            )
        },
        {
            header: "Price",
            cell: ({ row }) => <span className="font-bold text-primary-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.original.totalPrice)}
            </span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const variants: Record<string, any> = {
                    'COMPLETED': 'success',
                    'CONFIRMED': 'info',
                    'PENDING': 'warning',
                    'CANCELLED': 'danger',
                    'CHECKED_IN': 'info'
                };
                return (
                    <Badge variant={variants[status] || 'secondary'}>
                        {status}
                    </Badge>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {row.original.status === 'PENDING' && (
                            <DropdownMenuItem onClick={() => handleAction('confirm', row.original.id)}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" /> Confirm Booking
                            </DropdownMenuItem>
                        )}
                        {row.original.status === 'CONFIRMED' && (
                            <DropdownMenuItem onClick={() => handleAction('check-in', row.original.id)}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" /> Check In
                            </DropdownMenuItem>
                        )}
                        {row.original.status === 'CHECKED_IN' && (
                            <DropdownMenuItem onClick={() => handleAction('complete', row.original.id)}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" /> Complete
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4 text-gray-600" /> Chat Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" /> Print Invoice
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {(row.original.status === 'PENDING' || row.original.status === 'CONFIRMED') && (
                            <DropdownMenuItem onClick={() => handleAction('cancel', row.original.id)} className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" /> Cancel Booking
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Booking Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Track reservations, handle walk-ins, and manage schedules.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-gray-100 p-1 rounded-lg dark:bg-gray-800">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Calendar
                        </button>
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'timeline' ? 'bg-white shadow-sm text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Timeline
                        </button>
                    </div>
                    <Button onClick={() => setIsNewBookingModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Booking
                    </Button>
                </div>
            </div>

            <NewBookingModal
                isOpen={isNewBookingModalOpen}
                onClose={() => setIsNewBookingModalOpen(false)}
            />

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <select
                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-800"
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                >
                    <option value="all">All Venues</option>
                    {venues.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                </select>
                <select
                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-800"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="CHECKED_IN">Checked In</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                <Input
                    type="date"
                    className="h-10 w-auto"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button variant="ghost" size="icon" onClick={() => refetch()}>
                    <RotateCcw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            {/* Main Content */}
            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                {viewMode === 'list' && (
                    <div className="p-4">
                        <DataTable
                            columns={columns}
                            data={bookings}
                            searchValue={searchTerm}
                            onSearchChange={(val) => {
                                setSearchTerm(val);
                            }}
                            isLoading={isFetching}
                        />
                    </div>
                )}
                {viewMode === 'calendar' && (
                    <div className="h-[700px] p-2">
                        <BookingCalendar bookings={bookings} />
                    </div>
                )}
                {viewMode === 'timeline' && (
                    <div className="h-[700px] p-2">
                        <BookingTimeline bookings={bookings} venueId={venueId} />
                    </div>
                )}
            </div>
        </div>
    );
}
