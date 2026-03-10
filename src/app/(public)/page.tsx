import React from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { MapPin, Search, CalendarDays } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-primary/10 py-16 px-4 md:px-8 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Tìm và đặt sân thể thao nhanh chóng
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mb-8">
                    Nền tảng kết nối người chơi và chủ sân uy tín. Đặt lịch, thanh toán, và ra sân chỉ với vài thao tác!
                </p>

                {/* Global Search Bar (Glassmorphism inspired) */}
                <div className="w-full max-w-4xl bg-white border border-slate-200 shadow-sm rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-3 items-center transition-shadow hover:shadow-md">
                    <div className="flex w-full items-center gap-2 px-3 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0">
                        <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
                        <Input
                            type="text"
                            placeholder="Nhập khu vực, quận, sân..."
                            className="border-0 shadow-none focus-visible:ring-0 px-0 placeholder:text-slate-400 text-base h-12"
                        />
                    </div>
                    <div className="flex w-full items-center gap-2 px-3 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0">
                        <CalendarDays className="text-primary w-5 h-5 flex-shrink-0" />
                        <Input
                            type="date"
                            className="border-0 shadow-none focus-visible:ring-0 px-0 text-slate-600 text-base h-12"
                        />
                    </div>
                    <Button size="lg" className="w-full md:w-auto h-12 px-8 rounded-xl shrink-0 font-semibold text-base shadow-sm">
                        <Search className="w-5 h-5 mr-2" />
                        Tìm Kiếm
                    </Button>
                </div>
            </section>

            {/* Featured Venues Section */}
            <section className="w-full max-w-6xl px-4 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sân Nổi Bật Gần Đây</h2>
                        <p className="text-slate-500 mt-2">Các cơ sở thể thao chất lượng tốt nhất được cộng đồng lựa chọn.</p>
                    </div>
                    <Button variant="outline" className="hidden sm:flex text-primary border-primary hover:bg-primary/5">
                        Xem tất cả
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Mockup Card 1 */}
                    <Card className="overflow-hidden border-slate-200/60 bg-white hover:border-primary/50 cursor-pointer group shadow-sm transition-all hover:shadow-md">
                        <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
                            {/* Cover Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-700 to-green-400 opacity-90 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                <span className="text-white/30 font-bold text-2xl tracking-widest">FOOTBALL</span>
                            </div>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
                                ⭐ 4.8 (120)
                            </div>
                        </div>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">Sân Bóng Đá Chảo Lửa</CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-1.5 mt-1 text-slate-500">
                                <MapPin className="w-3.5 h-3.5" /> Quận Tân Bình, TP.HCM
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-medium rounded-md">Bóng đá</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Có nước giải khát</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between items-center border-t border-slate-100 mt-4 px-6 py-4">
                            <div className="font-semibold text-slate-900">
                                Từ <span className="text-lg text-primary mr-1">150.000đ</span><span className="text-sm font-normal text-slate-500">/giờ</span>
                            </div>
                            <Button size="sm" className="font-medium px-5">Đặt Ngay</Button>
                        </CardFooter>
                    </Card>

                    {/* Mockup Card 2 */}
                    <Card className="overflow-hidden border-slate-200/60 bg-white hover:border-primary/50 cursor-pointer group shadow-sm transition-all hover:shadow-md">
                        <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-400 opacity-90 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                <span className="text-white/30 font-bold text-2xl tracking-widest">BADMINTON</span>
                            </div>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
                                ⭐ 4.9 (84)
                            </div>
                        </div>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">Cầu Lông Viettel</CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-1.5 mt-1 text-slate-500">
                                <MapPin className="w-3.5 h-3.5" /> Quận 10, TP.HCM
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-medium rounded-md">Cầu lông</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Sàn thảm xịn</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between items-center border-t border-slate-100 mt-4 px-6 py-4">
                            <div className="font-semibold text-slate-900">
                                Từ <span className="text-lg text-primary mr-1">80.000đ</span><span className="text-sm font-normal text-slate-500">/giờ</span>
                            </div>
                            <Button size="sm" className="font-medium px-5">Đặt Ngay</Button>
                        </CardFooter>
                    </Card>

                    {/* Mockup Card 3 */}
                    <Card className="overflow-hidden border-slate-200/60 bg-white hover:border-primary/50 cursor-pointer group shadow-sm transition-all hover:shadow-md">
                        <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
                            {/* Cover Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-400 opacity-90 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                <span className="text-white/30 font-bold text-2xl tracking-widest">TENNIS</span>
                            </div>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
                                ⭐ 4.5 (210)
                            </div>
                        </div>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">Sân Tennis Kỳ Hòa</CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-1.5 mt-1 text-slate-500">
                                <MapPin className="w-3.5 h-3.5" /> Quận 10, TP.HCM
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-medium rounded-md">Tennis</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Mở 24/7</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between items-center border-t border-slate-100 mt-4 px-6 py-4">
                            <div className="font-semibold text-slate-900">
                                Từ <span className="text-lg text-primary mr-1">200.000đ</span><span className="text-sm font-normal text-slate-500">/giờ</span>
                            </div>
                            <Button size="sm" className="font-medium px-5">Đặt Ngay</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="mt-8 flex justify-center sm:hidden">
                    <Button variant="outline" className="w-full text-primary border-primary">Xem tất cả</Button>
                </div>
            </section>
        </main>
    );
}
