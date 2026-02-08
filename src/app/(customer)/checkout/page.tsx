'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, CreditCard, Banknote, Smartphone, ShieldCheck, MapPin, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart.store';
import { useAuthStore } from '@/lib/store/auth.store';
import Link from 'next/link';

export default function CheckoutPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { getSelectedItems, getTotal, clearSelectedItems } = useCartStore();
    const { user } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const selectedItems = getSelectedItems();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && selectedItems.length === 0) {
            router.push('/cart');
        }
    }, [isMounted, selectedItems, router]);

    if (!isMounted) return null;

    if (selectedItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold mb-4">No items selected</h2>
                <p className="text-gray-500 mb-8">Please select some slots from your basket before checking out.</p>
                <Link href="/cart">
                    <Button className="bg-primary-600">Back to Basket</Button>
                </Link>
            </div>
        );
    }

    const handlePayment = () => {
        setIsLoading(true);
        // Mock API call to create multiple bookings
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Booking Confirmed!",
                description: `Successfully booked ${selectedItems.length} slots. Check your email for details.`,
                className: "bg-green-600 text-white border-none"
            });
            clearSelectedItems();
            router.push('/bookings');
        }, 2000);
    };

    const totalAmount = getTotal();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Contact Info */}
                    <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight">
                            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-100 text-primary-600 text-sm font-black italic">1</span>
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Họ và tên</Label>
                                <Input defaultValue={user?.fullName || ""} className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary-500" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Số điện thoại</Label>
                                <Input defaultValue={user?.phone || ""} className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary-500" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Địa chỉ Email</Label>
                                <Input value={user?.email || ""} disabled className="h-12 rounded-xl bg-gray-100 text-gray-500 border-none cursor-not-allowed" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-400">Ghi chú thêm (Không bắt buộc)</Label>
                                <Input placeholder="Yêu cầu về áo bib, nước uống..." className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary-500" />
                            </div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight">
                            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary-100 text-primary-600 text-sm font-black italic">2</span>
                            Payment Method
                        </h2>

                        <RadioGroup defaultValue="momo" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
                                <Label
                                    htmlFor="momo"
                                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-gray-100 bg-white p-6 hover:bg-gray-50 peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50/30 transition-all cursor-pointer h-full"
                                >
                                    <Smartphone className="mb-3 h-8 w-8 text-pink-600" />
                                    <span className="font-black uppercase text-xs tracking-widest">Momo / ZaloPay</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                <Label
                                    htmlFor="card"
                                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-gray-100 bg-white p-6 hover:bg-gray-50 peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50/30 transition-all cursor-pointer h-full"
                                >
                                    <CreditCard className="mb-3 h-8 w-8 text-blue-600" />
                                    <span className="font-black uppercase text-xs tracking-widest">Credit/Debit Card</span>
                                </Label>
                            </div>
                            <div className="md:col-span-2">
                                <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                <Label
                                    htmlFor="cash"
                                    className="flex items-center gap-4 rounded-2xl border-2 border-gray-100 bg-white p-6 hover:bg-gray-50 peer-data-[state=checked]:border-primary-500 peer-data-[state=checked]:bg-primary-50/30 transition-all cursor-pointer h-full"
                                >
                                    <Banknote className="h-8 w-8 text-green-600" />
                                    <div className="flex-1">
                                        <p className="font-black uppercase text-xs tracking-widest">Pay at Venue</p>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Payment upon arrival at the facility</p>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-gray-200 peer-data-[state=checked]:text-primary-500" />
                                </Label>
                            </div>
                        </RadioGroup>
                    </section>
                </div>

                {/* Confirm Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-950 text-white rounded-[2.5rem] shadow-2xl p-8 sticky top-24 border border-white/5">
                        <h3 className="font-black text-xl uppercase tracking-tight mb-8">Order Summary</h3>

                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                            {selectedItems.map((item) => (
                                <div key={item.id} className="pb-6 border-b border-white/10 last:border-0">
                                    <h4 className="font-black text-sm uppercase truncate mb-1">{item.venueName}</h4>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-2">
                                        <MapPin className="h-3 w-3" /> {item.courtName}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-primary-500 uppercase flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {item.date}
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {item.startTime} - {item.endTime}
                                            </p>
                                        </div>
                                        <span className="font-black text-sm">{item.price.toLocaleString()}đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase tracking-widest">Subtotal</span>
                                <span className="font-black">{totalAmount.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-bold uppercase tracking-widest">Service Fee</span>
                                <span className="font-black text-green-400">FREE</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Total</span>
                                <span className="text-3xl font-black text-primary-500 leading-none">{totalAmount.toLocaleString()}đ</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl text-[10px] text-gray-400 font-medium mb-8">
                            <ShieldCheck className="h-5 w-5 shrink-0 text-primary-600" />
                            <p>Secure payment processed via industry-standard encryption. Your details are safe with us.</p>
                        </div>

                        <Button
                            className="w-full h-16 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary-500/20 bg-primary-600 hover:bg-primary-500 rounded-2xl transition-all hover:scale-[1.02]"
                            onClick={handlePayment}
                            isLoading={isLoading}
                        >
                            Complete Booking
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
