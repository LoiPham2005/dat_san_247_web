'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

export const VenueFilters = ({ className, onFilterChange }: { className?: string, onFilterChange?: (filters: any) => void }) => {
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const handleSportChange = (sport: string, checked: boolean) => {
        if (onFilterChange) {
            onFilterChange({ sportType: checked ? sport : '' });
        }
    };

    const handlePriceChange = () => {
        if (onFilterChange) {
            onFilterChange({
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined
            });
        }
    };

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        const updated = checked
            ? [...selectedAmenities, amenity]
            : selectedAmenities.filter(a => a !== amenity);

        setSelectedAmenities(updated);
        if (onFilterChange) {
            onFilterChange({ amenities: updated.join(',') });
        }
    };

    const handleRatingChange = (rating: string, checked: boolean) => {
        if (onFilterChange) {
            onFilterChange({ rating: checked ? Number(rating.split(' ')[0]) : undefined });
        }
    };

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setSelectedAmenities([]);
        if (onFilterChange) {
            onFilterChange({
                sportType: '',
                minPrice: undefined,
                maxPrice: undefined,
                rating: undefined,
                amenities: ''
            });
        }
    };

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2 uppercase tracking-tighter">
                    <Filter className="h-5 w-5 text-primary-600" /> Filters
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 uppercase font-bold text-[10px] tracking-widest"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={['sport', 'price', 'amenities']} className="w-full">
                {/* Sport Type */}
                <AccordionItem value="sport" className="border-gray-100 dark:border-gray-800">
                    <AccordionTrigger className="font-bold uppercase text-[11px] tracking-widest hover:text-primary-600 transition-colors py-4">Sport Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2 pb-4">
                            <CheckboxLabel label="Soccer" value="FOOTBALL" onChange={handleSportChange} />
                            <CheckboxLabel label="Tennis" value="TENNIS" onChange={handleSportChange} />
                            <CheckboxLabel label="Badminton" value="BADMINTON" onChange={handleSportChange} />
                            <CheckboxLabel label="Basketball" value="BASKETBALL" onChange={handleSportChange} />
                            <CheckboxLabel label="Volleyball" value="VOLLEYBALL" onChange={handleSportChange} />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price" className="border-gray-100 dark:border-gray-800">
                    <AccordionTrigger className="font-bold uppercase text-[11px] tracking-widest hover:text-primary-600 transition-colors py-4">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2 pb-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary-500 transition-all"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        onBlur={handlePriceChange}
                                    />
                                    <span className="absolute right-3 top-3 text-[10px] text-gray-400 font-bold">đ</span>
                                </div>
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary-500 transition-all"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        onBlur={handlePriceChange}
                                    />
                                    <span className="absolute right-3 top-3 text-[10px] text-gray-400 font-bold">đ</span>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Amenities */}
                <AccordionItem value="amenities" className="border-gray-100 dark:border-gray-800">
                    <AccordionTrigger className="font-bold uppercase text-[11px] tracking-widest hover:text-primary-600 transition-colors py-4">Amenities</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2 pb-4">
                            <CheckboxLabel label="Free Wi-Fi" value="Wifi" onChange={handleAmenityChange} />
                            <CheckboxLabel label="Parking" value="Parking" onChange={handleAmenityChange} />
                            <CheckboxLabel label="Shower" value="Shower" onChange={handleAmenityChange} />
                            <CheckboxLabel label="Canteen" value="Canteen" onChange={handleAmenityChange} />
                            <CheckboxLabel label="Lighting" value="Lighting" onChange={handleAmenityChange} />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Rating */}
                <AccordionItem value="rating" className="border-gray-100 dark:border-gray-800 border-none">
                    <AccordionTrigger className="font-bold uppercase text-[11px] tracking-widest hover:text-primary-600 transition-colors py-4">Min Rating</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2 pb-4">
                            <CheckboxLabel label="5 Stars" value="5" onChange={handleRatingChange} />
                            <CheckboxLabel label="4 Stars & Up" value="4" onChange={handleRatingChange} />
                            <CheckboxLabel label="3 Stars & Up" value="3" onChange={handleRatingChange} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

function CheckboxLabel({ label, value, onChange, count }: { label: string, value?: string, onChange?: (val: string, checked: boolean) => void, count?: number }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
                    onChange={(e) => onChange && value && onChange(value, e.target.checked)}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{label}</span>
            </div>
            {count && <Badge variant="secondary" className="text-[10px] text-gray-500 font-bold">{count}</Badge>}
        </label>
    );
}
