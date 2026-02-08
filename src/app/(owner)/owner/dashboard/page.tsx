'use client';

import { useAuthStore } from "@/lib/store/auth.store";
import {
    DollarSign,
    Calendar,
    TrendingUp,
    Star,
    Plus,
    UserPlus,
    Clock,
    Activity
} from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";

export default function OwnerDashboardPage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Chào mừng trở lại, {user?.fullName || 'Chủ sân'}!
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Dưới đây là tình hình hoạt động của các sân hôm nay.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Staff
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Plus className="mr-2 h-4 w-4" />
                        New Booking
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Today's Revenue"
                    value="1,200,000đ"
                    trend="+10.5% from yesterday"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Pending Bookings"
                    value="5"
                    trend="Requires attention"
                    icon={Clock}
                    trendUp={false}
                />
                <StatsCard
                    title="Occupancy Rate"
                    value="68.5%"
                    trend="+5.2% this week"
                    icon={Activity}
                />
                <StatsCard
                    title="Avg Rating"
                    value="4.8"
                    trend="Top Rated Venue"
                    icon={Star}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Revenue Chart Section */}
                <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Revenue Trends</h3>
                        <select className="text-sm bg-transparent border-none text-gray-500 focus:ring-0 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <RevenueChart />
                </div>

                {/* Upcoming Schedule / Notifications */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                            Upcoming Bookings
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                                    <div className="h-10 w-10 rounded-lg bg-primary-100 text-primary-600 flex flex-col items-center justify-center font-bold text-xs dark:bg-primary-900/30">
                                        <span>20</span>
                                        <span className="text-[8px] uppercase">Mar</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">Soccer Field A</p>
                                        <p className="text-xs text-gray-500">18:00 - 19:30 • Nguyen Van A</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-xs">View Full Schedule</Button>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 shadow-lg shadow-primary-500/20 text-white">
                        <h3 className="font-bold mb-2">Pro Tip</h3>
                        <p className="text-sm text-primary-100 mb-4">
                            Enable "Happy Hour" pricing for Tuesdays to increase booking rate by ~25%.
                        </p>
                        <Button size="sm" variant="outline" className="w-full bg-white text-primary-600 hover:bg-gray-50 border-none">
                            Configure Pricing
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
