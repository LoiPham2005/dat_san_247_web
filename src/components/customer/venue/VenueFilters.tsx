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

export const VenueFilters = ({ className }: { className?: string }) => {
    const [priceRange, setPriceRange] = useState([0, 1000000]);

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                </h3>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Reset
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={['sport', 'price', 'amenities']} className="w-full">
                {/* Sport Type */}
                <AccordionItem value="sport">
                    <AccordionTrigger className="font-semibold">Sport Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <CheckboxLabel label="Soccer" count={120} />
                            <CheckboxLabel label="Tennis" count={45} />
                            <CheckboxLabel label="Badminton" count={80} />
                            <CheckboxLabel label="Basketball" count={30} />
                            <CheckboxLabel label="Pickleball" count={25} />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between text-sm font-medium">
                                <span>0đ</span>
                                <span>1,000,000đ+</span>
                            </div>
                            {/* Mock Slider - In real app use Slider component */}
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                className="w-full accent-primary-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex gap-2">
                                <input type="number" placeholder="Min" className="w-full p-2 border rounded-md text-sm" />
                                <input type="number" placeholder="Max" className="w-full p-2 border rounded-md text-sm" />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Amenities */}
                <AccordionItem value="amenities">
                    <AccordionTrigger className="font-semibold">Amenities</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <CheckboxLabel label="Free Wi-Fi" />
                            <CheckboxLabel label="Parking" />
                            <CheckboxLabel label="Shower" />
                            <CheckboxLabel label="Canteen" />
                            <CheckboxLabel label="Equipment Rental" />
                            <CheckboxLabel label="Lighting" />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Rating */}
                <AccordionItem value="rating">
                    <AccordionTrigger className="font-semibold">Rating</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <CheckboxLabel label="5 Stars" />
                            <CheckboxLabel label="4 Stars & Up" />
                            <CheckboxLabel label="3 Stars & Up" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

function CheckboxLabel({ label, count }: { label: string, count?: number }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">{label}</span>
            </div>
            {count && <Badge variant="secondary" className="text-[10px] text-gray-500">{count}</Badge>}
        </label>
    );
}
