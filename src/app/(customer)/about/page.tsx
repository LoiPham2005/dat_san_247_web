'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, Trophy, Target, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Badge variant="outline" className="text-primary-400 border-primary-400 mb-6">Our Mission</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Connecting People Through <br /><span className="text-primary-500">The Power of Sports</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
                        DatSan247 is on a mission to make sports facilities accessible to everyone, anywhere, at any time. We believe that playing sports should be as easy as ordering food.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/venues">
                            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-lg px-8">Find a Venue</Button>
                        </Link>
                        <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">Join the Community</Button>
                    </div>
                </div>

                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
                </div>
            </section>

            {/* Vision & Values */}
            <section className="py-24 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop"
                                alt="Athletes"
                                className="rounded-3xl shadow-2xl relative z-10"
                            />
                            <div className="absolute -bottom-8 -right-8 bg-primary-600 p-8 rounded-3xl hidden md:block">
                                <p className="text-white font-bold text-4xl">100k+</p>
                                <p className="text-primary-100 text-sm">Monthly Users</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why We Created DatSan247</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Founded in 2024, DatSan247 was born from a simple frustration: trying to find an available football pitch for a weekend game was harder than the game itself. Calls, messages, and unupdated schedules made booking a nightmare.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <ValueItem
                                    icon={Target}
                                    title="Accessibility"
                                    description="Bringing every local sports facility online so you can discover them instantly."
                                />
                                <ValueItem
                                    icon={CheckCircle2}
                                    title="Reliability"
                                    description="Real-time availability and instant confirmation with 24/7 support."
                                />
                                <ValueItem
                                    icon={Heart}
                                    title="Community"
                                    description="Building a platform that fosters local sports communities and healthy lifestyles."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team/Impact Numbers */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <ImpactCard icon={Users} count="100,000+" label="Active Players" />
                        <ImpactCard icon={Trophy} count="500+" label="Sports Venues" />
                        <ImpactCard icon={CheckCircle2} count="1M+" label="Bookings Made" />
                        <ImpactCard icon={Target} count="15+" label="Cities Covered" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Get Back in the Game?</h2>
                    <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-10">
                        Join thousands of athletes who use DatSan247 every day to stay active and connected.
                    </p>
                    <Link href="/register">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-primary-600/20">Create Account Now</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

function ValueItem({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}

function ImpactCard({ icon: Icon, count, label }: { icon: any, count: string, label: string }) {
    return (
        <div className="text-center space-y-2 p-6 rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="inline-flex h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-900/20 items-center justify-center text-primary-600 mb-2">
                <Icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{count}</p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        </div>
    );
}
