'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PromotionsPage() {
    const promotions = [
        {
            id: 1,
            title: 'Early Bird Special',
            description: 'Book 3 days in advance and get 20% off on all soccer fields.',
            code: 'EARLYBIRD20',
            expiry: 'Expires: Dec 31, 2024',
            type: '20% OFF',
            color: 'bg-blue-50 text-blue-700 border-blue-200'
        },
        {
            id: 2,
            title: 'Weekend Warrior',
            description: 'Special rates for weekend bookings between 8 AM and 4 PM.',
            code: 'WEEKENDFUN',
            expiry: 'Expires: Ongoing',
            type: 'FIXED 50K OFF',
            color: 'bg-green-50 text-green-700 border-green-200'
        },
        {
            id: 3,
            title: 'First Booking Bonus',
            description: 'New to DatSan247? Enjoy a massive discount on your first venue booking.',
            code: 'WELCOME50',
            expiry: 'Limited Time',
            type: '50% OFF',
            color: 'bg-purple-50 text-purple-700 border-purple-200'
        },
        {
            id: 4,
            title: 'Student Discount',
            description: 'Flash your student ID and get student-exclusive rates on weekdays.',
            code: 'STUDENTSTAY',
            expiry: 'Ongoing',
            type: '15% OFF',
            color: 'bg-orange-50 text-orange-700 border-orange-200'
        }
    ];

    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-100 border-none px-4 py-1">Exclusive Deals</Badge>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Special Promotions & Offers
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Save more on your favorite sports activities. Discover the best deals and limited-time offers available only on DatSan247.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {promotions.map((promo) => (
                    <Card key={promo.id} className="overflow-hidden border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className={`h-2 w-full ${promo.color.split(' ')[0]}`} />
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-bold">{promo.title}</CardTitle>
                                <Badge variant="outline" className={promo.color}>
                                    {promo.type}
                                </Badge>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                <Gift className="h-6 w-6 text-primary-600" />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {promo.description}
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    <span>{promo.expiry}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Tag className="h-4 w-4" />
                                    <span>Promo Code: <span className="font-mono font-bold text-gray-900 dark:text-white">{promo.code}</span></span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button className="text-primary-600 font-semibold hover:underline flex items-center gap-1 text-sm">
                                View Terms & Conditions
                            </button>
                            <Link href="/venues">
                                <Button className="bg-primary-600 hover:bg-primary-700 gap-2">
                                    Book Now <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Newsletter section */}
            <div className="mt-20 p-8 md:p-12 bg-primary-600 rounded-3xl text-white overflow-hidden relative">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">Don't miss out on new deals!</h2>
                    <p className="text-primary-100 mb-8">
                        Subscribe to our newsletter to receive the latest promotions, new venue alerts, and sports tips directly in your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-grow rounded-xl bg-white/10 border border-white/20 px-6 py-4 text-white placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <Button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 h-auto font-bold rounded-xl">
                            Subscribe
                        </Button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 rounded-full bg-white/10" />
                <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 h-96 w-96 rounded-full bg-white/5" />
            </div>
        </div>
    );
}
