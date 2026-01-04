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

export default function DashboardPage() {
    const { user } = useAuthStore();

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
                <StatsCard
                    title="Total Revenue"
                    value="$45,231.89"
                    trend="+20.1% from last month"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Active Bookings"
                    value="2,350"
                    trend="+180.1% from last month"
                    icon={Calendar}
                />
                <StatsCard
                    title="Active Users"
                    value="12,234"
                    trend="+19% from last month"
                    icon={Users}
                />
                <StatsCard
                    title="Live Sessions"
                    value="573"
                    trend="+201 since last hour"
                    icon={Activity}
                />
            </div>

            {/* Charts & Activity */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Main Chart */}
                <div className="col-span-1 lg:col-span-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
                            <p className="text-sm text-gray-500">Compare with previous week</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                                <span className="h-2 w-2 rounded-full bg-primary-500"></span> Current
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                                <span className="h-2 w-2 rounded-full bg-gray-300"></span> Previous
                            </div>
                        </div>
                    </div>
                    <RevenueChart />
                </div>

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
            </div>

            {/* Quick Actions Row */}
            <div className="grid gap-6 md:grid-cols-3">
                <QuickActionCard
                    title="Pending Venues"
                    value="12"
                    action="Review Requests"
                    description="Venues waiting for approval"
                />
                <QuickActionCard
                    title="Support Tickets"
                    value="5"
                    action="View Tickets"
                    description="High priority tickets open"
                />
                <QuickActionCard
                    title="Payouts"
                    value="$3,400"
                    action="Process Payouts"
                    description="Pending owner withdrawals"
                />
            </div>

            {/* Additional Analytics */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Venues Table */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Top 5 Venues</h3>
                        <Button variant="ghost" size="sm" className="text-primary-600">View Map</Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Soccer Field A', revenue: '$12,400', bookings: 145 },
                            { name: 'Tennis Tower', revenue: '$9,800', bookings: 89 },
                            { name: 'Badminton Hub', revenue: '$7,200', bookings: 210 },
                            { name: 'Elite Swim', revenue: '$5,400', bookings: 67 },
                            { name: 'Pro Basketball', revenue: '$4,100', bookings: 54 },
                        ].map((v, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                <span className="text-sm font-medium">{v.name}</span>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-primary-600">{v.revenue}</p>
                                    <p className="text-[10px] text-gray-400">{v.bookings} bookings</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sport Distribution */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Sport Distribution</h3>
                        <PieChart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex-1 flex items-center justify-center py-4">
                            {/* Simple SVG Pie Chart Mockup */}
                            <svg viewBox="0 0 100 100" className="h-32 w-32 transform -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4fa553" strokeWidth="20" strokeDasharray="180 251" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="50 251" strokeDashoffset="-180" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="21 251" strokeDashoffset="-230" />
                            </svg>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <LegendItem color="bg-primary-500" label="Soccer" value="60%" />
                            <LegendItem color="bg-blue-500" label="Tennis" value="20%" />
                            <LegendItem color="bg-yellow-500" label="Badminton" value="15%" />
                            <LegendItem color="bg-gray-300" label="Other" value="5%" />
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

function LegendItem({ color, label, value }: any) {
    return (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${color}`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            <span className="text-xs font-bold">{value}</span>
        </div>
    )
}
