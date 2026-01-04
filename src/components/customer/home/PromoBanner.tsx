'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromoBanner = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-600 to-purple-600 shadow-2xl shadow-primary-900/20">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-8">
                        <div className="text-white max-w-2xl space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm border border-white/10">
                                <Sparkles className="h-4 w-4 text-yellow-300" />
                                <span>Limited Time Offer</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black leading-tight">
                                Get <span className="text-yellow-300">20% OFF</span> Your First Booking!
                            </h2>
                            <p className="text-lg text-primary-100/90 font-light">
                                Download our app or register now to unlock exclusive deals on top-rated venues near you. Use code <strong className="text-white font-mono bg-white/20 px-2 py-1 rounded">WELCOME20</strong>.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-white text-primary-600 hover:bg-gray-100 font-bold h-12 px-8 rounded-xl shadow-lg">
                                    Book Now
                                </Button>
                                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-12 px-8 rounded-xl bg-transparent">
                                    More Deals <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Illustration/Image Area */}
                        <div className="hidden md:block relative">
                            <img
                                src="https://cdn3d.iconscout.com/3d/premium/thumb/football-player-kicking-ball-5692723-4743288.png"
                                alt="3D Sports Character"
                                className="w-80 lg:w-96 drop-shadow-2xl animate-float"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
