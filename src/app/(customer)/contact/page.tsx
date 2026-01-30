'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supportService } from '@/lib/api/services/support.service';

export default function ContactPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await supportService.submitContact(data);
            toast({
                title: "Message Sent!",
                description: "We've received your message and will get back to you soon.",
            });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Have questions about booking? Need help with your account? Our team is here to help you get back on the field.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <ContactInfoItem
                        icon={Mail}
                        title="Email Us"
                        detail="support@datsan247.com"
                        description="Our support team will get back to you within 24 hours."
                    />
                    <ContactInfoItem
                        icon={Phone}
                        title="Call Us"
                        detail="+84 987 654 321"
                        description="Available Monday to Friday, 9:00 AM - 6:00 PM (GMT+7)."
                    />
                    <ContactInfoItem
                        icon={MapPin}
                        title="Visit Us"
                        detail="Vietnam National University, Ha Noi"
                        description="Come say hi at our headquarters in the heart of the city."
                    />
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <Card className="border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none">
                        <CardContent className="p-8">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                        <Input name="name" placeholder="John Doe" className="h-12 border-gray-200" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                        <Input name="email" type="email" placeholder="john@example.com" className="h-12 border-gray-200" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                    <Input name="subject" placeholder="How can we help?" className="h-12 border-gray-200" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <Textarea name="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px] border-gray-200 pt-3" required />
                                </div>
                                <Button className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-lg font-bold gap-2" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send Message'} <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Alternative ways */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 flex items-start gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary-600 shadow-sm">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Live Chat</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Speak with our support representatives in real-time through our mobile app.</p>
                        <Button variant="outline" className="text-primary-600 border-primary-100 hover:bg-primary-50">Open Chat</Button>
                    </div>
                </div>
                <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 flex items-start gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary-600 shadow-sm">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Help Center</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Browse our extensive documentation and FAQs to find quick answers.</p>
                        <Button variant="outline" className="text-primary-600 border-primary-100 hover:bg-primary-50">Browse FAQs</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactInfoItem({ icon: Icon, title, detail, description }: { icon: any, title: string, detail: string, description: string }) {
    return (
        <div className="flex gap-5">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-primary-600 font-semibold mb-1">{detail}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}
