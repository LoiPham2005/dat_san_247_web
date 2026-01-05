'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MapPin,
    AlertCircle,
    CheckCircle2,
    Wrench,
    Clock,
    Camera,
    ChevronRight,
    Tag,
    Info,
    PlayCircle
} from 'lucide-react';

export default function VenueStaffVenues() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sân được gán của tôi
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Quản lý trạng thái và báo cáo sự cố cho sân bạn đang phục trách.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Info className="mr-2 h-4 w-4" />
                        Hướng dẫn vận hành
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                    { name: 'Sân bóng Cỏ nhân tạo 1', type: 'Sân 7 người', status: 'In Use', price: '250k - 400k/giờ', img: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&h=240&fit=crop' },
                    { name: 'Sân bóng Cỏ nhân tạo 2', type: 'Sân 7 người', status: 'Empty', price: '250k - 400k/giờ', img: 'https://images.unsplash.com/photo-1526232761682-d76e53c130e9?w=400&h=240&fit=crop' },
                ].map((venue, idx) => (
                    <Card key={idx} className="border-none shadow-sm dark:bg-gray-900/50 overflow-hidden group">
                        <div className="relative h-56 bg-gray-200">
                            <img src={venue.img} alt={venue.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute top-4 right-4">
                                <Badge className={cn(
                                    "px-3 py-1 text-xs font-bold shadow-lg",
                                    venue.status === 'In Use' ? "bg-primary-600 text-white" : "bg-green-100 text-green-700"
                                )}>
                                    {venue.status === 'In Use' ? 'ĐANG CÓ KHÁCH' : 'SÂN TRỐNG'}
                                </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md border-none">{venue.type}</Badge>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{venue.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1"><MapPin className="h-3.5 w-3.5" /> Khu vực A, Sân vận động ABC</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-400">Giá tham khảo</p>
                                    <p className="text-lg font-bold text-primary-600">{venue.price}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                    <p className="text-xs text-gray-500 font-medium mb-1">TRẠNG THÁI HIỆN TẠI</p>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-2.5 w-2.5 rounded-full animate-pulse", venue.status === 'In Use' ? 'bg-primary-500' : 'bg-green-500')} />
                                        <span className="font-bold text-gray-900 dark:text-white uppercase text-sm tracking-wider">{venue.status === 'In Use' ? 'Bận' : 'Sẵn sàng'}</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                    <p className="text-xs text-gray-500 font-medium mb-1">LỊCH SẮP TỚI</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">17:30 - BK-1025</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button className="flex-1 bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 rounded-xl h-12">
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Cập nhật trạng thái
                                </Button>
                                <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl h-12">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Báo cáo sự cố
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Report Issue Quick Access */}
                <Card className="border-none shadow-sm dark:bg-gray-900/50 lg:col-span-2 border-l-4 border-l-amber-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-amber-600" />
                            Gửi báo cáo sự cố mới
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1 space-y-4">
                                <p className="text-sm text-gray-500">Nếu bạn phát hiện hư hỏng, vấn đề vệ sinh hoặc các sự cố khác, hãy báo cáo ngay cho Owner kèm theo hình ảnh minh chứng.</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                        <span className="text-[10px] uppercase font-bold">Hư hỏng</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl">
                                        <Clock className="h-5 w-5 text-blue-500" />
                                        <span className="text-[10px] uppercase font-bold">Vệ sinh</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span className="text-[10px] uppercase font-bold">An ninh</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl">
                                        <Camera className="h-5 w-5 text-purple-500" />
                                        <span className="text-[10px] uppercase font-bold">Khác</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full md:w-64 h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                                <Camera className="h-8 w-8 mb-2" />
                                <span className="text-xs">Chạm để chụp ảnh</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
