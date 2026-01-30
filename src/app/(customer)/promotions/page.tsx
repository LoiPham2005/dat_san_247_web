

'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Calendar, Tag, ArrowRight, Loader2, Info } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { promotionsService } from '@/lib/api/services/promotion.service';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default function PromotionsPage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['promotions'],
        queryFn: () => promotionsService.getPublic(),
    });

    const promotions = data?.items || [];

    const [selectedPromo, setSelectedPromo] = useState<any>(null);

    const formatPromoType = (type: string, value: number) => {
        if (type === 'PERCENTAGE') return `${value}% OFF`;
        if (type === 'FIXED_AMOUNT') return `${formatCurrency(value)} OFF`;
        return 'SPECIAL DEAL';
    };

    const getPromoColor = (type: string) => {
        if (type === 'PERCENTAGE') return 'bg-purple-50 text-purple-700 border-purple-200';
        if (type === 'FIXED_AMOUNT') return 'bg-green-50 text-green-700 border-green-200';
        return 'bg-blue-50 text-blue-700 border-blue-200';
    };

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

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
                </div>
            ) : isError ? (
                <div className="text-center py-20 text-red-500">
                    Failed to load promotions. Please try again later.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {promotions?.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No active promotions at the moment. Check back soon!
                        </div>
                    ) : (
                        (Array.isArray(promotions) ? promotions : []).map((promo: any) => (
                            <Card key={promo.id} className="overflow-hidden border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col group">
                                <div className={`h-2 w-full ${getPromoColor(promo.discountType).split(' ')[0]}`} />
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl font-bold line-clamp-1">{promo.name}</CardTitle>
                                        <Badge variant="outline" className={getPromoColor(promo.discountType)}>
                                            {formatPromoType(promo.discountType, promo.discountValue)}
                                        </Badge>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                        <Gift className="h-6 w-6 text-gray-400 group-hover:text-primary-600" />
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                        {promo.description}
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Tag className="h-4 w-4" />
                                            <span>Promo Code: <span className="font-mono font-bold text-gray-900 dark:text-white px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded ml-1">{promo.code}</span></span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <button
                                        onClick={() => setSelectedPromo(promo)}
                                        className="text-primary-600 font-semibold hover:underline flex items-center gap-1 text-sm"
                                    >
                                        <Info className="h-3 w-3" /> View Terms & Conditions
                                    </button>
                                    <Link href="/venues" className="w-full sm:w-auto">
                                        <Button className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 gap-2">
                                            Book Now <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {/* Terms Modal */}
            <Dialog open={!!selectedPromo} onOpenChange={(open) => !open && setSelectedPromo(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedPromo?.name}</DialogTitle>
                        <DialogDescription>Terms and Conditions</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <span className="text-sm font-medium text-gray-500">Code</span>
                            <span className="font-mono font-bold text-lg text-primary-600">{selectedPromo?.code}</span>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Description</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedPromo?.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium uppercase">Start Date</span>
                                <p className="text-sm font-medium">{selectedPromo && formatDate(selectedPromo.startDate)}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium uppercase">Expires</span>
                                <p className="text-sm font-medium">{selectedPromo && formatDate(selectedPromo.endDate)}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium uppercase">Usage Limit</span>
                                <p className="text-sm font-medium">{selectedPromo?.maxUsage ? `${selectedPromo.maxUsage} times` : 'Unlimited'}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium uppercase">Min Booking Value</span>
                                <p className="text-sm font-medium">{selectedPromo && formatCurrency(selectedPromo.minOrderValue || 0)}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-xs text-gray-500 italic">
                                * This promotion cannot be combined with other offers unless stated otherwise.
                                Subject to availability.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

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
