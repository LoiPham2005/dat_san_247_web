'use client';

import {
    Download,
    TrendingUp,
    Wallet,
    CreditCard,
    PieChart,
    ArrowUpRight,
    ArrowDownLeft,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { Badge } from "@/components/ui/badge";

export default function OwnerRevenuePage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Revenue & Finance
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Track earnings, monitor payouts, and analyze financial performance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" /> Reports
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value="42,500,000đ"
                    trend="+12.5% this month"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Received Amount"
                    value="38,200,000đ"
                    trend="Safe in wallet"
                    icon={Wallet}
                />
                <StatsCard
                    title="Pending Payout"
                    value="4,300,000đ"
                    trend="Next cycle: Mon"
                    icon={CreditCard}
                />
                <StatsCard
                    title="Platform Fees (15%)"
                    value="6,375,000đ"
                    trend="Auto-deducted"
                    trendUp={false}
                    icon={PieChart}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Revenue Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white">Revenue Growth</h3>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="h-2 w-2 rounded-full bg-primary-500" /> Current
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="h-2 w-2 rounded-full bg-gray-300" /> Previous
                            </span>
                        </div>
                    </div>
                    <div className="h-[300px] flex items-end justify-between gap-4 pt-8">
                        {[40, 65, 55, 80, 70, 95, 85, 60, 75, 50, 90, 100].map((h, i) => (
                            <div key={i} className="group relative flex-1 flex flex-col justify-end h-full">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="w-full bg-primary-100 rounded-t-sm group-hover:bg-primary-500 transition-colors relative"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {h * 100}k
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${i % 2 === 0 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {i % 2 === 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{i % 2 === 0 ? 'Payout Received' : 'Booking Payment'}</p>
                                        <p className="text-[10px] text-gray-500">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${i % 2 === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                        {i % 2 === 0 ? '+' : '+'}{i * 150}k
                                    </p>
                                    <Badge variant="outline" className="text-[9px] border-none px-0 text-gray-400">SUCCESS</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-6 text-sm">View All History</Button>
                </div>
            </div>

            {/* Breakdown by Venue */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">Revenue by Venue</h3>
                <div className="space-y-4">
                    {[
                        { name: 'Sân bóng đá Mini 247', val: 65, color: 'bg-primary-500' },
                        { name: 'Sân Tennis Vàng', val: 35, color: 'bg-orange-500' }
                    ].map((v) => (
                        <div key={v.name} className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span>{v.name}</span>
                                <span>{v.val}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${v.color}`} style={{ width: `${v.val}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
