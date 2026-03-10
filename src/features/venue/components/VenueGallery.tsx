"use client";

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface VenueGalleryProps {
    images?: string[];
}

export const VenueGallery: React.FC<VenueGalleryProps> = ({ images }) => {
    const [activeImage, setActiveImage] = React.useState(0);

    // Mock images if none provided
    const displayImages = images?.length ? images : [
        'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1200',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800',
        'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=800',
        'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800'
    ];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                <img
                    src={displayImages[activeImage]}
                    alt="Venue Gallery Main"
                    className="h-full w-full object-cover transition-opacity duration-300"
                />
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                    {activeImage + 1} / {displayImages.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {displayImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={cn(
                            "relative flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all",
                            activeImage === idx ? "border-primary ring-2 ring-primary/20 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};
