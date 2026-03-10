"use client";

import React from 'react';
import {
    Wifi,
    Car,
    Coffee,
    GlassWater,
    ShowerHead,
    Wind,
    Zap,
    CheckCircle2
} from 'lucide-react';

interface Amenity {
    name: string;
    is_free: boolean;
    icon?: string;
}

const iconMap: Record<string, React.ReactNode> = {
    'Wifi': <Wifi className="w-4 h-4" />,
    'Bãi đỗ xe': <Car className="w-4 h-4" />,
    'Cafeteria': <Coffee className="w-4 h-4" />,
    'Nước miễn phí': <GlassWater className="w-4 h-4" />,
    'Phòng tắm': <ShowerHead className="w-4 h-4" />,
    'Máy lạnh': <Wind className="w-4 h-4" />,
    'Đèn chiếu sáng': <Zap className="w-4 h-4" />
};

export const VenueAmenities: React.FC<{ amenities: Amenity[] }> = ({ amenities }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {amenities.map((item) => (
                <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-sm transition-all"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
                        {iconMap[item.name] || <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 leading-tight">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                            {item.is_free ? 'Miễn phí' : 'Có phí'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
