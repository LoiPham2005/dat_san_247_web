'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from "@/components/ui/stats-card";
import {
    BarChart3,
    CheckCircle2,
    Clock,
    Star,
    AlertCircle,
    TrendingUp,
    Download,
    Calendar,
    ChevronDown,
    ArrowUpRight
} from 'lucide-react';

export default function VenueStaffReports() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Báo cáo Hiệu quả Ca làm
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Theo dõi năng suất và chất lượng phục vụ của bạn.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Calendar className="mr-2 h-4 w-4" />
                        Tháng này
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Download className="mr-2 h-4 w-4" />
                        Tải báo cáo
                    </Button>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Booking đã xử lý"
                    value="142"
                    trend="+12% so với tháng trước"
                    trendUp={true}
                    icon={CheckCircle2}
                    className="border-blue-100 dark:border-blue-900/30"
                />
                <StatsCard
                    title="Độ chính xác Check-in"
                    value="98.5%"
                    trend="Vượt mục tiêu 95%"
                    trendUp={true}
                    icon={TrendingUp}
                    className="border-green-100 dark:border-green-900/30"
                />
                <StatsCard
                    title="Sự cố đã báo cáo"
                    value="12"
                    description="8 đã được xử lý"
                    icon={AlertCircle}
                    className="border-amber-100 dark:border-amber-900/30"
                />
                <StatsCard
                    title="Đánh giá từ khách"
                    value="4.8/5"
                    trend="+0.2 từ tuần trước"
                    trendUp={true}
                    icon={Star}
                    className="border-purple-100 dark:border-purple-900/30"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Feedback */}
                <Card className="border-none shadow-sm dark:bg-gray-900/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Phản hồi gần đây từ khách</CardTitle>
                        <Button variant="ghost" size="sm" className="text-primary-600">Xem tất cả</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { user: 'Tuấn Anh', rate: 5, comment: 'Nhân viên nhiệt tình, check-in nhanh gọn.', time: '2 giờ trước' },
                            { user: 'Minh Hoàng', rate: 4, comment: 'Sân cỏ đẹp, nhân viên hướng dẫn chu đáo.', time: 'Hôm qua' },
                            { user: 'Quốc Bảo', rate: 5, comment: 'Rất hài lòng với thái độ của bạn staff.', time: 'Hôm qua' },
                        ].map((f, i) => (
                            <div key={i} className="p-4 border rounded-2xl border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                                            {f.user.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm">{f.user}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className={cn("h-3 w-3", s <= f.rate ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{f.comment}"</p>
                                <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-wider">{f.time}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Performance Chart / Breakdown */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50 p-6">
                        <h3 className="font-bold text-lg mb-6">Thống kê ca làm (Tháng 4)</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Tổng số giờ làm', value: '160 giờ', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { label: 'Đúng giờ', value: '96%', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
                                { label: 'Ca làm ngoài giờ', value: '4 ca', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", s.bg, "dark:bg-opacity-10")}>
                                            <s.icon className={cn("h-5 w-5", s.color)} />
                                        </div>
                                        <span className="font-medium text-gray-500 dark:text-gray-400">{s.label}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white">{s.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t dark:border-gray-800">
                            <div className="p-4 bg-primary-600 rounded-2xl text-white relative overflow-hidden group">
                                <p className="text-xs text-primary-100 font-bold uppercase tracking-widest mb-1">Thưởng hiệu năng dự kiến</p>
                                <p className="text-2xl font-black">1,500,000 VND</p>
                                <ArrowUpRight className="absolute top-4 right-4 h-6 w-6 text-white/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
