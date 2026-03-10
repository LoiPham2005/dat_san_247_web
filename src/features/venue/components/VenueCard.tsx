"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { MapPin, Star, Clock } from 'lucide-react';

interface VenueCardProps {
    venue: {
        id: string;
        name: string;
        slug: string;
        address: string;
        city: string;
        district: string;
        thumbnail_url?: string | null;
        rating: number;
        total_reviews: number;
        sports: string[];
        min_price: number;
    };
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
    return (
        <Link href={`/venues/${venue.slug}`} className="block group">
            <Card className="h-full overflow-hidden border-slate-200/60 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 bg-white">
                {/* Thumbnail with Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    {venue.thumbnail_url ? (
                        <img
                            src={venue.thumbnail_url}
                            alt={venue.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary/30 font-bold text-2xl tracking-widest italic group-hover:scale-110 transition-transform duration-500">
                            SPORT VENUE
                        </div>
                    )}

                    {/* Status/Rating Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {venue.rating.toFixed(1)}
                        </div>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                        Đang mở
                    </div>
                </div>

                <CardHeader className="pb-3 pt-4">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                            {venue.name}
                        </CardTitle>
                    </div>
                    <CardDescription className="flex items-start gap-1.5 mt-1 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{venue.district}, {venue.city}</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {venue.sports.slice(0, 3).map((sport) => (
                            <span
                                key={sport}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold rounded-full uppercase"
                            >
                                {sport}
                            </span>
                        ))}
                        {venue.sports.length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-medium rounded-full">
                                +{venue.sports.length - 3}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-4">
                        <Clock className="w-3.5 h-3.5" />
                        <span>06:00 - 22:00</span>
                    </div>
                </CardContent>

                <CardFooter className="pt-4 flex justify-between items-center border-t border-slate-50 px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Giá chỉ từ</span>
                        <div className="font-bold text-slate-900 leading-none">
                            <span className="text-lg text-primary">{venue.min_price.toLocaleString()}đ</span>
                            <span className="text-[10px] font-normal text-slate-500 ml-0.5">/giờ</span>
                        </div>
                    </div>
                    <Button size="sm" className="font-bold rounded-lg shadow-sm">
                        Chi tiết
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};
