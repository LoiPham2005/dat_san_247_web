// 'use client';

// import Link from 'next/link';
// import { Star, MapPin, Heart } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';

// export interface VenueCardProps {
//     id: string;
//     name: string;
//     image: string;
//     address: string;
//     price: number;
//     rating: number;
//     reviews: number;
//     type: string;
//     distance?: string;
//     isFavorite?: boolean;
// }

// export const VenueCard = ({
//     id,
//     name,
//     image,
//     address,
//     price,
//     rating,
//     reviews,
//     type,
//     distance,
//     isFavorite = false
// }: VenueCardProps) => {
//     return (
//         <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
//             {/* Image Section */}
//             <div className="relative h-48 w-full overflow-hidden">
//                 <img
//                     src={image}
//                     alt={name}
//                     className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <button className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all">
//                     <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
//                 </button>
//                 <div className="absolute top-3 left-3">
//                     <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm shadow-sm hover:bg-white">
//                         {type}
//                     </Badge>
//                 </div>
//             </div>

//             {/* Content Section */}
//             <div className="p-4 space-y-3">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
//                             {name}
//                         </h3>
//                         <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
//                             <MapPin className="h-3.5 w-3.5" />
//                             <span className="truncate max-w-[200px]">{address}</span>
//                             {distance && <span>• {distance}</span>}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
//                     <div className="flex items-center gap-1">
//                         <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                         <span className="font-bold text-sm text-gray-900 dark:text-white">{rating}</span>
//                         <span className="text-xs text-gray-500">({reviews})</span>
//                     </div>
//                     <div className="text-right">
//                         <span className="text-xs text-gray-400 block">From</span>
//                         <span className="font-bold text-primary-600 text-lg">
//                             {price.toLocaleString()}đ
//                             <span className="text-xs font-normal text-gray-500">/h</span>
//                         </span>
//                     </div>
//                 </div>

//                 <Link href={`/venues/${id}`} className="block mt-4">
//                     <Button className="w-full bg-gray-900 hover:bg-primary-600 text-white transition-colors dark:bg-gray-800 dark:hover:bg-primary-600">
//                         Book Now
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//     );
// };













'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Heart, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { venueService } from '@/lib/api/services/venue.service';
import { useToast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/lib/store/auth.store';
import { cn } from '@/lib/utils/format';

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
    isFavorite: initialIsFavorite = false
}: VenueCardProps) => {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const { isAuthenticated } = useAuthStore();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const toggleFavoriteMutation = useMutation({
        mutationFn: async () => {
            if (!isAuthenticated) throw new Error('Auth required');
            return isFavorite ? venueService.removeFromFavorite(id) : venueService.addToFavorite(id);
        },
        onSuccess: () => {
            setIsFavorite(!isFavorite);
            toast({
                title: isFavorite ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
                description: name,
            });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
        onError: (error: any) => {
            if (error.message === 'Auth required') {
                toast({
                    title: "Yêu cầu đăng nhập",
                    description: "Vui lòng đăng nhập để lưu sân vào mục yêu thích.",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Lỗi",
                    description: "Không thể cập nhật danh sách yêu thích.",
                    variant: "destructive"
                });
            }
        }
    });

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavoriteMutation.mutate();
    };

    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                />
                <button
                    onClick={handleFavoriteClick}
                    disabled={toggleFavoriteMutation.isPending}
                    className={cn(
                        "absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg",
                        isFavorite
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white hover:text-red-500"
                    )}
                >
                    {toggleFavoriteMutation.isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
                    )}
                </button>
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm shadow-sm hover:bg-white border-none py-1.5 px-4 font-black uppercase text-[10px] tracking-widest">
                        {type}
                    </Badge>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-black text-xl text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
                            <MapPin className="h-3.5 w-3.5 text-primary-500" />
                            <span className="truncate max-w-[200px]">{address}</span>
                            {distance && <span>• {distance}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-black text-sm text-yellow-700 dark:text-yellow-500">{rating}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">({reviews} reviews)</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] block">Starting from</span>
                        <span className="font-black text-primary-600 text-2xl tracking-tighter">
                            {price.toLocaleString()}đ
                            <span className="text-xs font-bold text-gray-400 tracking-normal ml-0.5">/h</span>
                        </span>
                    </div>
                </div>

                <Link href={`/venues/${id}`} className="block mt-2">
                    <Button className="w-full h-14 bg-gray-900 hover:bg-primary-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-xl shadow-gray-900/10 dark:bg-gray-800 dark:hover:bg-primary-600">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};
