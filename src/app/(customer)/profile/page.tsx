'use client';

import {
    User,
    Wallet,
    Ticket,
    Shield,
    LogOut,
    Camera,
    CreditCard,
    History,
    Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from '@/lib/store/auth.store';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input'; // Assuming standard Shadcn Input
import { Label } from '@/components/ui/label'; // Assuming standard Shadcn Label

export default function ProfilePage() {
    const { user, logout } = useAuthStore();
    const currentUser = user || { name: 'Guest User', email: 'guest@datsan247.com', role: 'USER', avatar: '' };

    return (
        <div className="container mx-auto px-4 pt-24 pb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

            <Tabs defaultValue="general" orientation="vertical" className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 shrink-0">
                    <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-2 p-0">
                        <TabsTrigger
                            value="general"
                            className="w-full justify-start px-4 py-3 rounded-xl data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/10 dark:data-[state=active]:text-primary-400 font-medium"
                        >
                            <User className="mr-3 h-5 w-5" /> General Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="wallet"
                            className="w-full justify-start px-4 py-3 rounded-xl data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/10 dark:data-[state=active]:text-primary-400 font-medium"
                        >
                            <Wallet className="mr-3 h-5 w-5" /> My Wallet
                        </TabsTrigger>
                        <TabsTrigger
                            value="vouchers"
                            className="w-full justify-start px-4 py-3 rounded-xl data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/10 dark:data-[state=active]:text-primary-400 font-medium"
                        >
                            <Ticket className="mr-3 h-5 w-5" /> Vouchers
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="w-full justify-start px-4 py-3 rounded-xl data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/10 dark:data-[state=active]:text-primary-400 font-medium"
                        >
                            <Shield className="mr-3 h-5 w-5" /> Security
                        </TabsTrigger>
                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 w-full">
                            <Button
                                variant="ghost"
                                className="w-full justify-start px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={logout}
                            >
                                <LogOut className="mr-3 h-5 w-5" /> Sign Out
                            </Button>
                        </div>
                    </TabsList>
                </aside>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">

                    {/* General Info */}
                    <TabsContent value="general" className="space-y-8 mt-0">
                        <div>
                            <h2 className="text-xl font-bold mb-1">Personal Information</h2>
                            <p className="text-gray-500 text-sm">Update your personal details here.</p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800">
                                    <img
                                        src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}&background=random`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 shadow-md">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{currentUser.name}</h3>
                                <p className="text-gray-500 text-sm">{currentUser.role.toLowerCase()}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input defaultValue={currentUser.name} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input defaultValue={currentUser.email} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input placeholder="+84" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date of Birth</Label>
                                <Input type="date" />
                            </div>
                        </div>

                        <Button>Save Changes</Button>
                    </TabsContent>

                    {/* Wallet */}
                    <TabsContent value="wallet" className="space-y-8 mt-0">
                        <div>
                            <h2 className="text-xl font-bold mb-1">My Wallet</h2>
                            <p className="text-gray-500 text-sm">Manage your payment methods and balance.</p>
                        </div>

                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-xl flex justify-between items-center relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                                <h3 className="text-4xl font-bold">1,250,000đ</h3>
                                <div className="mt-6 flex gap-3">
                                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">Top Up</Button>
                                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">Withdraw</Button>
                                </div>
                            </div>
                            <div className="relative z-10 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                <Wallet className="h-6 w-6 text-white" />
                            </div>
                            {/* Decorative */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        </div>

                        <div>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <History className="h-4 w-4" /> Recent Transactions
                            </h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 bg-white">
                                        <div className="flex gap-3 items-center">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${i === 2 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                <CreditCard className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{i === 2 ? 'Top Up Wallet' : 'Booking Payment'}</p>
                                                <p className="text-xs text-gray-500">Mar 2{i}, 2024</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-bold ${i === 2 ? 'text-green-600' : 'text-gray-900'}`}>{i === 2 ? '+' : '-'}250,000đ</span>
                                            <p className="text-xs text-green-600 font-medium">Success</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Vouchers */}
                    <TabsContent value="vouchers" className="space-y-8 mt-0">
                        <div>
                            <h2 className="text-xl font-bold mb-1">My Vouchers</h2>
                            <p className="text-gray-500 text-sm">Active coupons waiting to be used.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden relative">

                                    <div className="w-12 bg-primary-600 flex items-center justify-center relative">
                                        <span className="-rotate-90 text-white font-bold tracking-widest text-xs whitespace-nowrap">COUPON</span>
                                        {/* Ticket jagged edges mock */}
                                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 rounded-full" />
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 rounded-full" />
                                    </div>

                                    <div className="flex-1 p-4 bg-white dark:bg-gray-800 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg">20% OFF</h3>
                                                <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">First Booking</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400 flex justify-between items-center">
                                            <span>Exp: Dec 31, 2024</span>
                                            <Button size="sm" variant="ghost" className="h-6 text-primary-600 px-0 hover:bg-transparent">Use Now</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Security */}
                    <TabsContent value="security" className="space-y-8 mt-0">
                        <div>
                            <h2 className="text-xl font-bold mb-1">Login & Security</h2>
                            <p className="text-gray-500 text-sm">Manage your password and security settings.</p>
                        </div>

                        <div className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm New Password</Label>
                                <Input type="password" />
                            </div>
                            <Button>Update Password</Button>
                        </div>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    );
}
