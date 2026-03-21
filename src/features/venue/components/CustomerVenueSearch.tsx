"use client";

import React, { useState } from 'react';
import { useVenueSearch, useSearchHistory, useUserFavorites } from '../hooks/useVenueSearch';
import { VenueCard } from './VenueCard';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, MapPin, Target, History, X, Clock, SlidersHorizontal, Map, Filter, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const CustomerVenueSearch = () => {
    const { data: session } = useSession();
    const [keyword, setKeyword] = useState('');
    const [sportType, setSportType] = useState('');
    
    const [priceMin, setPriceMin] = useState<number | undefined>();
    const [priceMax, setPriceMax] = useState<number | undefined>();
    const [activePriceFilter, setActivePriceFilter] = useState<string>('');

    // Filters for actual API trigger
    const [appliedFilters, setAppliedFilters] = useState({ priceMin: undefined as number|undefined, priceMax: undefined as number|undefined });

    const handleApplyFilters = () => {
        setAppliedFilters({ priceMin, priceMax });
    };

    // Auto trigger search whenever core params change.
    const { data: venues, isLoading } = useVenueSearch({ 
        keyword, 
        sport_type: sportType,
        price_min: appliedFilters.priceMin,
        price_max: appliedFilters.priceMax
    });
    const { history, clearHistory, saveHistory } = useSearchHistory(!!session);
    const { favorites } = useUserFavorites(!!session);

    const handleSearch = () => {
        if (keyword.trim()) {
            saveHistory({ keyword, sportType });
        }
    };

    const triggerSearch = (term: string) => {
        setKeyword(term);
        saveHistory({ keyword: term, sportType });
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in">
            {/* HERO MÀN HÌNH TÌM KIẾM */}
            <div className="bg-gradient-to-br from-indigo-900 via-primary to-indigo-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 relative z-10">
                    Tìm Kiếm Sân Thể Thao Dễ Dàng
                </h1>
                <p className="text-indigo-100 font-medium md:text-lg mb-8 max-w-2xl mx-auto relative z-10">
                    Hàng ngàn sân bóng, sân cầu lông, tennis trên toàn quốc đang chờ bạn khám phá. Đặt sân siêu tốc qua vài chạm!
                </p>

                {/* SEARCH BAR CHÍNH */}
                <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-lg relative z-20 flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                            placeholder="Tìm tên sân, khu vực hoặc quận/huyện..." 
                            className="w-full h-14 pl-12 border-none bg-transparent hover:bg-slate-50 focus:ring-0 text-slate-800 font-semibold placeholder:font-medium placeholder:text-slate-400 rounded-xl"
                        />
                    </div>
                    
                    <div className="hidden md:block w-px h-8 bg-slate-200 self-center"></div>
                    
                    <div className="relative md:w-48 xl:w-64">
                        <Target className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select 
                            value={sportType}
                            onChange={(e) => setSportType(e.target.value)}
                            className="w-full h-14 pl-12 border-none bg-transparent hover:bg-slate-50 focus:ring-0 text-slate-800 font-semibold outline-none cursor-pointer rounded-xl appearance-none"
                        >
                            <option value="">Tất cả môn</option>
                            <option value="FOOTBALL_5">Bóng Đá Sân 5</option>
                            <option value="FOOTBALL_7">Bóng Đá Sân 7</option>
                            <option value="BADMINTON">Cầu Lông</option>
                            <option value="TENNIS">Tennis</option>
                        </select>
                    </div>

                    <Button onClick={handleSearch} className="h-14 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 hidden md:flex">
                        Tìm Kiếm
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* CỘT TRÁI (Lịch sử tìm kiếm & Filter) */}
                <div className="w-full lg:w-72 shrink-0 space-y-6">
                    {session && (
                        <Card className="p-5 border-slate-200/80 shadow-sm rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <History className="w-4 h-4 text-primary" /> Lịch sử tìm kiếm
                                </h3>
                                {history.length > 0 && (
                                    <button onClick={() => clearHistory()} className="text-[10px] font-bold uppercase text-slate-400 hover:text-rose-500">
                                        Xóa hết
                                    </button>
                                )}
                            </div>
                            
                            {history.length > 0 ? (
                                <div className="space-y-2">
                                    {history.map((h: any) => (
                                        <button 
                                            key={h.id} 
                                            onClick={() => triggerSearch(h.keyword || '')} 
                                            className="w-full text-left flex items-center gap-2 group p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                                        >
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors line-clamp-1 flex-1">
                                                {h.keyword}
                                            </span>
                                            <X className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-xs text-slate-500 font-medium text-center py-2">Bạn chưa có lịch sử tìm kiếm.</div>
                            )}
                        </Card>
                    )}

                    <Card className="p-5 border-slate-200/80 shadow-sm rounded-2xl hidden lg:block">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                            <SlidersHorizontal className="w-4 h-4 text-primary" /> Lọc Kết Quả
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Mức Giá / Giờ</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="price_filter" checked={activePriceFilter === 'UNDER_100'} onChange={() => { setActivePriceFilter('UNDER_100'); setPriceMin(undefined); setPriceMax(100000); }} className="text-primary focus:ring-primary w-4 h-4" /> <span className="text-sm font-medium text-slate-700">Dưới 100k</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="price_filter" checked={activePriceFilter === '100_TO_300'} onChange={() => { setActivePriceFilter('100_TO_300'); setPriceMin(100000); setPriceMax(300000); }} className="text-primary focus:ring-primary w-4 h-4" /> <span className="text-sm font-medium text-slate-700">100k - 300k</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="price_filter" checked={activePriceFilter === 'ABOVE_300'} onChange={() => { setActivePriceFilter('ABOVE_300'); setPriceMin(300000); setPriceMax(undefined); }} className="text-primary focus:ring-primary w-4 h-4" /> <span className="text-sm font-medium text-slate-700">Trên 300k</span>
                                    </label>
                                    <button onClick={() => { setActivePriceFilter(''); setPriceMin(undefined); setPriceMax(undefined); handleApplyFilters(); }} className="text-xs font-bold text-slate-400 hover:text-slate-600 mt-2">Bỏ xóa bộ lọc giá</button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tiện Ích</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" /> <span className="text-sm font-medium text-slate-700">Bãi đỗ ô tô</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" /> <span className="text-sm font-medium text-slate-700">Cho thuê dụng cụ</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" /> <span className="text-sm font-medium text-slate-700">Trọng tài / HLV</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleApplyFilters} className="w-full mt-6 bg-slate-900 hover:bg-slate-800 font-bold rounded-xl h-10">Áp dụng bộ lọc</Button>
                    </Card>
                </div>

                {/* CỘT PHẢI (Danh Sách Sân) */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            {keyword ? `Kết quả tìm kiếm cho "${keyword}"` : "Sân Thể Thao Đề Xuất Cho Bạn"}
                        </h2>
                        <Button variant="outline" className="h-9 px-3 border-slate-200 hidden lg:flex rounded-xl font-bold text-slate-600 hover:text-slate-900">
                            <Map className="w-4 h-4 mr-2" /> Xem trên Bản Đồ
                        </Button>
                        <Button variant="outline" className="h-9 w-9 p-0 border-slate-200 lg:hidden flex items-center justify-center rounded-xl text-slate-600">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12 text-slate-500 font-medium">Đang tìm bãi đáp cho bạn...</div>
                    ) : venues && venues.length === 0 ? (
                        <Card className="text-center py-16 border-slate-200 border-dashed rounded-3xl bg-white shadow-sm">
                            <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-700 mb-1">Oh không! Chưa có sân phù hợp.</h3>
                            <p className="text-sm font-medium text-slate-500 mb-6">Cố gắng thu hẹp bộ lọc hoặc tìm với từ khóa chung chung hơn nhé.</p>
                            <Button onClick={() => setKeyword('')} className="bg-primary hover:bg-primary/90 font-bold rounded-xl px-6 h-10">Xóa tìm kiếm & Xem sân hot</Button>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {venues?.map((venue: any) => (
                                <VenueCard 
                                    key={venue.id} 
                                    venue={{...venue, rating: venue.average_rating, total_reviews: venue.review_count}} 
                                    isFavorite={favorites.some((f: any) => f.venue_id === venue.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
};
