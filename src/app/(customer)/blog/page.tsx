'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    const posts = [
        {
            title: "5 Tips to Improve Your Football Skills",
            excerpt: "Learn the essential drills and techniques to take your game to the next level.",
            date: "Jan 12, 2024",
            category: "Tips & Tricks",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop"
        },
        {
            title: "The Best Badminton Rackets for Beginners",
            excerpt: "Choosing your first racket can be tough. We've compiled a list of the top 5.",
            date: "Jan 08, 2024",
            category: "Equipment",
            image: "https://images.unsplash.com/photo-1626225454282-32bc664f06ec?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Health Benefits of Regular Tennis Matches",
            excerpt: "Discover why tennis is one of the best sports for cardiovascular health.",
            date: "Jan 05, 2024",
            category: "Wellness",
            image: "https://images.unsplash.com/photo-1595435064212-36aa27ca2266?q=80&w=2752&auto=format&fit=crop"
        }
    ];

    return (
        <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <Badge className="mb-4 bg-primary-100 text-primary-700">Community & News</Badge>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Blog & News</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
                        Stay updated with the latest sports trends, venue news, and expert tips from our community.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">All categories</Button>
                    <Button variant="outline">Newest</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                    <Card key={idx} className="overflow-hidden border-gray-100 dark:border-gray-800 group cursor-pointer hover:shadow-xl transition-all">
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 text-gray-900 border-none backdrop-blur-md">{post.category}</Badge>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.date}</span>
                                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 5 min read</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <Button variant="ghost" className="p-0 text-primary-600 hover:text-primary-700 hover:bg-transparent flex items-center gap-2 group/btn">
                                Read More <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <Button variant="outline" size="lg" className="px-12 rounded-full border-gray-200">Load More Articles</Button>
            </div>
        </div>
    );
}
