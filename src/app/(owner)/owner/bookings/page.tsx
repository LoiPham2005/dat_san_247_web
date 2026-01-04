'use client';

import { useState } from 'react';
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
    MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { MOCK_BOOKINGS } from "@/lib/constants/mock-data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function OwnerBookingsPage() {
    const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'timeline'>('list');

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
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Booking
                    </Button>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        placeholder="Search by customer name, phone or booking ID..."
                        className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-900 dark:border-gray-800"
                    />
                </div>
                <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-800">
                    <option>All Venues</option>
                    <option>Sân 1</option>
                    <option>Sân 2</option>
                </select>
                <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-800">
                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                </select>
                <input
                    type="date"
                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-800"
                />
            </div>

            {/* Main Content */}
            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                {viewMode === 'list' && (
                    <div className="p-4">
                        <DataTable
                            columns={columns}
                            data={MOCK_BOOKINGS}
                            searchKey="customer"
                        />
                    </div>
                )}
                {viewMode === 'calendar' && (
                    <div className="h-[600px] flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Calendar View Integration Required</p>
                        </div>
                    </div>
                )}
                {viewMode === 'timeline' && (
                    <div className="h-[600px] flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Timeline View Integration Required</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "id",
        header: "Booking ID",
        cell: ({ row }) => <span className="font-mono text-xs font-bold text-gray-500">#{row.original.id}</span>
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
            <div>
                <p className="font-medium text-sm text-gray-900 dark:text-white">{row.original.customer}</p>
                <p className="text-xs text-gray-500">0901234567</p>
            </div>
        )
    },
    {
        accessorKey: "venue",
        header: "Venue",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm">{row.original.venue}</span>
            </div>
        )
    },
    {
        accessorKey: "schedule",
        header: "Schedule",
        cell: ({ row }) => (
            <div>
                <p className="text-sm font-medium">{row.original.date}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {row.original.time}
                </p>
            </div>
        )
    },
    {
        accessorKey: "amount",
        header: "Price",
        cell: ({ row }) => <span className="font-bold text-primary-600">{row.original.amount}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={
                    status === 'COMPLETED' ? 'success' :
                        status === 'CONFIRMED' ? 'info' :
                            status === 'PENDING' ? 'warning' : 'danger'
                }>
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
                    <DropdownMenuItem>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" /> Check In
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MessageCircle className="mr-2 h-4 w-4 text-blue-600" /> Chat Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" /> Print Invoice
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" /> Reschedule
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4 text-red-600" /> Cancel Booking
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
];
