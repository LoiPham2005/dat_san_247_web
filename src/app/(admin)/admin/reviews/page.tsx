'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Star,
    CheckCircle2,
    XCircle,
    EyeOff,
    Filter,
    Search,
    MessageSquareQuote
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { MOCK_REVIEWS } from "@/lib/constants/mock-data";

export default function ReviewsPage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Reviews & Feedback
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Monitor user reviews, handle complaints, and manage platform reputation.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button>Export Feedback</Button>
                </div>
            </div>

            {/* Rating Overview */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="p-8 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">4.8</div>
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        {[1, 2, 3, 4].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                        <Star className="h-4 w-4" />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Average Platform Rating</p>
                    <p className="text-[10px] text-green-500 mt-1 uppercase font-black">+2.4% from Feb</p>
                </div>
                <div className="md:col-span-2 p-8 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                    <h3 className="text-sm font-bold mb-6">Review Breakdown</h3>
                    <div className="space-y-4">
                        <RatingBar stars={5} percentage={80} count={1240} />
                        <RatingBar stars={4} percentage={12} count={186} />
                        <RatingBar stars={3} percentage={5} count={78} />
                        <RatingBar stars={2} percentage={2} count={31} />
                        <RatingBar stars={1} percentage={1} count={12} />
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={MOCK_REVIEWS}
                        searchKey="customer"
                        filterColumn="status"
                        filterOptions={[
                            { label: 'Published', value: 'PUBLISHED' },
                            { label: 'Pending', value: 'PENDING' },
                            { label: 'Hidden', value: 'HIDDEN' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-semibold">{row.original.customer}</span>
                <span className="text-[10px] text-gray-400">{row.original.venue}</span>
            </div>
        )
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
            <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(row.original.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                ))}
            </div>
        )
    },
    {
        accessorKey: "comment",
        header: "Review Content",
        cell: ({ row }) => (
            <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[300px] truncate-2-lines italic">
                "{row.original.comment}"
            </p>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={
                    status === 'PUBLISHED' ? 'success' :
                        status === 'PENDING' ? 'warning' : 'outline'
                }>
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => <span className="text-[11px] text-gray-500">{new Date(row.original.createdAt).toLocaleDateString('vi-VN')}</span>
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
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" /> Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <EyeOff className="mr-2 h-4 w-4 text-orange-600" /> Hide Review
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4 text-red-600" /> Delete Forever
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
];

function RatingBar({ stars, percentage, count }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 w-12">
                <span className="text-xs font-bold">{stars}</span>
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            </div>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full dark:bg-gray-800 overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
            </div>
            <span className="text-[10px] text-gray-400 w-10 text-right">{count}</span>
        </div>
    )
}
