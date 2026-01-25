'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, XCircle, CheckCircle, Clock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Booking, BookingStatus } from "@/types/booking.types";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils/format";

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "bookingCode",
        header: "Booking Code",
        cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary-600">#{row.original.bookingCode}</span>
    },
    {
        accessorKey: "customerName",
        header: "Customer",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.customerName}</span>
                <span className="text-xs text-gray-500">{row.original.customerPhone}</span>
            </div>
        )
    },
    {
        accessorKey: "venue",
        header: "Venue",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[150px]">{row.original.venue?.name}</span>
                <span className="text-[10px] text-gray-400">{row.original.venue?.city}</span>
            </div>
        )
    },
    {
        accessorKey: "bookingDate",
        header: "Schedule",
        cell: ({ row }) => {
            const displayTime = (time: string) => time ? time.split(':').slice(0, 2).join(':') : 'N/A';
            return (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{formatDate(row.original.bookingDate)}</span>
                    <span className="text-xs text-gray-500">
                        {displayTime(row.original.startTime)} - {displayTime(row.original.endTime)}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => <span className="font-bold">{formatCurrency(row.original.totalAmount)}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={
                    status === BookingStatus.COMPLETED ? 'success' :
                        status === BookingStatus.CONFIRMED ? 'success' :
                            status === BookingStatus.PENDING ? 'warning' :
                                status === BookingStatus.CHECKED_IN ? 'info' : 'danger'
                }>
                    {status.replace('_', ' ')}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Details
                        </DropdownMenuItem>
                        {booking.status === BookingStatus.PENDING && (
                            <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" /> Confirm
                            </DropdownMenuItem>
                        )}
                        {(booking.status === BookingStatus.PENDING || booking.status === BookingStatus.CONFIRMED) && (
                            <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" /> Cancel
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];
