'use client';

import { MOCK_PROMOTIONS } from "@/lib/constants/mock-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, Ticket, Zap, Clock, Calendar } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

export default function PromotionsPage() {
    const data = MOCK_PROMOTIONS as any[];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Vouchers & Promotions
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage discount codes, flash sales, and seasonal campaigns.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Campaigns</Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Voucher
                    </Button>
                </div>
            </div>

            {/* Promo Types Quick View */}
            <div className="grid gap-6 md:grid-cols-4">
                <PromoTypeCard title="Flash Sales" icon={Zap} count={2} active color="bg-orange-500" />
                <PromoTypeCard title="Happy Hour" icon={Clock} count={5} active color="bg-blue-500" />
                <PromoTypeCard title="Weekend Deals" icon={Calendar} count={0} color="bg-indigo-500" />
                <PromoTypeCard title="Seasonal" icon={Ticket} count={1} active color="bg-primary-500" />
            </div>

            <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={data}
                        searchKey="name"
                        filterColumn="status"
                        filterOptions={[
                            { label: 'Active', value: 'ACTIVE' },
                            { label: 'Expired', value: 'EXPIRED' },
                            { label: 'Deactivated', value: 'DEACTIVATED' },
                        ]}
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
                <div className={`p-2 rounded-xl text-white ${color}`}>
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
