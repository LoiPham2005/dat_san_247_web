'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Copy, Send } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export type Promotion = {
    id: string;
    name: string;
    code: string;
    type: 'PERCENTAGE' | 'FIXED_AMOUNT';
    value: number;
    status: 'ACTIVE' | 'EXPIRED' | 'DEACTIVATED';
    usageLimit: number;
    usedCount: number;
    expiry: string;
}

export const columns: ColumnDef<Promotion>[] = [
    {
        accessorKey: "name",
        header: "Promotion Name",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider">{row.original.code}</span>
                <span className="text-xs text-gray-500">{row.original.name}</span>
            </div>
        )
    },
    {
        accessorKey: "value",
        header: "Discount",
        cell: ({ row }) => {
            const promo = row.original;
            return (
                <span className="font-bold text-primary-600">
                    {promo.type === 'PERCENTAGE' ? `${promo.value}%` : `${promo.value.toLocaleString()}đ`}
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant={
                    status === 'ACTIVE' ? 'success' :
                        status === 'EXPIRED' ? 'danger' : 'warning'
                }>
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "usage",
        header: "Usage",
        cell: ({ row }) => {
            const promo = row.original;
            const percentage = (promo.usedCount / promo.usageLimit) * 100;
            return (
                <div className="w-32 space-y-1">
                    <div className="flex justify-between text-[10px]">
                        <span>{promo.usedCount}/{promo.usageLimit}</span>
                        <span>{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
                        <div
                            className={`h-full rounded-full ${percentage > 90 ? 'bg-red-500' : 'bg-primary-500'}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "expiry",
        header: "Expiry Date",
        cell: ({ row }) => <span className="text-sm">{row.original.expiry}</span>
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
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" /> Send to Users
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4 text-red-600" /> <span className="text-red-600">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
];
