"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/common/Button';
import { Store, User, LogOut, LayoutDashboard, History, Settings, Bell, Wallet, Star, MessagesSquare } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';

export const CustomerHeader = () => {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 h-full flex justify-between items-center max-w-7xl">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-800 tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
                        <Store className="w-5 h-5" />
                    </div>
                    DatSan<span className="text-primary">247</span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/venues" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Tìm Sân</Link>
                    <Link href="/promotions" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Khuyến Mãi</Link>
                    <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Blog Thể Thao</Link>
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {!session ? (
                        <>
                            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Đăng nhập</Link>
                            <Link href="/register">
                                <Button size="sm" className="h-9 px-4 rounded-full text-xs font-bold shadow-sm shadow-primary/20">
                                    Đăng ký ngay
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/wallet" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 font-bold border border-orange-100 hover:bg-orange-100 transition-colors text-xs">
                                <Wallet className="w-3.5 h-3.5" /> 0 ₫
                            </Link>
                            <Link href="/notifications" className="relative text-slate-500 hover:text-primary transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
                            </Link>

                            <div className="relative group">
                                <button className="flex items-center gap-2 pl-2 pr-1 h-10 rounded-full border border-slate-200 bg-white hover:border-primary/50 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20">
                                    <div className="text-sm font-bold text-slate-700 hidden sm:block max-w-[100px] truncate">
                                        {session.user?.name?.split(' ').pop()}
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                        {session.user?.image ? (
                                            <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-primary" />
                                        )}
                                    </div>
                                </button>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right overflow-hidden p-1.5 z-50">
                                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                        <div className="font-bold text-slate-800 truncate">{session.user?.name}</div>
                                        <div className="text-xs text-slate-500 truncate">{session.user?.email}</div>
                                    </div>
                                    
                                    <div className="space-y-0.5">
                                        <Link href="/profile" className={cn("flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors", pathname.includes('/profile') && "bg-slate-50 text-primary")}>
                                            <Settings className="w-4 h-4 mr-2 text-slate-400" /> Hồ sơ cá nhân
                                        </Link>
                                        <Link href="/bookings" className={cn("flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors", pathname.includes('/bookings') && "bg-slate-50 text-primary")}>
                                            <History className="w-4 h-4 mr-2 text-slate-400" /> Quản lý Booking
                                        </Link>
                                        <Link href="/wallet" className={cn("flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors", pathname.includes('/wallet') && "bg-slate-50 text-primary")}>
                                            <Wallet className="w-4 h-4 mr-2 text-slate-400" /> Tài chính & Hóa đơn
                                        </Link>
                                        <Link href="/vouchers" className={cn("flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors", pathname.includes('/vouchers') && "bg-slate-50 text-primary")}>
                                            <Store className="w-4 h-4 mr-2 text-slate-400" /> Kho Voucher
                                        </Link>
                                        <Link href="/reviews" className={cn("flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors", pathname.includes('/reviews') && "bg-slate-50 text-primary")}>
                                            <Star className="w-4 h-4 mr-2 text-slate-400" /> Đánh giá của tôi
                                        </Link>
                                        <Link href="/support" className={cn("flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors", pathname.includes('/support') && "bg-slate-50 text-primary")}>
                                            <MessagesSquare className="w-4 h-4 mr-2 text-slate-400" /> Hỗ trợ & Báo cáo
                                        </Link>
                                    </div>
                                    
                                    <div className="border-t border-slate-100 mt-1 pt-1">
                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-sm h-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold rounded-lg"
                                            onClick={() => signOut({ callbackUrl: '/login' })}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Đăng xuất
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
