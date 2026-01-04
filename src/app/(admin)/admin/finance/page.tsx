'use client';

import { StatsCard } from "@/components/ui/stats-card";
import {
    DollarSign,
    CreditCard,
    TrendingUp,
    ArrowDownLeft,
    ArrowUpRight,
    Wallet,
    PieChart,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinancePage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Financial Overview
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Track revenue, payouts, and system commission.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Statement</Button>
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        Process Payouts
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Net Revenue"
                    value="$128,430.00"
                    trend="+12.5% from last week"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Commission (15%)"
                    value="$19,264.50"
                    trend="+15.2% from last week"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Pending Payouts"
                    value="$3,400.00"
                    description="12 owners waiting"
                    icon={Wallet}
                    trendUp={false}
                />
                <StatsCard
                    title="Processing Fees"
                    value="$1,240.00"
                    trend="+2.1% from last week"
                    icon={CreditCard}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <h3 className="font-bold mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={i % 2 === 0 ? "p-2 bg-green-100 text-green-600 rounded-lg" : "p-2 bg-blue-100 text-blue-600 rounded-lg"}>
                                        {i % 2 === 0 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{i % 2 === 0 ? 'Booking Payment' : 'Owner Payout'}</p>
                                        <p className="text-xs text-gray-500">March 2{i}, 2024 • #TRX-9402</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${i % 2 === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                                        {i % 2 === 0 ? '+' : '-'}${i * 120}.00
                                    </p>
                                    <p className="text-[10px] text-gray-400 uppercase font-black">Success</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-primary-600">
                        View Full History <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <h3 className="font-bold mb-6">Revenue by Sport</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Soccer</span>
                                <span className="font-bold">65%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-500 w-[65%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Tennis</span>
                                <span className="font-bold">20%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[20%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Badminton</span>
                                <span className="font-bold">10%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[10%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Others</span>
                                <span className="font-bold">5%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-300 w-[5%]" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20">
                        <p className="text-xs text-primary-800 dark:text-primary-300">
                            <strong>Tip:</strong> Soccer venues generate most of your fees. Consider expanding more soccer partnerships.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
