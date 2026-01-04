'use client';

import {
    Download,
    Calendar,
    TrendingUp,
    Users,
    MapPin,
    LucideIcon,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { cn } from "@/lib/utils/format";

export default function ReportsPage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Reports & Analytics
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Deep dive into platform growth, performance, and user behavior.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" /> Mar 2024
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Export Data
                    </Button>
                </div>
            </div>

            {/* High Level Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="User Growth"
                    value="+12.4%"
                    trend="+2.1% from Feb"
                    icon={Users}
                />
                <StatsCard
                    title="Retention Rate"
                    value="68.5%"
                    trend="+5.2% from Feb"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Avg. Booking Value"
                    value="340K"
                    trend="-1.2% from Feb"
                    trendUp={false}
                    icon={Activity}
                />
                <StatsCard
                    title="Venue Utilization"
                    value="42.8%"
                    trend="+8.1% from Feb"
                    icon={BarChart3}
                />
            </div>

            {/* Performance Grids */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Performers */}
                <div className="p-8 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary-600" />
                            Top Performing Venues
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-gray-300 w-4">#{i}</span>
                                    <div className="h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-800" />
                                    <span className="text-sm font-medium">Sân bóng {i}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-bold">${12000 - i * 1000}</p>
                                        <p className="text-[10px] text-green-500 uppercase font-black">Success</p>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Segmentation */}
                <div className="p-8 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            User Segmentation
                        </h3>
                        <Button variant="ghost" size="sm" className="text-xs">Details</Button>
                    </div>
                    <div className="space-y-8">
                        <SegmentRow label="VIP Customers" val="15%" color="bg-primary-500" />
                        <SegmentRow label="New Users" val="35%" color="bg-blue-500" />
                        <SegmentRow label="Regulars" val="40%" color="bg-orange-500" />
                        <SegmentRow label="Churned" val="10%" color="bg-red-500" />
                    </div>
                    <div className="mt-10 p-4 bg-blue-50/50 rounded-xl border border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/20">
                        <p className="text-xs text-blue-800 dark:text-blue-300">
                            <strong>Insight:</strong> Your new user conversion is up by 15% due to the "WELCOME24" campaign.
                        </p>
                    </div>
                </div>
            </div>

            {/* Peak Hours Heatmap Mockup */}
            <div className="p-8 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                <h3 className="font-bold mb-8">Peak Usage Hours (Weekly)</h3>
                <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                        <div key={day} className="space-y-2">
                            <p className="text-[10px] text-center text-gray-400 font-bold mb-2">{day}</p>
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-10 w-full rounded-md transition-all duration-500 hover:scale-110 cursor-pointer",
                                        Math.random() > 0.8 ? "bg-primary-600" :
                                            Math.random() > 0.5 ? "bg-primary-400" :
                                                Math.random() > 0.2 ? "bg-primary-200" : "bg-gray-50 dark:bg-gray-800"
                                    )}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase">
                    <span>Low</span>
                    <div className="flex gap-1">
                        <div className="h-3 w-3 rounded bg-gray-50 dark:bg-gray-800" />
                        <div className="h-3 w-3 rounded bg-primary-100" />
                        <div className="h-3 w-3 rounded bg-primary-200" />
                        <div className="h-3 w-3 rounded bg-primary-400" />
                        <div className="h-3 w-3 rounded bg-primary-600" />
                    </div>
                    <span>Peak</span>
                </div>
            </div>
        </div>
    );
}

function SegmentRow({ label, val, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
                <span>{label}</span>
                <span>{val}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full dark:bg-gray-800 overflow-hidden">
                <div className={cn("h-full", color)} style={{ width: val }} />
            </div>
        </div>
    )
}
