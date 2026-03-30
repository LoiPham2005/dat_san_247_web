"use client";

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
    Search, 
    ArrowLeft, 
    MapPin, 
    Navigation, 
    Layers, 
    Maximize2, 
    Star, 
    Phone, 
    ChevronRight,
    Map as MapIcon,
    LocateFixed,
    Filter,
    X,
    ChevronLeft,
    Heart,
    SlidersHorizontal,
    PanelLeft,
    CheckCircle2,
    Wifi,
    Car,
    Coffee
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useVenueSearch } from '../hooks/useVenueSearch';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/utils/cn';

// Dynamic import OSMMap to avoid SSR errors
const OSMMap = dynamic(() => import('./OSMMap'), { 
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Đang tải bản đồ vệ tinh...</span>
        </div>
    )
});

const SPORT_TYPES = [
    { label: 'Tất cả môn', value: '' },
    { label: 'Bóng đá 5', value: 'FOOTBALL_5' },
    { label: 'Bóng đá 7', value: 'FOOTBALL_7' },
    { label: 'Cầu lông', value: 'BADMINTON' },
    { label: 'Tennis', value: 'TENNIS' },
    { label: 'Bóng rổ', value: 'BASKETBALL' },
    { label: 'Pickleball', value: 'PICKLEBALL' },
];

const CITIES = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'];

