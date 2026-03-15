"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { MapPin, Search, CalendarDays, Activity, Medal, ShieldCheck, Zap, Trophy, Star, ChevronRight, PlayCircle, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/venues${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`);
    };

    const sportCategories = [
        { name: 'Bóng Đá', icon: <Activity className="w-8 h-8" />, color: 'from-emerald-400 to-emerald-600', venues: 142 },
        { name: 'Cầu Lông', icon: <Medal className="w-8 h-8" />, color: 'from-indigo-400 to-indigo-600', venues: 86 },
        { name: 'Tennis', icon: <Trophy className="w-8 h-8" />, color: 'from-amber-400 to-amber-600', venues: 45 },
        { name: 'Bóng Bàn', icon: <TargetIcon className="w-8 h-8" />, color: 'from-rose-400 to-rose-600', venues: 32 },
    ];

    const featuredVenues = [
        {
            id: 'V-1',
            name: 'Sân Bóng Vipe Cầu Giấy',
            sport: 'Bóng Đá',
            location: 'Cầu Giấy, Hà Nội',
            price: '150.000đ',
            rating: 4.8,
            reviews: 128,
            image: 'https://images.unsplash.com/photo-1574629810360-7efbc19398ec?q=80&w=800&h=600&fit=crop',
            tag: 'Hot Ngần Đây'
        },
        {
            id: 'V-2',
            name: 'Sân Cầu Lông Thống Nhất',
            sport: 'Cầu Lông',
            location: 'Quận 10, TP.HCM',
            price: '80.000đ',
            rating: 4.9,
            reviews: 256,
            image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&h=600&fit=crop',
            tag: 'Giá Tốt'
        },
        {
            id: 'V-3',
            name: 'Cụm Tennis Kỳ Hòa',
            sport: 'Tennis',
            location: 'Quận 10, TP.HCM',
            price: '200.000đ',
            rating: 4.7,
            reviews: 94,
            image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&h=600&fit=crop',
            tag: 'Sân Tiêu Chuẩn'
        }
    ];

    return (
        <main className="min-h-screen bg-white selection:bg-primary/20">
            {/* HERO SECTION - Giao diện WOW thay thế Banner truyền thống */}
            <section className="relative px-4 pt-8 pb-8 md:pt-12 md:pb-12 overflow-hidden">
                {/* Background Styling */}
                <div className="absolute inset-0 bg-slate-50 -z-20"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>
                
                <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-bold text-slate-600 mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Hơn 2,000+ sân tập đã có mặt trên hệ thống
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100">
                        Sức Khỏe Kéo Dài, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                            Đặt Sân Trong Tích Tắc.
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 font-medium animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                        Hệ thống book sân thông minh nhất Việt Nam. Tìm sân gần bạn, check lịch trống realtime và giữ chỗ tự động 100%.
                    </p>

                    {/* Thanh Tìm Kiếm Cực Mạnh Mẽ */}
                    <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-3 flex flex-col md:flex-row gap-3 items-center mx-auto animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300">
                        <div className="flex w-full flex-1 items-center gap-3 px-4 md:border-r border-slate-100 h-14">
                            <MapPin className="text-slate-400 w-5 h-5 flex-shrink-0" />
                            <div className="flex-1 text-left">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Địa điểm / Tên sân</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Bạn muốn chơi ở đâu?"
                                    className="w-full border-0 p-0 text-slate-800 font-bold placeholder:font-medium placeholder:text-slate-300 focus:ring-0 sm:text-lg bg-transparent outline-none text-left"
                                />
                            </div>
                        </div>
                        <div className="flex w-full md:w-56 items-center gap-3 px-4 h-14">
                            <CalendarDays className="text-slate-400 w-5 h-5 flex-shrink-0" />
                            <div className="flex-1 text-left">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 text-left">Ngày đá</label>
                                <input
                                    type="date"
                                    className="w-full border-0 p-0 text-slate-800 font-bold focus:ring-0 bg-transparent outline-none cursor-pointer text-left"
                                />
                            </div>
                        </div>
                        <Button type="submit" size="lg" className="w-full md:w-auto h-16 px-10 rounded-[1.5rem] font-bold text-lg shadow-lg shadow-primary/20 shrink-0">
                            <Search className="w-5 h-5 mr-2" /> TÌM SÂN LUÔN
                        </Button>
                    </form>
                    
                    <div className="flex items-center gap-6 mt-10 text-sm font-bold text-slate-500 animate-in fade-in duration-1000 delay-500 flex-wrap justify-center">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                            <Zap className="w-4 h-4 text-amber-500" /> Xác nhận tức thì
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Thanh toán an toàn
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                            <Star className="w-4 h-4 text-primary" /> Có tích điểm ví
                        </div>
                    </div>
                </div>
            </section>

            {/* MÔN THỂ THAO PHỔ BIẾN */}
            <section className="pt-4 pb-12 md:pt-8 md:pb-16 px-4 bg-white relative">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Môn Thể Thao Nào <br />Dành Cho Bạn Hôm Nay?</h2>
                            <p className="text-slate-500 font-medium">Bất kể bộ môn nào, chúng tôi đều có sẵn cơ sở vật chất chất lượng cao.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {sportCategories.map((cat, idx) => (
                            <Link href={`/venues?sport=${cat.name}`} key={idx} className="group cursor-pointer">
                                <div className="bg-slate-50 rounded-3xl p-6 h-48 flex flex-col justify-between border border-slate-100 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md`}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 group-hover:text-primary transition-colors">{cat.name}</h3>
                                        <p className="text-sm font-semibold text-slate-500 mt-1">{cat.venues} sân tập</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SÂN NỔI BẬT */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Sân HOT Đang Trống</h2>
                            <p className="text-slate-500 font-medium">Những địa điểm chất lượng, được cộng đồng đánh giá cao nhất tuần này.</p>
                        </div>
                        <Button variant="outline" className="hidden sm:flex h-12 px-6 rounded-xl font-bold bg-white" onClick={() => router.push('/venues')}>
                            Xem Tất Cả Sân <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredVenues.map((venue) => (
                            <div key={venue.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={venue.image} 
                                        alt={venue.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-slate-800 tracking-wide uppercase shadow-sm">
                                        {venue.sport}
                                    </div>
                                    {venue.tag && (
                                        <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1.5 rounded-xl text-xs font-black tracking-wide shadow-sm flex items-center gap-1">
                                            <Flame className="w-3.5 h-3.5" /> {venue.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{venue.name}</h3>
                                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg shrink-0">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs font-bold">{venue.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-slate-500 mb-6 flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-slate-400" /> {venue.location}
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Chỉ từ</span>
                                            <div className="text-lg font-black text-slate-900">{venue.price}<span className="text-xs font-bold text-slate-500 ml-1">/h</span></div>
                                        </div>
                                        <Button className="rounded-xl font-bold" onClick={() => router.push(`/venues/slug`)}>Đặt Ngay</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900"></div>
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 border border-primary/20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
                
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-20 text-center flex flex-col items-center shadow-2xl">
                        <span className="px-4 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8 inline-block shadow-inner">Dành Cho Chủ Sân</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Bạn Có Cụm Sân Thể Thao?</h2>
                        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mb-12">
                            Tham gia mạng lưới DatSan247 ngay hôm nay. Tăng doanh thu gấp đôi, quản lý lịch trống chuyên nghiệp và tiếp cận hàng ngàn khách hàng mới mỗi ngày.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button size="lg" className="h-16 px-10 rounded-2xl font-bold text-lg bg-white text-slate-900 hover:bg-slate-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                                Đăng Ký Trở Thành Đối Tác
                            </Button>
                            <Button size="lg" variant="ghost" className="h-16 px-10 rounded-2xl font-bold text-lg border-2 border-white/20 text-white bg-transparent hover:bg-white/10">
                                Tìm Hiểu Thêm
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function TargetIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    )
}
