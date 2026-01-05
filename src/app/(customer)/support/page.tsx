'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const FAQS = [
    {
        q: "How do I cancel my booking?",
        a: "You can cancel your booking from the 'My Bookings' section in your profile. Cancellations made at least 2 hours before the scheduled time are eligible for a full refund."
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, Momo, ZaloPay, and direct cash payment at the venue for select locations."
    },
    {
        q: "Can I reschedule a booking?",
        a: "Yes, you can reschedule up to 4 hours before the slot time, subject to venue availability."
    },
    {
        q: "Do I need to print my booking confirmation?",
        a: "No, you just need to show the QR code from the app or email confirmation at the venue reception."
    }
];

export default function SupportPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How can we help?</h1>
                <div className="relative max-w-lg mx-auto">
                    <Input className="pl-10 h-12 rounded-full shadow-sm" placeholder="Search for answers..." />
                    <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* FAQs */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`}>
                                <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                                <AccordionContent className="text-gray-500">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input placeholder="Your name" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input placeholder="Your email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input placeholder="How can we help?" />
                            </div>
                            <div className="space-y-2">
                                <Label>Message</Label>
                                <Textarea className="min-h-[120px]" placeholder="Describe your issue..." />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-around">
                            <a href="#" className="flex flex-col items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <Phone className="h-5 w-5" />
                                </div>
                                Call Us
                            </a>
                            <a href="#" className="flex flex-col items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                <div className="h-10 w-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                                    <MessageCircle className="h-5 w-5" />
                                </div>
                                Live Chat
                            </a>
                            <a href="#" className="flex flex-col items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                <div className="h-10 w-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                                    <Mail className="h-5 w-5" />
                                </div>
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