export const VenueMapFullView = () => {
    const [keyword, setKeyword] = useState('');
    const [filters, setFilters] = useState<any>({
        keyword: '',
        rating_min: 0,
        sport_type: undefined,
        city: undefined,
        price_max: undefined
    });
    
    // Sync keyword to filters with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters((prev: any) => ({ ...prev, keyword }));
        }, 500);
        return () => clearTimeout(timer);
    }, [keyword]);

    const { data: venuesData, isLoading } = useVenueSearch(filters);
    const venues = Array.isArray(venuesData) ? (venuesData as any) : [];
    const [selectedVenue, setSelectedVenue] = useState<any>(null);
    const [previewVenue, setPreviewVenue] = useState<any>(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const toggleTopRating = () => {
        setFilters((prev: any) => ({
            ...prev,
            rating_min: prev.rating_min === 4.5 ? 0 : 4.5
        }));
    };

    // Sync scroll khi card đc chọn
    useEffect(() => {
        if (selectedVenue && scrollRef.current) {
            const index = venues.findIndex((v: any) => v.id === selectedVenue.id);
            if (index !== -1) {
                const cardWidth = 300; 
                scrollRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            }
        }
    }, [selectedVenue, venues]);

    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-slate-50 animate-in fade-in duration-500 font-sans">
            {/* SIDE PANEL (Absolute Overlay) */}
            <div className={cn(
                "absolute top-0 left-0 bottom-0 bg-white shadow-[20px_0_60px_rgba(0,0,0,0.08)] z-40 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col border-r overflow-hidden",
                showSidebar ? "w-[400px] translate-x-0 opacity-100" : "w-[400px] -translate-x-full opacity-0 pointer-events-none"
            )}>
                <div className="p-6 h-full flex flex-col w-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                Khám phá 
                                <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-black animate-in zoom-in duration-300">
                                    {venues.length}
                                </span>
                            </h2>
                            <p className="text-sm font-medium text-slate-400 mt-1">Tìm thấy sân chơi quanh bạn</p>
                        </div>
                        <Button variant="outline" size="icon" onClick={() => setShowSidebar(false)} className="rounded-2xl border-slate-100 hover:bg-slate-50">
                            <X className="w-5 h-5 text-slate-400" />
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Tên sân, khu vực hoặc môn thể thao..." 
                            className="w-full h-12 pl-12 bg-slate-50 border-none rounded-2xl font-medium focus:ring-primary/20 appearance-none outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-8">
                        <Button 
                            variant="outline" 
                            onClick={() => setShowFilterModal(true)}
                            className={cn(
                                "flex-1 rounded-xl h-10 border-slate-100 font-bold text-[10px] uppercase tracking-wider transition-all",
                                (filters.sport_type || filters.city) ? "bg-primary/10 border-primary/20 text-primary" : "bg-white"
                            )}
                        >
                            <Filter className="w-3.5 h-3.5 mr-2" /> Lọc {(filters.sport_type || filters.city) ? "•" : ""}
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={toggleTopRating}
                            className={cn(
                                "flex-1 rounded-xl h-10 border-slate-100 font-bold text-[10px] uppercase tracking-wider transition-all",
                                filters.rating_min >= 4.5 ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "bg-white"
                            )}
                        >
                            <Star className={cn("w-3.5 h-3.5 mr-2", filters.rating_min >= 4.5 ? "fill-yellow-500 text-yellow-500" : "text-yellow-500")} /> Top Rating
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2 pb-10">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-4">
                                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang tải...</span>
                            </div>
                        ) : venues.length === 0 ? (
                            <div className="text-center py-20 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                    <MapIcon className="w-8 h-8 text-slate-200" />
                                </div>
                                <span className="text-sm font-bold text-slate-300 italic">Không tìm thấy kết quả nào</span>
                            </div>
                        ) : venues.map((v: any) => (
                            <div 
                                key={v.id}
                                onClick={() => {
                                    setSelectedVenue(v);
                                    setPreviewVenue(v);
                                }}
                                className={cn(
                                    "p-4 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden",
                                    selectedVenue?.id === v.id 
                                        ? "bg-primary/[0.03] border-primary shadow-[0_10px_30px_rgba(59,130,246,0.08)]" 
                                        : "bg-white border-slate-100 hover:border-primary/20 hover:bg-slate-50"
                                )}
                            >
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                                        <img src={v.thumbnail_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=300'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col justify-between py-1 min-w-0">
                                        <div>
                                            <h3 className="font-black text-slate-900 text-sm group-hover:text-primary transition-colors line-clamp-1">{v.name}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-primary" /> {v.district}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-[10px] font-black text-slate-600">{(v.rating || 5).toFixed(1)}</span>
                                            </div>
                                            <span className="text-xs font-black text-primary">{(v.min_price || 0).toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN MAP AREA */}
            <div className="w-full h-full relative">
                {!showSidebar && (
                    <Button 
                        onClick={() => setShowSidebar(true)}
                        className="absolute top-6 left-6 z-40 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl h-12 w-12 p-0 text-slate-700 hover:scale-105 border-none animate-in slide-in-from-left-4 duration-500"
                    >
                        <PanelLeft className="w-5 h-5" />
                    </Button>
                )}

                {/* OSM MAP COMPONENT */}
                <OSMMap 
                    venues={venues} 
                    selectedVenue={selectedVenue} 
                    onVenueSelect={(v) => setSelectedVenue(v)} 
                    onVenuePreview={(v) => setPreviewVenue(v)}
                />

                <div className="absolute right-6 bottom-36 z-30">
                    <Button className="h-14 w-14 rounded-full bg-primary shadow-[0_10px_40px_rgba(59,130,246,0.6)] p-0 hover:scale-110 active:scale-95 transition-all text-white border-none group">
                        <LocateFixed className="w-6 h-6 group-hover:animate-pulse" />
                    </Button>
                </div>

                {/* HORIZONTAL SWIPE CAROUSEL */}
                <div className={cn(
                    "absolute bottom-8 right-0 z-30 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    (venues.length === 0 || !!previewVenue) ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100 pointer-events-auto",
                    showSidebar ? "left-[400px]" : "left-0"
                )}>
                    <div 
                        ref={scrollRef}
                        className="flex gap-4 px-6 overflow-x-auto pointer-events-auto no-scrollbar snap-x snap-mandatory pb-4"
                    >
                        {venues.map((v: any) => (
                            <div 
                                key={v.id} 
                                onClick={() => setSelectedVenue(v)}
                                className={cn(
                                    "flex-shrink-0 w-[280px] md:w-[340px] snap-center transition-all duration-300",
                                    selectedVenue?.id === v.id ? "scale-105" : "opacity-95"
                                )}
                            >
                                <Card className={cn(
                                    "bg-white/95 backdrop-blur-xl border-none shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-[2.5rem] overflow-hidden p-2 group cursor-pointer",
                                    selectedVenue?.id === v.id && "ring-2 ring-primary/40 ring-offset-4 ring-offset-transparent"
                                )}>
                                    <div className="flex gap-3">
                                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.75rem] overflow-hidden shrink-0 shadow-sm relative">
                                            <img src={v.thumbnail_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=300'} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-sm">
                                                <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" /> {v.rating?.toFixed(1) || '5.0'}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 pr-3 pt-2 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-black text-slate-900 text-sm truncate leading-tight">{v.name}</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1 truncate">{v.address || v.district}</p>
                                            </div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 font-black uppercase leading-none mb-1">Từ</span>
                                                    <span className="text-base font-black text-primary leading-none">{(v.min_price || 0).toLocaleString()}đ</span>
                                                </div>
                                                <Button 
                                                    size="sm" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewVenue(v);
                                                    }}
                                                    className="h-9 px-4 rounded-xl bg-slate-900 text-[10px] font-black tracking-widest uppercase hover:bg-primary transition-all"
                                                >
                                                    Xem nhanh
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PREVIEW DRAWER (1/3 Width) */}
                <div className={cn(
                    "fixed top-16 right-0 h-[calc(100vh-64px)] bg-white/95 backdrop-blur-2xl shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-[100] transition-all duration-700 ease-out flex flex-col border-l border-slate-200/50",
                    previewVenue ? "w-[450px] translate-x-0" : "w-0 translate-x-full"
                )}>
                    {previewVenue && (
                        <div className="h-full flex flex-col overflow-hidden w-[450px]">
                            {/* Close Button UI */}
                            <div className="absolute top-6 left-6 z-50">
                                <Button 
                                    size="icon" 
                                    variant="outline" 
                                    onClick={() => setPreviewVenue(null)}
                                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:rotate-90 transition-all duration-300 border-none h-11 w-11"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </Button>
                            </div>

                            {/* Main Image Banner */}
                            <div className="relative h-[300px] w-full shrink-0">
                                <img 
                                    src={previewVenue.thumbnail_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600'} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-8 right-8">
                                    <div className="bg-primary/20 backdrop-blur-xl border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full w-fit mb-3">
                                        Sport Center
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 leading-tight">{previewVenue.name}</h2>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 overflow-y-auto px-8 space-y-8 pb-32 custom-scrollbar">
                                <div className="flex items-center gap-6 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-300 uppercase mb-1">Rating</span>
                                        <div className="flex items-center gap-1.5 font-black text-slate-900">
                                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                            <span className="text-xl">{(previewVenue.rating || 5).toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-slate-100" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-300 uppercase mb-1">Reviews</span>
                                        <span className="text-xl font-black text-slate-900">{previewVenue.total_reviews || 0}</span>
                                    </div>
                                    <div className="w-px h-10 bg-slate-100" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-300 uppercase mb-1">Verified</span>
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" /> Vị trí cơ sở
                                    </h4>
                                    <p className="text-sm font-bold text-slate-600 bg-slate-50 p-4 rounded-2xl italic leading-relaxed border border-slate-100/50">
                                        "{previewVenue.address || 'Đang cập nhật địa chỉ chính xác cho cơ sở này. Vui lòng liên hệ hotline để biết thêm chi tiết.'}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {['Wifi miễn phí', 'Chỗ để xe', 'Nước uống', 'Nhà vệ sinh sạch'].map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white shadow-sm">
                                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                                                {i === 0 ? <Wifi className="w-4 h-4 text-primary" /> : i === 1 ? <Car className="w-4 h-4 text-primary" /> : <Coffee className="w-4 h-4 text-primary" />}
                                            </div>
                                            <span className="text-xs font-bold text-slate-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Mô tả chi tiết</h4>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed line-clamp-4">
                                        {previewVenue.description || 'Hệ thống sân bãi hiện đại bậc nhất khu vực với trang thiết bị tiêu chuẩn quốc tế. Không gian rộng rãi, thoáng mát, dịch vụ tận tâm chuyên nghiệp.'}
                                    </p>
                                </div>
                            </div>

                            {/* Booking Action Button */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">Giá từ</span>
                                    <span className="text-2xl font-black text-primary">{(previewVenue.min_price || 0).toLocaleString()}đ<span className="text-xs font-bold text-slate-300 uppercase">/giờ</span></span>
                                </div>
                                <Link href={`/venues/${previewVenue.slug}`}>
                                    <Button className="h-16 px-10 rounded-[2rem] bg-primary shadow-[0_15px_40px_rgba(59,130,246,0.5)] font-black uppercase tracking-widest text-xs flex items-center gap-2 group border-none">
                                        Đặt sân ngay
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
            `}</style>

            {/* FILTER MODAL */}
            {showFilterModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowFilterModal(false)} />
                    <Card className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 border-none space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-slate-900">Bộ lọc nâng cao</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowFilterModal(false)} className="rounded-full hover:bg-slate-50">
                                <X className="w-6 h-6 text-slate-400" />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {/* Sport Type */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Môn thể thao</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {SPORT_TYPES.map(sport => (
                                        <button
                                            key={sport.value}
                                            onClick={() => setFilters((prev: any) => ({ ...prev, sport_type: sport.value }))}
                                            className={cn(
                                                "h-10 rounded-xl text-[10px] font-black uppercase transition-all border",
                                                filters.sport_type === sport.value 
                                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/25" 
                                                    : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                                            )}
                                        >
                                            {sport.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* City */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Thành phố</label>
                                <div className="flex gap-2">
                                    {['', ...CITIES].map(city => (
                                        <button
                                            key={city}
                                            onClick={() => setFilters((prev: any) => ({ ...prev, city }))}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border",
                                                filters.city === city 
                                                    ? "bg-slate-900 border-slate-900 text-white" 
                                                    : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                                            )}
                                        >
                                            {city || 'Tất cả'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Giá tối đa</label>
                                    <span className="text-sm font-black text-primary">{(filters.price_max || 1000000).toLocaleString()}đ</span>
                                </div>
                                <input 
                                    type="range"
                                    min="100000"
                                    max="5000000"
                                    step="50000"
                                    value={filters.price_max || 1000000}
                                    onChange={(e) => setFilters((prev: any) => ({ ...prev, price_max: Number(e.target.value) }))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button 
                                variant="outline" 
                                className="flex-1 h-14 rounded-2xl font-black uppercase tracking-[0.1em] text-xs border-slate-100"
                                onClick={() => {
                                    setFilters({
                                        keyword: '',
                                        rating_min: 0,
                                        sport_type: '',
                                        city: '',
                                        price_max: 2000000
                                    });
                                    setShowFilterModal(false);
                                }}
                            >
                                Đặt lại
                            </Button>
                            <Button 
                                className="flex-2 h-14 rounded-2xl font-black uppercase tracking-[0.1em] text-xs shadow-xl shadow-primary/20"
                                onClick={() => setShowFilterModal(false)}
                            >
                                Áp dụng bộ lọc
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
