'use client';

import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop"
                    alt="Sports Field"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8">
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        Find Your Perfect <span className="text-primary-500">Field</span>
                        <br />Play Without Limits
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Discover and book top-rated football fields, tennis courts, and badminton halls near you. Instant booking, transparent pricing.
                    </p>
                </div>

                {/* Search Box */}
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-700 delay-200">
                    <div className="flex flex-col md:flex-row gap-2">
                        {/* Search Input */}
                        <div className="flex-1 bg-white rounded-xl flex items-center px-4 h-12 md:h-14 group focus-within:ring-2 ring-primary-500/50 transition-all">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, sport, or location..."
                                className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-400 px-3"
                            />
                        </div>

                        {/* Location Dropdown (Mock) */}
                        <div className="md:w-48 bg-white rounded-xl flex items-center px-4 h-12 md:h-14 border-l md:border-l-0 border-gray-100">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <select className="w-full bg-transparent border-none focus:outline-none text-gray-900 cursor-pointer ml-2">
                                <option>Ha Noi</option>
                                <option>Ho Chi Minh</option>
                                <option>Da Nang</option>
                            </select>
                        </div>

                        {/* Date Picker (Mock) */}
                        <div className="md:w-48 bg-white rounded-xl flex items-center px-4 h-12 md:h-14 border-l md:border-l-0 border-gray-100">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="w-full bg-transparent border-none focus:outline-none text-gray-900 ml-2 cursor-pointer"
                            />
                        </div>

                        {/* Search Button */}
                        <Button className="h-12 md:h-14 px-8 text-lg font-bold bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-600/30 rounded-xl transition-all hover:scale-105 active:scale-95">
                            Search
                        </Button>
                    </div>
                </div>

                {/* Quick Tags */}
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300 animate-in fade-in duration-1000 delay-500">
                    <span>Popular:</span>
                    <button className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">Soccer</button>
                    <button className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">Tennis</button>
                    <button className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">Badminton</button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll-down" />
                </div>
            </div>
        </section>
    );
};
