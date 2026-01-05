'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Clock,
    Calendar,
    CheckCircle2,
    CalendarDays,
    ArrowRightLeft,
    LogOut,
    Coffee,
    ChevronLeft,
    ChevronRight,
    MapPin
} from 'lucide-react';

export default function VenueStaffSchedule() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Lịch làm việc của tôi
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Quản lý ca làm và thực hiện điểm danh.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="shadow-sm">
                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                        Đổi ca làm
                    </Button>
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Xin nghỉ phép
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Shift Card */}
                <Card className="lg:col-span-1 border-none shadow-lg dark:bg-gray-900/50 bg-gradient-to-br from-primary-600/5 to-transparent border-t-4 border-t-primary-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary-600" />
                            Ca làm hiện tại
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center py-6">
                            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-widest">14:55:00</h3>
                            <p className="text-sm text-gray-500 mt-2">Thứ Hai, 15 Tháng 4</p>
                        </div>

                        <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Ca sáng:</span>
                                <span className="font-bold">08:00 - 16:00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Địa điểm:</span>
                                <span className="font-bold flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Sân vận động ABC</span>
                            </div>
                            <div className="pt-4 border-t flex flex-col gap-3">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-xs text-gray-400 uppercase font-black">GIỜ VÀO CA</span>
                                    <Badge variant="success" className="bg-green-100 text-green-700">07:55 AM</Badge>
                                </div>
                                <Button className="w-full bg-red-600 hover:bg-red-700 h-12 rounded-xl">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    KẾT THÚC CA LÀM
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-1">
                                <Coffee className="h-4 w-4" /> Nghỉ giải lao
                            </div>
                            <p className="text-xs text-amber-600/80">Bạn còn 30 phút nghỉ chưa sử dụng trong ca này.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-800 pb-6">
                            <CardTitle>Lịch tuần này</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronLeft className="h-4 w-4" /></Button>
                                <span className="text-sm font-bold">Tháng 4, 15 - 21</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y dark:divide-gray-800">
                                {[
                                    { day: 'Thứ Hai', date: '15/04', shift: '08:00 - 16:00', type: 'Ca Sáng', status: 'In' },
                                    { day: 'Thứ Ba', date: '16/04', shift: '08:00 - 16:00', type: 'Ca Sáng', status: 'Next' },
                                    { day: 'Thứ Tư', date: '17/04', shift: '16:00 - 23:00', type: 'Ca Tối', status: 'Next' },
                                    { day: 'Thứ Năm', date: '18/04', shift: 'OFF', type: 'Nghỉ', status: 'Off' },
                                    { day: 'Thứ Sáu', date: '19/04', shift: '08:00 - 16:00', type: 'Ca Sáng', status: 'Next' },
                                    { day: 'Thứ Bảy', date: '20/04', shift: '08:00 - 23:00', type: 'Full Day', status: 'Next' },
                                    { day: 'Chủ Nhật', date: '21/04', shift: '16:00 - 23:00', type: 'Ca Tối', status: 'Next' },
                                ].map((item, idx) => (
                                    <div key={idx} className={cn(
                                        "flex items-center justify-between p-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                                        item.status === 'In' && "bg-primary-50/50 dark:bg-primary-900/10"
                                    )}>
                                        <div className="flex items-center gap-8">
                                            <div className="w-20">
                                                <p className="font-bold text-gray-900 dark:text-white">{item.day}</p>
                                                <p className="text-xs text-gray-400">{item.date}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-bold text-primary-600 text-sm">{item.shift}</p>
                                                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{item.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {item.status === 'In' ? (
                                                <Badge className="bg-green-100 text-green-700 border-none shadow-sm">ĐANG LÀM</Badge>
                                            ) : item.status === 'Off' ? (
                                                <Badge variant="secondary" className="bg-gray-100 text-gray-500">NGHỈ</Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-gray-200 text-gray-400 font-medium">CHƯA TỚI</Badge>
                                            )}
                                            <Button variant="ghost" size="icon" className="text-gray-300"><ChevronRight className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
