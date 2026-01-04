'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, CreditCard, Banknote, Smartphone, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = () => {
        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Booking Confirmed!",
                description: "Your booking has been successfully placed.",
                className: "bg-green-500 text-white border-none"
            });
            router.push('/bookings');
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Contact Info */}
                    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm">1</span>
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input defaultValue="Tuan Pham" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input defaultValue="+84 987 654 321" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Email Address</Label>
                                <Input defaultValue="tuan.pham@example.com" disabled className="bg-gray-50 text-gray-500" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Special Requests (Optional)</Label>
                                <Input placeholder="Need separate bibs, water..." />
                            </div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm">2</span>
                            Payment Method
                        </h2>

                        <RadioGroup defaultValue="momo" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
                                <Label
                                    htmlFor="momo"
                                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50 dark:peer-data-[state=checked]:bg-primary-900/10 [&:has([data-state=checked])]:border-primary"
                                >
                                    <Smartphone className="mb-3 h-6 w-6 text-pink-600" />
                                    <span className="font-bold">Momo / ZaloPay</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                <Label
                                    htmlFor="card"
                                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50 dark:peer-data-[state=checked]:bg-primary-900/10 [&:has([data-state=checked])]:border-primary"
                                >
                                    <CreditCard className="mb-3 h-6 w-6 text-blue-600" />
                                    <span className="font-bold">Credit/Debit Card</span>
                                </Label>
                            </div>
                            <div className="md:col-span-2">
                                <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                <Label
                                    htmlFor="cash"
                                    className="flex items-center gap-4 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50 dark:peer-data-[state=checked]:bg-primary-900/10 [&:has([data-state=checked])]:border-primary"
                                >
                                    <Banknote className="h-6 w-6 text-green-600" />
                                    <span className="font-bold">Pay at Venue</span>
                                    <span className="text-xs text-gray-500 ml-auto">Pay when you arrive</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </section>
                </div>

                {/* Confirm Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sticky top-24">
                        <h3 className="font-bold text-lg mb-6">Booking Summary</h3>

                        <div className="space-y-4 mb-6 text-sm">
                            <div className="flex justify-between font-medium">
                                <span>City Sports Complex</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Date</span>
                                <span>Mar 25, 2024</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Time</span>
                                <span>19:00 - 20:30</span>
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-800 my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary-600">450,000đ</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 bg-blue-50 text-blue-800 p-3 rounded-lg text-xs mb-6">
                            <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                        </div>

                        <Button
                            className="w-full h-12 text-base font-bold shadow-lg shadow-primary-500/20"
                            onClick={handlePayment}
                            isLoading={isLoading}
                        >
                            Confirm & Pay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
