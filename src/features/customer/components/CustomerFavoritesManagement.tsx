"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerFavoritesApi, FavoriteVenue } from '../api/customer-favorites.api';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Heart, MapPin, Star, Trash2, ArrowRight, Store } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';

export const CustomerFavoritesManagement = () => {
    const queryClient = useQueryClient();

    const { data: favorites, isLoading } = useQuery({
        queryKey: ['customer_favorites'],
        queryFn: customerFavoritesApi.getFavorites
    });

    const removeMutation = useMutation({
        mutationFn: customerFavoritesApi.removeFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer_favorites'] });
            toast.success('Đã xóa khỏi danh sách yêu thích');
        },
        onError: () => {
            toast.error('Không thể xóa sân lúc này');
        }
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (!favorites || favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-rose-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">Chưa có sân yêu thích</h3>
                <p className="text-slate-500 max-w-xs mb-8">
                    Bạn chưa lưu sân nào vào danh sách yêu thích. Hãy khám phá và lưu lại những sân bạn ưng ý nhất!
                </p>
                <Link href="/venues">
                    <Button className="rounded-xl font-black px-8 h-12">
                        Khám Phá Ngay <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((fav: FavoriteVenue) => (
                <Card key={fav.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                    <div className="flex h-full">
                        {/* Thumbnail */}
                        <div className="w-1/3 relative overflow-hidden">
                            <img 
                                src={fav.venue.thumbnail_url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'} 
                                alt={fav.venue.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors line-clamp-1">
                                        {fav.venue.name}
                                    </h3>
                                    <button 
                                        onClick={() => removeMutation.mutate(fav.venue_id)}
                                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                        title="Xóa khỏi yêu thích"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <div className="flex items-center text-[10px] text-slate-400 mb-3 uppercase tracking-wider font-bold">
                                    <MapPin className="w-3 h-3 mr-1 text-primary/60" />
                                    <span className="truncate">{fav.venue.address}</span>
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-md">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                                        <span className="text-xs font-black text-amber-700">{fav.venue.average_rating}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fav.venue.review_count} đánh giá</span>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-2">
                                    {fav.venue.sports?.slice(0, 3).map((sport) => (
                                        <span key={sport} className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-black text-slate-500 rounded uppercase">
                                            {sport}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-slate-300 uppercase">Giá từ</span>
                                    <span className="text-sm font-black text-primary">{Number(fav.venue.min_price).toLocaleString()}₫</span>
                                </div>
                                <Link href={`/venues/${fav.venue.slug}`}>
                                    <Button size="sm" variant="ghost" className="text-primary font-black text-xs hover:bg-primary/5 rounded-lg px-3">
                                        Chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
