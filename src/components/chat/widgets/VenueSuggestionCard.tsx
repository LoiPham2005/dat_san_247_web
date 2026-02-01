import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VenueSuggestionProps {
    data: {
        id: string;
        name: string;
        address: string;
        image: string;
        rating: number;
        reviews: number;
        price: string;
        distance: string;
        availableSlots?: string[];
        promotion?: string;
    }
}

export const VenueSuggestionCard = ({ data }: VenueSuggestionProps) => {
    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {data.rating} ({data.reviews})
                </div>
                {data.promotion && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                        {data.promotion}
                    </div>
                )}
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{data.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{data.address}</span>
                        <span className="text-primary-600 font-bold">• {data.distance}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-gray-50 dark:border-gray-800">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-black">Price Range</p>
                        <p className="font-bold text-primary-600">{data.price}</p>
                    </div>
                    {data.availableSlots && (
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-black">Available</p>
                            <div className="flex gap-1 justify-end mt-0.5">
                                {data.availableSlots.slice(0, 2).map(slot => (
                                    <Badge key={slot} variant="secondary" className="text-[10px] h-5 px-1.5">{slot}</Badge>
                                ))}
                                {data.availableSlots.length > 2 && (
                                    <Badge variant="outline" className="text-[10px] h-5 px-1.5">+{data.availableSlots.length - 2}</Badge>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-1 flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl text-xs h-9 font-bold">Details</Button>
                    <Button className="flex-1 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs h-9 font-bold shadow-lg shadow-primary-500/20">
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    );
};
