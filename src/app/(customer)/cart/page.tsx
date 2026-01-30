'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore, CartItem } from '@/lib/store/cart.store';
import {
    ShoppingBag,
    Trash2,
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    Home,
    CreditCard,
    ArrowRight,
    Tag,
    AlertCircle,
    Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/format';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function CartPage() {
    const { items, removeItem, clearCart, getTotal, toggleSelection, toggleAll, getSelectedItems } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const totalAmount = getTotal();
    const selectedItems = getSelectedItems();
    const isAllSelected = items.length > 0 && items.every(item => item.selected);
    const isSomeSelected = items.some(item => item.selected);

    const handleRemove = (id: string, name: string) => {
        removeItem(id);
        toast({
            title: "Item removed",
            description: `Booking for ${name} removed from basket.`,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-20 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                    <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
                        <Home className="h-3 w-3" /> Home
                    </Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-gray-900 dark:text-white">Booking Basket</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20 font-black">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                            <Badge variant="outline" className="border-primary-200 text-primary-600 uppercase font-black text-[10px] tracking-widest bg-primary-50/50">
                                {items.length} Pending Suất
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9] mt-2">
                            Checkout Your <br /> <span className="text-primary-600 italic">Bookings</span>
                        </h1>
                    </div>
                    {items.length > 0 && (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
                                <Checkbox
                                    id="select-all"
                                    checked={isAllSelected}
                                    onCheckedChange={(checked) => toggleAll(!!checked)}
                                />
                                <label htmlFor="select-all" className="text-xs font-black uppercase tracking-widest text-gray-500 cursor-pointer">
                                    Select All ({items.length})
                                </label>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-gray-400 hover:text-red-500 uppercase font-black text-[10px] tracking-widest"
                                onClick={() => { clearCart(); toast({ title: "Basket cleared" }); }}
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Clear All
                            </Button>
                        </div>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm px-6">
                        <div className="h-24 w-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="h-12 w-12 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Your basket is empty</h3>
                        <p className="text-gray-500 max-sm mb-8 font-medium">
                            Looks like you haven't selected any time slots yet. Let's find a perfect field for your next game!
                        </p>
                        <Link href="/venues">
                            <Button className="h-14 px-8 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-500/20 transition-all hover:scale-105">
                                Start Booking Now
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-8 space-y-4">
                            {items.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onRemove={() => handleRemove(item.id, item.venueName)}
                                    onToggle={() => toggleSelection(item.id)}
                                />
                            ))}

                            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex gap-4 items-start">
                                <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-black text-blue-900 dark:text-blue-200 uppercase tracking-tight text-xs mb-1">Booking Policy</p>
                                    <p className="text-blue-700/80 dark:text-blue-300/80 font-medium">
                                        Slots are held for 15 minutes. Complete your payment to officialy reserve the court.
                                        Cancellation terms depend on the specific field's policy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-gray-900 dark:bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary-500/10 border border-white/5">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-8">Summary</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Selected Items ({selectedItems.length})</span>
                                            <span className="font-black">{totalAmount.toLocaleString()}đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Service Fee</span>
                                            <span className="font-black text-green-400">FREE</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-4" />
                                        <div className="flex justify-between items-end">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Amount</span>
                                            <div className="text-right">
                                                <span className="block text-3xl font-black text-primary-500">{totalAmount.toLocaleString()}đ</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="relative mb-8">
                                        <Input
                                            placeholder="PROMO CODE"
                                            className="h-12 bg-white/5 border-white/10 rounded-xl text-xs font-bold tracking-widest placeholder:text-gray-600 focus:ring-primary-500 uppercase"
                                        />
                                        <Button variant="ghost" className="absolute right-1 top-1 h-10 px-4 text-primary-500 hover:text-primary-400 font-black text-xs uppercase">Apply</Button>
                                    </div>

                                    <Link href={selectedItems.length > 0 ? "/checkout" : "#"}>
                                        <Button
                                            disabled={selectedItems.length === 0}
                                            className="w-full h-16 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                        >
                                            <CreditCard className="h-5 w-5" />
                                            {selectedItems.length > 0 ? `Checkout (${selectedItems.length})` : "Select Items to Checkout"}
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-6">
                                        Encrypted Payment Processing
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="text-sm font-medium text-gray-500 mb-4">Need help with your booking?</p>
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-gray-100 dark:border-gray-800 font-black text-[10px] uppercase tracking-widest">
                                        Speak with Support
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function CartItemCard({ item, onRemove, onToggle }: { item: CartItem, onRemove: () => void, onToggle: () => void }) {
    return (
        <div className={cn(
            "group bg-white dark:bg-gray-900 rounded-[2rem] p-6 border transition-all flex flex-col sm:flex-row gap-6 relative",
            item.selected ? "border-primary-500/30 shadow-md ring-1 ring-primary-500/10" : "border-gray-100 dark:border-gray-800 shadow-sm opacity-80"
        )}>
            {/* Checkbox Overlay/Side */}
            <div className="flex items-center sm:pr-2">
                <Checkbox
                    checked={item.selected}
                    onCheckedChange={onToggle}
                    className="h-6 w-6"
                />
            </div>

            {/* Thumbnail */}
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-50 dark:border-gray-800 relative">
                <img src={item.thumbnailUrl} className={cn(
                    "h-full w-full object-cover transition-all duration-500",
                    !item.selected && "grayscale"
                )} />
                {!item.selected && <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[1px]" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                    <div onClick={onToggle} className="cursor-pointer">
                        <Badge className={cn(
                            "border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-widest mb-2 rounded-md",
                            item.selected ? "bg-primary-50 text-primary-700" : "bg-gray-100 text-gray-500"
                        )}>
                            {item.sportType}
                        </Badge>
                        <h4 className={cn(
                            "text-xl font-black uppercase tracking-tight truncate transition-colors",
                            item.selected ? "text-gray-900 dark:text-white" : "text-gray-400"
                        )}>
                            {item.venueName}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                            <MapPin className="h-3 w-3" />
                            {item.courtName}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                            <Calendar className="h-4 w-4" />
                        </div>
                        <span className={cn(
                            "text-xs font-black uppercase tracking-tight",
                            item.selected ? "text-gray-700 dark:text-gray-300" : "text-gray-400"
                        )}>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                            <Clock className="h-4 w-4" />
                        </div>
                        <span className={cn(
                            "text-xs font-black uppercase tracking-tight",
                            item.selected ? "text-gray-700 dark:text-gray-300" : "text-gray-400"
                        )}>{item.startTime} - {item.endTime}</span>
                    </div>
                </div>
            </div>

            {/* Price section */}
            <div className={cn(
                "sm:w-32 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 sm:border-l border-gray-50 dark:border-gray-800 pt-4 sm:pt-0 sm:pl-6",
                !item.selected && "opacity-50"
            )}>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</span>
                <span className={cn(
                    "text-xl font-black",
                    item.selected ? "text-gray-900 dark:text-white" : "text-gray-400"
                )}>{item.price.toLocaleString()}đ</span>
            </div>
        </div>
    );
}
