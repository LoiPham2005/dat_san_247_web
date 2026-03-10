import React from 'react';
import { VenueGallery } from '@/features/venue/components/VenueGallery';
import { VenueAmenities } from '@/features/venue/components/VenueAmenities';
import { TimeSlotPicker } from '@/features/booking/components/TimeSlotPicker';
import { Button } from '@/components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { MapPin, Star, Phone, ShieldCheck, Share2, Heart, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function VenueDetailPage({ params }: { params: { slug: string } }) {
    // Mock detailed venue
    const venue = {
        name: "Sân Bóng Đá Chảo Lửa",
        address: "30 Phan Thúc Duyện, Phường 4, Quận Tân Bình, TP.HCM",
        rating: 4.8,
        totalReviews: 125,
        phone: "0909 123 xxx",
        amenities: [
            { name: "Wifi", is_free: true },
            { name: "Bãi đỗ xe", is_free: true },
            { name: "Cafeteria", is_free: false },
            { name: "Nước miễn phí", is_free: true },
            { name: "Phòng tắm", is_free: true },
            { name: "Đèn chiếu sáng", is_free: true }
        ],
        courts: [
            { id: '1', name: 'Sân 5 người - A1', price: 150000 },
            { id: '2', name: 'Sân 5 người - A2', price: 150000 },
            { id: '3', name: 'Sân 7 người - B1', price: 350000 }
        ]
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="container px-4 md:px-8 py-8 md:py-12">
                {/* Breadcrumb / Top Actions */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <span className="hover:text-primary cursor-pointer">Sân vận động</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="hover:text-primary cursor-pointer">TP.HCM</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-bold">{venue.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 text-slate-400 hover:text-rose-500 hover:border-rose-200">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 text-slate-400 border-slate-200">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Main Info Column */}
                    <div className="flex-1 space-y-10">
                        {/* Gallery */}
                        <VenueGallery />

                        {/* Title & Stats */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase break-words">
                                    {venue.name}
                                </h1>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Đã xác thực
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    {venue.rating} <span className="text-slate-400 font-medium">({venue.totalReviews} đánh giá)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                    <MapPin className="w-5 h-5 text-primary/70" /> {venue.address}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" /> Giới thiệu về sân
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                Sân bóng đá Chảo Lửa là một trong những cụm sân cỏ nhân tạo có diện tích lớn và chất lượng tốt nhất tại khu vực Tân Bình. Sân được trang bị hệ thống chiếu sáng hiện đại, cỏ đạt tiêu chuẩn FIFA, không gian rộng rãi thoáng mát. Phù hợp cho cả tập luyện phong trào và các giải đấu lớn.
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-900">Tiện ích đi kèm</h3>
                            <VenueAmenities amenities={venue.amenities} />
                        </div>

                        {/* Rules / Support */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <Phone size={120} />
                            </div>
                            <div className="relative z-10 space-y-4 max-w-md">
                                <h3 className="text-2xl font-bold underline decoration-primary decoration-4 underline-offset-8">Bạn cần hỗ trợ?</h3>
                                <p className="text-slate-400 text-sm">Liên hệ trực tiếp với ban quản lý sân để giải đáp mọi thắc mắc về kỹ thuật hoặc thỏa thuận giá thuê lâu dài.</p>
                                <Button className="bg-white text-slate-900 hover:bg-primary hover:text-white font-bold px-8 rounded-xl h-12">
                                    GỌI NGAY: {venue.phone}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar / Card */}
                    <aside className="w-full lg:w-[420px] shrink-0">
                        <Card className="sticky top-24 border-slate-200/60 shadow-2xl rounded-3xl bg-white overflow-hidden p-0">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    Chọn sân & Thời gian
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* Court Selector Dropdown Mock */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Loại sân</label>
                                    <div className="relative cursor-pointer border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-slate-50/50 hover:border-primary/50 transition-colors">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{venue.courts[0].name}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Sân cỏ nhân tạo tiêu chuẩn</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                                    </div>
                                </div>

                                {/* Date Picker Horizontal (Mock) */}
                                <div className="space-y-2 uppercase">
                                    <label className="text-xs font-bold text-slate-400 tracking-widest pl-1">Chọn ngày</label>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
                                        {[
                                            { d: 'T2', n: '10' },
                                            { d: 'T3', n: '11', active: true },
                                            { d: 'T4', n: '12' },
                                            { d: 'T5', n: '13' },
                                            { d: 'T6', n: '14' },
                                            { d: 'T7', n: '15' },
                                            { d: 'CN', n: '16' }
                                        ].map((item, i) => (
                                            <button
                                                key={i}
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[56px] py-3 rounded-2xl border transition-all",
                                                    item.active
                                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                                                        : "bg-white border-slate-200 text-slate-700 hover:border-primary/40 hover:bg-primary/5 shadow-sm"
                                                )}
                                            >
                                                <span className="text-[10px] font-bold">{item.d}</span>
                                                <span className="text-sm font-black">{item.n}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Slot Matrix */}
                                <div className="space-y-2 uppercase">
                                    <label className="text-xs font-bold text-slate-400 tracking-widest pl-1">Chọn khung giờ</label>
                                    <TimeSlotPicker />
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
