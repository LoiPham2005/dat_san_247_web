'use client';

import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_REVIEWS } from '@/lib/constants/mock-data';

export const VenueReviews = () => {
    // Filter published reviews
    const reviews = MOCK_REVIEWS.filter(r => r.status === 'PUBLISHED').slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Guest Reviews</h3>
                <Button variant="outline">Write a Review</Button>
            </div>

            {/* Rating Summary */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left">
                    <div className="text-5xl font-black text-gray-900 dark:text-white">4.8</div>
                    <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 my-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                    <p className="text-sm text-gray-500">Based on 124 reviews</p>
                </div>

                <div className="flex-1 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-sm font-bold w-3">{star}</span>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
                {reviews.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${review.customer}&background=random`} alt={review.customer} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{review.customer}</h4>
                                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">
                                        {review.rating} <Star className="h-3 w-3 fill-current" />
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed">
                                    {review.comment}
                                </p>
                                <div className="mt-3 flex items-center gap-4">
                                    <button className="flex items-center gap-1 text-gray-400 text-xs hover:text-primary-600 transition-colors">
                                        <ThumbsUp className="h-3 w-3" /> Helpful
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="ghost" className="w-full text-primary-600">
                View All Reviews
            </Button>
        </div>
    );
};
