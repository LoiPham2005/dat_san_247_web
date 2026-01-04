'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock Cart Item
const CART_ITEMS = [
    {
        id: "1",
        venueName: "City Sports Complex",
        courtName: "Field 3 (7-a-side)",
        address: "123 Le Loi, District 1, HCMC",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop",
        date: "Mar 25, 2024",
        time: "19:00 - 20:30",
        price: 450000,
    }
];

export default function CartPage() {
    const [items, setItems] = useState(CART_ITEMS);
    const [promoCode, setPromoCode] = useState("");

    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const discount = 0;
    const total = subtotal - discount;

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="h-10 w-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't booked any venues yet.</p>
                <Link href="/venues">
                    <Button size="lg" className="bg-primary-600 hover:bg-primary-700">Find Venues</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <img src={item.image} alt={item.venueName} className="w-full sm:w-40 h-32 object-cover rounded-xl" />

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.venueName}</h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm">{item.courtName}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                        <MapPin className="h-3 w-3" /> {item.address}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-4 sm:mt-0">
                                    <div className="flex gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                                            <Calendar className="h-4 w-4 text-primary-500" /> {item.date}
                                        </div>
                                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                                            <Clock className="h-4 w-4 text-primary-500" /> {item.time}
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg text-primary-600">{item.price.toLocaleString()}đ</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sticky top-24">
                        <h3 className="font-bold text-lg mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span>{subtotal.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Service Fee</span>
                                <span>0đ</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100 dark:border-gray-800">
                                <span>Total</span>
                                <span className="text-primary-600">{total.toLocaleString()}đ</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="bg-gray-50 border-gray-200"
                                />
                                <Button variant="outline">Apply</Button>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary-500/20">
                                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
