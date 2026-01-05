'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Calendar as CalendarIcon,
    Search,
    Filter,
    Plus,
    QrCode,
    Clock,
    User,
    CheckCircle2,
    XCircle,
    MoreVertical,
    MapPin,
    Smartphone
} from 'lucide-react';

export default function VenueStaffBookings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Quản lý Đơn đặt sân
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Hôm nay: Thứ Hai, 15 Tháng 4, 2024
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="shadow-sm">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Quét mã khách
                    </Button>
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Plus className="mr-2 h-4 w-4" />
                        Đặt trực tiếp (Walk-in)
                    </Button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Tìm kiếm theo tên khách, SĐT hoặc mã đơn..." className="pl-10 h-11" />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-11">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Hôm nay
                    </Button>
                    <Button variant="outline" className="h-11">
                        <Filter className="mr-2 h-4 w-4" />
                        Bộ lọc
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="list" className="space-y-6">
                <TabsList className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-1 rounded-xl">
                    <TabsTrigger value="list" className="rounded-lg">Danh sách (List View)</TabsTrigger>
                    <TabsTrigger value="calendar" className="rounded-lg">Lịch sân (Grid View)</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-800 pb-6">
                            <CardTitle className="text-lg">Danh sách Booking (12)</CardTitle>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">7 Đã đến</Badge>
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">3 Sắp tới</Badge>
                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">2 Vắng mặt</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {[
                                { id: 'BK-9981', user: 'Nguyễn Văn Hải', phone: '0901234567', time: '16:00 - 17:30', field: 'Sân bóng Grass A', status: 'Checked-in', price: '150,000 VND' },
                                { id: 'BK-9982', user: 'Trần Minh Quân', phone: '0988776655', time: '17:30 - 19:00', field: 'Sân bóng Grass B', status: 'Waiting', price: '200,000 VND' },
                                { id: 'BK-9983', user: 'Lê Thế Hùng', phone: '0977112233', time: '19:00 - 20:30', field: 'Sân bóng Grass A', status: 'Waiting', price: '250,000 VND' },
                                { id: 'BK-9984', user: 'Bùi Anh Tuấn', phone: '0911002233', time: '16:00 - 18:00', field: 'Sân Tennis 1', status: 'Checked-in', price: '300,000 VND' },
                            ].map((b, i) => (
                                <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all gap-4 group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-110",
                                            b.status === 'Checked-in' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                                        )}>
                                            {b.user.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-gray-900 dark:text-white text-lg">{b.user}</p>
                                                <Badge variant="outline" className="font-mono text-[10px]">{b.id}</Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mt-1">
                                                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {b.time}</span>
                                                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {b.field}</span>
                                                <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {b.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-right">
                                            <p className="font-bold text-primary-600">{b.price}</p>
                                            <Badge variant={b.status === 'Checked-in' ? 'success' : 'secondary'} className="mt-1">
                                                {b.status === 'Checked-in' ? 'Đã Check-in' : 'Đang chờ'}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            {b.status !== 'Checked-in' ? (
                                                <Button size="sm" className="bg-primary-600 hover:bg-primary-700 h-10 px-6 rounded-xl shadow-md shadow-primary-500/10">
                                                    Check-in
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 h-10 px-6 rounded-xl">
                                                    Check-out
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="calendar" className="min-h-[500px] flex items-center justify-center border-2 border-dashed rounded-2xl border-gray-100 bg-white dark:bg-gray-900/50">
                    <div className="text-center space-y-4">
                        <CalendarIcon className="h-16 w-16 text-gray-200 mx-auto" />
                        <h3 className="text-xl font-bold">Giao diện Lịch sân</h3>
                        <p className="text-gray-500 max-w-sm">Chế độ xem theo lưới thời gian đang được tối ưu hóa cho màn hình cảm ứng.</p>
                        <Button variant="outline" onClick={() => { }}>Chuyển sang danh sách</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
