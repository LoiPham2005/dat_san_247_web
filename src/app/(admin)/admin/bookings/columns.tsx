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

export type Booking = {
    id: string;
    customer: string;
    venue: string;
    date: string;
    time: string;
    amount: string;
    status: 'COMPLETED' | 'CONFIRMED' | 'CANCELLED';
    payment: 'PAID' | 'PENDING' | 'REFUNDED';
}

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "id",
        header: "Booking ID",
        cell: ({ row }) => <span className="font-mono text-xs font-bold">{row.original.id}</span>
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "venue",
        header: "Venue",
        cell: ({ row }) => <span className="max-w-[150px] truncate block">{row.original.venue}</span>
    },
    {
        accessorKey: "date",
        header: "Date & Time",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium">{row.original.date}</span>
                <span className="text-xs text-gray-500">{row.original.time}</span>
            </div>
        )
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={
                    status === 'COMPLETED' ? 'success' :
                        status === 'CONFIRMED' ? 'info' : 'danger'
                }>
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "payment",
        header: "Payment",
        cell: ({ row }) => {
            const payment = row.original.payment;
            return (
                <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${payment === 'PAID' ? 'bg-green-500' :
                        payment === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                    <span className="text-xs font-medium">{payment}</span>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
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
                        <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <XCircle className="mr-2 h-4 w-4 text-red-600" /> Cancel
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];
