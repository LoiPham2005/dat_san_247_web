'use client';

import { useAuthStore } from "@/lib/store/auth.store";
import {
    Users,
    DollarSign,
    Calendar,
    TrendingUp,
    Activity,
    CreditCard,
    ArrowUpRight,
    PieChart
} from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { RecentActivities } from "@/components/admin/dashboard/RecentActivities";
import { Button } from "@/components/ui/button";
import { useAdminDashboard } from "@/lib/hooks/useDashboard";
import { useDashboardStore } from "@/lib/store/dashboard.store";
import { formatCurrency } from "@/lib/utils/format";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuthStore();
    const { isLoading } = useAdminDashboard();
    const { adminStats } = useDashboardStore();

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Overview of your system performance and activities.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 7 Days
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
                    ))
                ) : (
                    <>
                        <StatsCard
                            title="Total Revenue"
                            value={formatCurrency(adminStats?.totalRevenue || 0)}
                            trend="+20.1% from last month"
                            icon={DollarSign}
                        />
                        <StatsCard
                            title="Active Bookings"
                            value={adminStats?.activeBookings?.toLocaleString() || "0"}
                            trend="+180.1% from last month"
                            icon={Calendar}
                        />
                        <StatsCard
                            title="Active Users"
                            value={adminStats?.activeUsers?.toLocaleString() || "0"}
                            trend="+19% from last month"
                            icon={Users}
                        />
                        <StatsCard
                            title="Live Sessions"
                            value={adminStats?.liveSessions?.toLocaleString() || "0"}
                            trend="+201 since last hour"
                            icon={Activity}
                        />
                    </>
                )}
            </div>

            {/* Main Chart - Full Width for better visibility */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
                        <p className="text-sm text-gray-500">Real-time revenue tracking across all venues</p>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-xl">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary-500"></span> Current Week
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                            <span className="h-2.5 w-2.5 rounded-full bg-gray-300"></span> Previous Week
                        </div>
                    </div>
                </div>
                <div className="h-[450px] w-full">
                    <RevenueChart />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-6">
                {/* Recent Activity */}
                <div className="col-span-1 lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                            <p className="text-sm text-gray-500">Real-time system updates</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                            View All
                        </Button>
                    </div>
                    <RecentActivities />
                </div>

                {/* Quick Actions in the same row to save space */}
                <div className="col-span-1 lg:col-span-3 grid gap-6">
                    <QuickActionCard
                        title="Pending Venues"
                        value={adminStats?.pendingVenues?.toLocaleString() || "0"}
                        action="Review Requests"
                        description="Venues waiting for approval"
                    />
                    <QuickActionCard
                        title="Support Tickets"
                        value={adminStats?.openTickets?.toLocaleString() || "0"}
                        action="View Tickets"
                        description="High priority tickets open"
                    />
                </div>
            </div>

            {/* Payouts moved to a horizontal strip or integrated */}
            <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white shadow-xl shadow-primary-500/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                            <DollarSign className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-primary-100 text-sm font-medium">Pending Payouts</p>
                            <h3 className="text-4xl font-black mt-1">
                                {isLoading ? "..." : formatCurrency(adminStats?.pendingPayouts || 0)}
                            </h3>
                        </div>
                    </div>
                    <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 font-bold px-8 h-14 rounded-2xl border-none shadow-lg">
                        Process All Payouts
                    </Button>
                </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Venues Table */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Top 10 Venues</h3>
                        <Button variant="ghost" size="sm" className="text-secondary-600 hover:text-secondary-700">View All</Button>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-50 dark:bg-gray-800" />
                            ))
                        ) : (
                            useDashboardStore.getState().topVenues.map((v, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-50 text-xs font-bold text-secondary-600 dark:bg-secondary-900/30">
                                            #{i + 1}
                                        </div>
                                        <span className="text-sm font-medium">{v.venue_name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-primary-600">{formatCurrency(parseFloat(v.totalRevenue))}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* VIP Customers */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Top 10 VIP Customers</h3>
                        <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-50 dark:bg-gray-800" />
                            ))
                        ) : (
                            useDashboardStore.getState().topCustomers.map((c, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.user_fullName)}&background=random`}
                                            alt={c.user_fullName}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{c.user_fullName}</span>
                                            <span className="text-[10px] text-gray-400">{c.user_email}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-blue-600">{c.totalBookings} Đơn</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sport Distribution */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Loại hình thể thao phổ biến</h3>
                        <PieChart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 flex items-center justify-center py-4">
                            <div className="relative h-48 w-48">
                                <svg viewBox="0 0 100 100" className="h-full w-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" />
                                    {/* Simplified visualization logic for 3 main segments if dynamic data isn't easily SVG-able */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#336e37" strokeWidth="20" strokeDasharray="180 251" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="50 251" strokeDashoffset="-180" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold">100%</span>
                                    <span className="text-[10px] text-gray-400 capitalize">Hệ thống</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 flex-[2]">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="h-10 animate-pulse rounded-lg bg-gray-50 dark:bg-gray-800" />
                                ))
                            ) : (
                                useDashboardStore.getState().sportDistribution.map((item, i) => {
                                    const colors = ['bg-primary-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-orange-500'];
                                    const total = useDashboardStore.getState().sportDistribution.reduce((acc, curr) => acc + parseInt(curr.count), 0);
                                    const percent = total > 0 ? Math.round((parseInt(item.count) / total) * 100) : 0;

                                    return (
                                        <LegendItem
                                            key={i}
                                            color={colors[i % colors.length]}
                                            label={item.label}
                                            value={`${percent}%`}
                                            count={item.count}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickActionCard({ title, value, action, description }: any) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Activity className="h-24 w-24" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
            <Button variant="outline" size="sm" className="w-full">
                {action}
            </Button>
        </div>
    );
}

function LegendItem({ color, label, value, count }: any) {
    return (
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-gray-50/50 border border-gray-100 dark:bg-gray-800/30 dark:border-gray-800">
            <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${color} shadow-sm`} />
                <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight">{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-gray-900 dark:text-white">{value}</span>
                <span className="text-[10px] text-gray-400 font-medium">({count})</span>
            </div>
        </div>
    )
}
