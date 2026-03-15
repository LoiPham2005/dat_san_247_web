"use client";

import React from 'react';
import { useVenueDetail, useUserFavorites } from '@/features/venue/hooks/useVenueSearch';
import { VenueGallery } from '@/features/venue/components/VenueGallery';
// import { VenueAmenities } from '@/features/venue/components/VenueAmenities';
import { TimeSlotPicker } from '@/features/booking/components/TimeSlotPicker';
import { Button } from '@/components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { MapPin, Star, Phone, ShieldCheck, Share2, Heart, Info, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function VenueDetailPage({ params }: { params: { slug: string } }) {
    const { data: venue, isLoading } = useVenueDetail(params.slug);
    const { favorites, toggleFavorite } = useUserFavorites();

    if (isLoading) return <div className="py-20 text-center text-slate-500 font-bold">Đang tải thông tin sân...</div>;
    if (!venue) return <div className="py-20 text-center font-bold text-rose-500">Không tìm thấy sân!</div>;

    const isFavorite = favorites.some((f: any) => f.venue_id === venue.id);

    return (
        <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in">
            <div className="container px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
                {/* Breadcrumb / Top Actions */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <span className="hover:text-primary cursor-pointer">Sân vận động</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="hover:text-primary cursor-pointer">{venue.city}</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-bold">{venue.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleFavorite(venue.id)}
                            className={cn("rounded-full w-10 h-10 p-0 hover:border-rose-200 transition-colors", isFavorite ? 'border-rose-200' : 'border-slate-200')}
                        >
                            <Heart className={cn("w-5 h-5", isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-400')} />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 text-slate-400 border-slate-200">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Main Info Column */}
                    <div className="flex-1 space-y-10">
                        {/* Title & Stats */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase break-words">
                                    {venue.name}
                                </h1>
                                {venue.is_verified && (
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Đã xác thực
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    {venue.average_rating} <span className="text-slate-400 font-medium">({venue.review_count} đánh giá)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                    <MapPin className="w-5 h-5 text-primary/70" /> {venue.address}, {venue.district}, {venue.city}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" /> Giới thiệu về sân
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                {venue.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Danh sách sân con */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Danh sách bề mặt sân</h3>
                                <div className="space-y-3">
                                    {venue.courts?.map(c => (
                                        <div key={c.id} className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-slate-800">{c.name}</div>
                                                <div className="text-xs text-slate-500">{c.description} - {c.size}</div>
                                            </div>
                                            <div className="text-primary font-bold">
                                                {c.price_per_hour.toLocaleString()}đ/h
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Tiện ích đi kèm</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {venue.amenities?.map((am: any) => (
                                        <div key={am.id} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Check className="w-4 h-4 text-emerald-500" /> {am.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bang Giá Theo Khung Giờ */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Bảng Giá Theo Khung Giờ (Pricing rules)</h3>
                            <div className="overflow-x-auto border border-slate-200 rounded-xl relative">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-50 font-bold text-slate-600">
                                        <tr>
                                            <th className="p-4 border-b border-slate-200">Khung Giờ</th>
                                            <th className="p-4 border-b border-slate-200">Thứ 2 - Thứ 6</th>
                                            <th className="p-4 border-b border-slate-200">T7 - Chủ Nhật</th>
                                            <th className="p-4 border-b border-slate-200">Ngày Lễ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-bold text-slate-800">Sáng (06:00 - 16:00)</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 font-bold rounded">150.000đ</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-orange-50 text-orange-700 font-bold rounded">200.000đ</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-rose-50 text-rose-700 font-bold rounded">250.000đ</span></td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-bold text-primary">Giờ Vàng (17:00 - 20:00)</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-indigo-50 text-indigo-700 font-bold rounded">300.000đ</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-indigo-50 text-indigo-700 font-bold rounded">350.000đ</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-rose-50 text-rose-700 font-bold rounded">400.000đ</span></td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-bold text-slate-800">Tối muộn (21:00 - 23:00)</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-700 font-bold rounded">200.000đ</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-700 font-bold rounded">250.000đ</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-rose-50 text-rose-700 font-bold rounded">300.000đ</span></td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Loại sân / Mặt sân</label>
                                    <select className="w-full border border-slate-200 rounded-xl p-4 bg-slate-50 focus:border-primary outline-none font-bold text-slate-800 cursor-pointer appearance-none">
                                        {venue.courts?.map((c: any) => (
                                            <option key={c.id} value={c.id}>{c.name} ({c.price_per_hour.toLocaleString()}đ/h)</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date Picker Horizontal (Mock) */}
                                <div className="space-y-2 uppercase">
                                    <label className="text-xs font-bold text-slate-400 tracking-widest pl-1">Chọn ngày</label>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
                                        {[
                                            { d: 'Hôm nay', n: new Date().getDate(), active: true },
                                            { d: 'Ngày mai', n: new Date(Date.now() + 86400000).getDate() },
                                            { d: 'T' + new Date(Date.now() + 86400000*2).getDay(), n: new Date(Date.now() + 86400000*2).getDate() },
                                        ].map((item, i) => (
                                            <button
                                                key={i}
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[64px] py-3 rounded-2xl border transition-all",
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
                                    <label className="text-xs font-bold text-slate-400 tracking-widest pl-1">Chọn khung giờ trống</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['06:00', '07:30', '09:00', '16:00', '17:30', '19:00'].map(t => (
                                            <button key={t} className="py-2 border border-slate-200 rounded-xl font-bold bg-white hover:border-primary text-slate-700 hover:text-primary transition-colors text-sm">{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-base shadow-lg shadow-emerald-500/20 mt-4">
                                    Tiến Hành Đặt Sân Tùy Chọn
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
