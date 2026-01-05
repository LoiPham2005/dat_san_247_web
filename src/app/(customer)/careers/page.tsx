'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Clock, ArrowRight, Star, Users, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
    const jobs = [
        {
            title: "Senior Frontend Engineer (React/Next.js)",
            department: "Engineering",
            location: "Ha Noi / Remote",
            type: "Full-time",
            salary: "$2,000 - $3,500"
        },
        {
            title: "Growth Marketing Manager",
            department: "Marketing",
            location: "Ho Chi Minh City",
            type: "Full-time",
            salary: "Competitive"
        },
        {
            title: "Customer Success Representative",
            department: "Operations",
            location: "Ha Noi",
            type: "Full-time",
            salary: "$800 - $1,200"
        },
        {
            title: "Product Designer (UI/UX)",
            department: "Product",
            location: "Remote",
            type: "Contract",
            salary: "Negotiable"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 bg-gray-900 overflow-hidden">
                <div className="container mx-auto px-4 pt-12 relative z-10">
                    <div className="max-w-3xl">
                        <Badge className="mb-6 bg-primary-600 border-none">We're Hiring!</Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Build the Future of <br />
                            <span className="text-primary-500">Sports Technology</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                            Join our mission to revolutionize how people play sports. We're looking for passionate individuals to help us build the world's best venue booking platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 h-14 px-8 text-lg rounded-xl">View Openings</Button>
                            <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 h-14 px-8 text-lg rounded-xl">Our Culture</Button>
                        </div>
                    </div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-20 hidden lg:block">
                    <Rocket className="w-[500px] h-[500px] text-primary-500" />
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-24 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join DatSan247?</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            We're a fast-growing startup with a passion for sports and technology. Here, your work directly impacts thousands of athletes every day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BenefitCard
                            icon={Star}
                            title="Impactful Work"
                            description="Build features that help people stay active, healthy, and connected to their local communities."
                        />
                        <BenefitCard
                            icon={Users}
                            title="Amazing Team"
                            description="Work with brilliant minds who are as passionate about the game as they are about the code."
                        />
                        <BenefitCard
                            icon={Clock}
                            title="Flexibility First"
                            description="We value output over hours. Enjoy remote-first culture and flexible working schedules."
                        />
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Latest Openings</h2>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {jobs.map((job, idx) => (
                            <Card key={idx} className="group hover:shadow-lg transition-all border-gray-100 dark:border-gray-800 cursor-pointer overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                                    {job.title}
                                                </h3>
                                                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{job.type}</Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.department}</span>
                                                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                                                <span className="font-medium text-primary-600">{job.salary}</span>
                                            </div>
                                        </div>
                                        <Button className="md:w-auto w-full group-hover:bg-primary-600 group-hover:text-white bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white border-none shadow-none">
                                            Apply Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 mb-4">Don't see a role that fits?</p>
                        <Button variant="outline" className="rounded-full px-8">Send us an open application</Button>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary-600 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Want to stay updated?</h2>
                    <p className="text-primary-100 mb-10 max-w-xl mx-auto">
                        Follow us on LinkedIn or subscribe to our talent newsletter to be the first to know about new opportunities.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-white text-primary-600 hover:bg-gray-100 h-12 px-8 rounded-xl font-bold">Follow on LinkedIn</Button>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-64 h-64 rounded-full bg-white/10" />
                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-white/5" />
            </section>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-primary-100 dark:hover:border-primary-900 transition-all text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-gray-800 text-primary-600 shadow-sm mb-2">
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
}
