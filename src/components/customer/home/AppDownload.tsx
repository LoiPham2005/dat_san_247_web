'use client';

import { Button } from '@/components/ui/button';
import { Apple, Smartphone } from 'lucide-react';

export const AppDownload = () => {
    return (
        <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Book Faster with our <br />
                            <span className="text-primary-500">Mobile App</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-lg">
                            Get real-time notifications, exclusive app-only deals, and manage your bookings on the go. Available for iOS and Android.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="h-14 px-8 bg-white text-gray-900 hover:bg-gray-100 rounded-xl flex items-center gap-3">
                                <Apple className="h-6 w-6" />
                                <div className="text-left">
                                    <p className="text-[10px] font-medium uppercase text-gray-500 leading-none">Download on the</p>
                                    <p className="text-base font-bold leading-none">App Store</p>
                                </div>
                            </Button>
                            <Button className="h-14 px-8 bg-transparent border border-gray-700 text-white hover:bg-gray-800 rounded-xl flex items-center gap-3">
                                <Smartphone className="h-6 w-6" />
                                <div className="text-left">
                                    <p className="text-[10px] font-medium uppercase text-gray-400 leading-none">Get it on</p>
                                    <p className="text-base font-bold leading-none">Google Play</p>
                                </div>
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 pt-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-gray-900 bg-gray-800" />
                                ))}
                            </div>
                            <p>Trusted by <span className="text-white font-bold">50k+</span> players</p>
                        </div>
                    </div>

                    <div className="md:w-1/2 relative">
                        <div className="relative z-10 mx-auto w-[280px] h-[560px] bg-gray-800 rounded-[40px] border-8 border-gray-900 shadow-2xl">
                            {/* Screen Content Mock */}
                            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900/10 z-20 flex justify-center">
                                    <div className="w-32 h-4 bg-gray-900 rounded-b-xl" />
                                </div>
                                <img
                                    src="https://cdn.dribbble.com/users/2322685/screenshots/6226920/main-01_4x.png" // Placeholder UI
                                    alt="App Screen"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[600px] border border-gray-700 rounded-[50px] -z-10 rotate-6" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[600px] border border-gray-700/50 rounded-[50px] -z-20 -rotate-6" />
                    </div>
                </div>
            </div>
        </section>
    );
};
