'use client';

import {
    BarChart3,
    TrendingUp,
    ArrowUpRight,
    Users,
    Calendar,
    Clock,
    MapPin,
    ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";

export default function OwnerAnalyticsPage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Performance Analytics
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Deep dive into your business metrics and growth trends.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-primary-500 focus:outline-none dark:bg-gray-900 dark:border-gray-800">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                    </select>
                    <Button variant="outline">
                        <BarChart3 className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>
            </div>

            {/* KPI Overview */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Gross Revenue"
                    value="150.2M"
                    trend="+12% vs last month"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Total Bookings"
                    value="1,245"
                    trend="+5% vs last month"
                    icon={Calendar}
                />
                <StatsCard
                    title="New Customers"
                    value="320"
                    trend="+18% vs last month"
                    icon={Users}
                />
                <StatsCard
                    title="Avg. Booking Value"
                    value="120K"
                    trend="-2% vs last month"
                    trendUp={false}
                    icon={ArrowUpRight}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Revenue Trend */}
                <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold flex items-center gap-2 mb-8">
                        <TrendingUp className="h-5 w-5 text-primary-600" />
                        Revenue Trend (Last 6 Months)
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[40, 50, 45, 60, 80, 75].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-primary-100 rounded-lg h-full relative overflow-hidden group-hover:bg-primary-500 transition-all duration-500">
                                    <div
                                        className="absolute bottom-0 w-full bg-primary-500 group-hover:bg-primary-600 transition-all duration-500"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                                <span className="text-[10px] uppercase font-bold text-gray-400">M{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Acquisition */}
                <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold flex items-center gap-2 mb-8">
                        <Users className="h-5 w-5 text-blue-600" />
                        Customer Mix
                    </h3>
                    <div className="flex items-center justify-center h-64 relative">
                        {/* Pie Chart Mockup */}
                        <div className="h-48 w-48 rounded-full border-[16px] border-primary-500 border-r-blue-500 border-b-orange-500 rotate-45 shadow-xl shadow-primary-500/10"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black">1.2K</span>
                            <span className="text-xs text-gray-500">Total Users</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary-500" />
                            <span className="text-xs text-gray-600 font-bold">Returning (60%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                            <span className="text-xs text-gray-600 font-bold">New (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500" />
                            <span className="text-xs text-gray-600 font-bold">Churned (15%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Heatmap & Peak Hours */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        Peak Hours Analysis
                    </h3>
                    <div className="grid grid-cols-12 gap-1 h-32">
                        {[...Array(24)].map((_, i) => (
                            <div
                                key={i}
                                className={`rounded bg-purple-500 hover:scale-110 transition-transform cursor-pointer opacity-${Math.random() > 0.5 ? '100' : Math.random() > 0.3 ? '60' : '30'}`}
                                title={`${i}:00 - ${Math.floor(Math.random() * 10)} bookings`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>23:00</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-6">
                        <strong>Insight:</strong> Your busiest hours are <strong>18:00 - 21:00</strong> on Weekdays. Consider increasing prices during this window.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                    <h3 className="font-bold text-lg mb-2">Venue Rankings</h3>
                    <p className="text-primary-100 text-sm mb-6">Top performing facilities by revenue.</p>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xl font-bold opacity-50">0{i}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">Sân Bóng {i}</p>
                                    <div className="h-1.5 w-full bg-white/20 rounded-full mt-1">
                                        <div className="h-full bg-white rounded-full" style={{ width: `${80 - i * 10}%` }} />
                                    </div>
                                </div>
                                <span className="text-sm font-bold">{80 - i * 10}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
