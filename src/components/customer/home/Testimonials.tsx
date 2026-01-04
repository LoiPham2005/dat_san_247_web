'use client';

import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: "Minh Tuan",
        role: "Football Captain",
        avatar: "https://ui-avatars.com/api/?name=Minh+Tuan&background=random",
        rating: 5,
        text: "DatSan247 made organizing our weekly matches so much easier. We can find fields instantly and splitting the bill is a breeze!"
    },
    {
        name: "Sarah Nguyen",
        role: "Tennis Player",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Nguyen&background=random",
        rating: 5,
        text: "I love the detailed court information and photos. No more surprises when we show up to play. Highly recommended!"
    },
    {
        name: "David Tran",
        role: "Badminton Coach",
        avatar: "https://ui-avatars.com/api/?name=David+Tran&background=random",
        rating: 4,
        text: "Great platform for finding available slots during peak hours. Customer support is also very responsive."
    }
];

export const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Players Say</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Join thousands of satisfied sports enthusiasts who trust us for their game days.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative">
                            <Quote className="absolute top-8 right-8 h-8 w-8 text-primary-100 dark:text-primary-900/20 fill-current" />

                            <div className="flex items-center gap-1 text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < item.rating ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
