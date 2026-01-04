'use client';

import { Search, CalendarCheck, CreditCard, RotateCw } from 'lucide-react';

const STEPS = [
    {
        icon: Search,
        title: "Search",
        desc: "Find the perfect field by location, sport, or price."
    },
    {
        icon: CalendarCheck,
        title: "Book",
        desc: "Select a time slot and confirm your booking instantly."
    },
    {
        icon: CreditCard,
        title: "Pay",
        desc: "Secure payment via Card, E-Wallet or Pay at Venue."
    },
    {
        icon: RotateCw,
        title: "Repeat",
        desc: "Save your favorites and rebook with a single click."
    }
];

export const HowItWorks = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Booking your next game is easier than ever. Just follow these simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100 dark:bg-gray-800 -z-10" />

                    {STEPS.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center mb-6 shadow-sm group-hover:border-primary-500 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300 relative">
                                <step.icon className="h-10 w-10 text-gray-400 group-hover:text-primary-600 transition-colors" />
                                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-950">
                                    {idx + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed px-4">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
