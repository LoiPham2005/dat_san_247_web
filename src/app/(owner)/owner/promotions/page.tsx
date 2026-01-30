'use client';

import { MOCK_PROMOTIONS } from "@/lib/constants/mock-data";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Ticket, Zap, Clock, Calendar, BarChart3, Copy, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { useOwnerPromotions } from '@/lib/hooks/useOwnerPromotions';
import { PromotionModal } from '@/components/owner/PromotionModal';
import { Input } from '@/components/ui/input';
import { RotateCcw } from 'lucide-react';
import { Promotion, DiscountType } from '@/types/promotion.types';

export default function OwnerPromotionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        promotions,
        isLoading,
        isFetching,
        refetch,
        deletePromotion
    } = useOwnerPromotions({
        search: searchTerm
    });

    const columns: ColumnDef<Promotion>[] = [
        {
            accessorKey: "name",
            header: "Promotion Name",
            cell: ({ row }) => (
                <div>
                    <p className="font-semibold text-sm">{row.original.name}</p>
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 dark:bg-gray-800 font-mono">{row.original.code}</code>
                </div>
            )
        },
        {
            accessorKey: "discount",
            header: "Discount",
            cell: ({ row }) => {
                const isPercent = row.original.discountType === DiscountType.PERCENTAGE;
                return (
                    <div className="font-bold text-sm">
                        {isPercent ? `${row.original.discountValue}% OFF` : `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.original.discountValue)} OFF`}
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant={row.original.status === 'ACTIVE' ? 'success' : 'secondary'}>
                    {row.original.status}
                </Badge>
            )
        },
        {
            accessorKey: "usage",
            header: "Usage",
            cell: ({ row }) => {
                const used = row.original.usageCount || 0;
                const limit = row.original.usageLimit || 0;
                const percent = limit > 0 ? (used / limit) * 100 : 0;
                return (
                    <div className="w-[120px] space-y-1">
                        <div className="flex justify-between text-[10px] text-gray-500">
                            <span>{used} used</span>
                            <span>{limit} total</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min(percent, 100)}%` }} />
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "expiry",
            header: "Expires",
            cell: ({ row }) => <span className="text-xs text-gray-500">{new Date(row.original.validTo).toLocaleDateString()}</span>
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
                        <DropdownMenuItem onClick={() => {
                            navigator.clipboard.writeText(row.original.code);
                        }}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this promotion?')) {
                                    deletePromotion(row.original.id);
                                }
                            }}
                        >
                            Delete Promotion
                        </DropdownMenuItem>
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
                        My Promotions
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Boost occupancy with vouchers, flash sales, and happy hour deals.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <BarChart3 className="mr-2 h-4 w-4" /> Performance
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Deal
                    </Button>
                </div>
            </div>

            <PromotionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Promo Types Quick View */}
            <div className="grid gap-6 md:grid-cols-4">
                <PromoTypeCard title="Flash Sales" icon={Zap} count={promotions.filter((p: any) => p.discountType === DiscountType.PERCENTAGE && p.discountValue > 50).length} active color="bg-orange-500" />
                <PromoTypeCard title="Happy Hour" icon={Clock} count={promotions.filter((p: any) => p.name.toLowerCase().includes('happy hour')).length} active color="bg-blue-500" />
                <PromoTypeCard title="Member Deals" icon={UsersIcon} count={promotions.filter((p: any) => p.description?.toLowerCase().includes('member')).length} color="bg-purple-500" />
                <PromoTypeCard title="Vouchers" icon={Ticket} count={promotions.length} active color="bg-green-500" />
            </div>

            <div className="flex gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Input
                        placeholder="Search by code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-4"
                    />
                </div>
                <Button variant="ghost" size="icon" onClick={() => refetch()}>
                    <RotateCcw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={promotions}
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}


function PromoTypeCard({ title, icon: Icon, count, active, color }: any) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 group transition-all hover:border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl text-white ${color} shadow-lg shadow-${color.replace('bg-', '')}/20`}>
                    <Icon className="h-5 w-5" />
                </div>
                {active && <span className="flex h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-500/10" />}
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
                <p className="text-2xl font-black mt-1">{count}</p>
                <p className="text-[10px] text-gray-400 uppercase mt-1">Active Programs</p>
            </div>
        </div>
    )
}

function UsersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
