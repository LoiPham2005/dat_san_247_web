'use client';

import {
    Trophy,
    Activity,
    Target,
    Dumbbell,
    User,
    Users,
    Zap
} from 'lucide-react';

const CATEGORIES = [
    { name: 'Soccer', icon: Trophy, count: '120+ Fields', color: 'bg-green-500', shadow: 'shadow-green-500/30' },
    { name: 'Tennis', icon: Activity, count: '45+ Courts', color: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
    { name: 'Badminton', icon: Zap, count: '80+ Courts', color: 'bg-yellow-500', shadow: 'shadow-yellow-500/30' },
    { name: 'Basketball', icon: Target, count: '30+ Courts', color: 'bg-orange-500', shadow: 'shadow-orange-500/30' },
    { name: 'Gym', icon: Dumbbell, count: '50+ Centers', color: 'bg-red-500', shadow: 'shadow-red-500/30' },
    { name: 'Pickleball', icon: Users, count: '25+ Courts', color: 'bg-purple-500', shadow: 'shadow-purple-500/30' },
];

export const SportsCategories = () => {
    return (
        <section className="py-16 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore by Sport</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Find the perfect venue for your favorite sport. We have the largest network of sports facilities in the city.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {CATEGORIES.map((cat, idx) => (
                        <div
                            key={idx}
                            className="group cursor-pointer flex flex-col items-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`h-14 w-14 rounded-full ${cat.color} ${cat.shadow} shadow-lg flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110`}>
                                <cat.icon className="h-7 w-7" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                            <p className="text-xs text-gray-500">{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
