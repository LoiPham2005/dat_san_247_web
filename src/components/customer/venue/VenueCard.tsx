'use client';

import Link from 'next/link';
import { Star, MapPin, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface VenueCardProps {
    id: string;
    name: string;
    image: string;
    address: string;
    price: number;
    rating: number;
    reviews: number;
    type: string;
    distance?: string;
    isFavorite?: boolean;
}

export const VenueCard = ({
    id,
    name,
    image,
    address,
    price,
    rating,
    reviews,
    type,
    distance,
    isFavorite = false
}: VenueCardProps) => {
    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm shadow-sm hover:bg-white">
                        {type}
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate max-w-[200px]">{address}</span>
                            {distance && <span>• {distance}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm text-gray-900 dark:text-white">{rating}</span>
                        <span className="text-xs text-gray-500">({reviews})</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-400 block">From</span>
                        <span className="font-bold text-primary-600 text-lg">
                            {price.toLocaleString()}đ
                            <span className="text-xs font-normal text-gray-500">/h</span>
                        </span>
                    </div>
                </div>

                <Link href={`/venues/${id}`} className="block mt-4">
                    <Button className="w-full bg-gray-900 hover:bg-primary-600 text-white transition-colors dark:bg-gray-800 dark:hover:bg-primary-600">
                        Book Now
                    </Button>
                </Link>
            </div>
        </div>
    );
};
