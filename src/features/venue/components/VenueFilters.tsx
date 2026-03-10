"use client";

import React from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, MapPin, Trophy, ChevronDown, Filter } from 'lucide-react';

export const VenueFilters = () => {
    return (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" /> Bộ lọc tìm kiếm
                </h3>
                <button className="text-xs text-primary font-bold hover:underline">Xóa tất cả</button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sân / Địa chỉ</label>
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Nhập từ khóa..."
                        className="pl-10 h-10 border-slate-200 focus:border-primary bg-slate-50/50"
                    />
                </div>
            </div>

            {/* Sport Type */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Môn thể thao</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Tất cả', 'Bóng đá', 'Cầu lông', 'Tennis', 'Bóng rổ', 'Bóng bàn'].map((sport) => (
                        <button
                            key={sport}
                            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${sport === 'Tất cả'
                                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-primary/30'
                                }`}
                        >
                            {sport}
                        </button>
                    ))}
                </div>
            </div>

            {/* Location Selector */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khu vực</label>
                <div className="relative cursor-pointer">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <div className="flex items-center justify-between w-full h-10 pl-10 pr-3 text-sm border border-slate-200 rounded-md bg-slate-50/50 text-slate-600 font-medium">
                        Tất cả quận/huyện
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khoảng giá (đ/giờ)</label>
                    <span className="text-[10px] font-bold text-primary">0 - 1.000k+</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                    <span>0</span>
                    <span>500k</span>
                    <span>1.000k+</span>
                </div>
            </div>

            <Button className="w-full mt-2 font-bold shadow-lg shadow-primary/20 rounded-xl">
                Áp dụng bộ lọc
            </Button>
        </div>
    );
};
