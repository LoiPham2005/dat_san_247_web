'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from "@/components/ui/stats-card";
import {
    Calendar,
    Clock,
    CheckCircle2,
    QrCode,
    Plus,
    Bell,
    User,
    ChevronRight,
    MapPin,
    AlertCircle
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';

export default function VenueStaffDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Chào ngày mới, {user?.name?.split(' ')[0] || 'Staff'}!
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Hôm nay bạn có 12 booking tại 2 sân được gán.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="shadow-sm border-gray-200">
                        <Calendar className="mr-2 h-4 w-4" />
                        Lịch làm việc
                    </Button>
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <QrCode className="mr-2 h-4 w-4" />
                        Quick Check-in
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Ca làm việc hôm nay"
                    value="08:00 - 16:00"
                    description="Sân Bóng A & B"
                    icon={Clock}
                    className="border-blue-100 dark:border-blue-900/30"
                />
                <StatsCard
                    title="Booking chờ xử lý"
                    value="5"
                    description="Trong 2 giờ tới"
                    icon={Calendar}
                    className="border-orange-100 dark:border-orange-900/30"
                />
                <StatsCard
                    title="Đã Check-in"
                    value="7 / 12"
                    trend="+2 vừa tới"
                    trendUp={true}
                    icon={CheckCircle2}
                    className="border-green-100 dark:border-green-900/30"
                />
                <StatsCard
                    title="Nhiệm vụ cần làm"
                    value="3"
                    description="Kiểm tra lưới, Vệ sinh sân"
                    icon={AlertCircle}
                    className="border-red-100 dark:border-red-900/30"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Bookings */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Booking sắp tới</CardTitle>
                            <Button variant="ghost" size="sm" className="text-primary-600 font-bold">Xem tất cả</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { id: 'BK-1024', time: '14:00 - 15:30', user: 'Hoàng Minh', field: 'Sân 1 - Sân Cỏ Nhân Tạo', status: 'Confirmed' },
                                    { id: 'BK-1025', time: '15:00 - 16:00', user: 'Lê Tuấn', field: 'Sân 2 - Sân Cỏ Nhân Tạo', status: 'Pending' },
                                    { id: 'BK-1026', time: '16:00 - 18:00', user: 'Nguyễn Nam', field: 'Sân 1 - Sân Cỏ Nhân Tạo', status: 'Confirmed' },
                                ].map((booking, i) => (
                                    <div key={i} className="group flex items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex flex-col items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xs">
                                                <span>PM</span>
                                                <span className="text-sm">14:00</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-gray-900 dark:text-white">{booking.user}</p>
                                                    <Badge variant="outline" className="text-[10px] py-0">{booking.id}</Badge>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.field}</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button size="sm" className="bg-primary-600 hover:bg-primary-700 h-9 rounded-xl px-4">Check-in</Button>
                                            <Button variant="ghost" size="icon" className="rounded-full"><ChevronRight className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm dark:bg-gray-900/50 p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white relative overflow-hidden group cursor-pointer">
                            <div className="relative z-10">
                                <Plus className="h-8 w-8 mb-4" />
                                <h3 className="font-bold text-xl">Walk-in Booking</h3>
                                <p className="text-primary-100 text-sm mt-2">Dành cho khách đến trực tiếp tại sân chưa đặt trước.</p>
                            </div>
                            <Plus className="absolute bottom-[-10%] right-[-5%] h-32 w-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                        </Card>
                        <Card className="border-none shadow-sm dark:bg-gray-900/50 p-6 bg-slate-900 text-white relative overflow-hidden group cursor-pointer">
                            <div className="relative z-10">
                                <QrCode className="h-8 w-8 mb-4" />
                                <h3 className="font-bold text-xl">Scan QR Code</h3>
                                <p className="text-slate-400 text-sm mt-2">Quét mã của khách để thực hiện check-in nhanh.</p>
                            </div>
                            <QrCode className="absolute bottom-[-10%] right-[-5%] h-32 w-32 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                        </Card>
                    </div>
                </div>

                {/* Task & Team status Sidebar */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Nhiệm vụ hôm nay</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { title: 'Kiểm tra lưới sân 1', done: true },
                                { title: 'Vệ sinh khu dịch vụ', done: false },
                                { title: 'Báo cáo dụng cụ hỏng', done: false },
                            ].map((task, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${task.done ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                                        {task.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-300'}`}>
                                        {task.title}
                                    </span>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-xs text-gray-500">Thêm nhiệm vụ mới +</Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Thông báo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex gap-3">
                                        <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                                            <Bell className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">Lịch bảo trì sân 2</p>
                                            <p className="text-xs text-gray-500 mt-1">Sân 2 sẽ đóng cửa lúc 22h hôm nay để bảo trì đèn.</p>
                                            <p className="text-[10px] text-gray-400 mt-2">12:30 PM • Từ Owner</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
