"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { 
    Menu, X, Search, User, History, LogOut, Wallet, 
    Heart, Star, Store, MapPin, Calendar, LayoutDashboard, 
    MessagesSquare, ChevronDown, Shield, LogIn, Settings
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useSession, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { NotificationBell } from '@/features/notification';

export const PublicHeader = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname() || '';
    const user = session?.user;

    const navLinks = [
        { name: 'Khám phá', href: '/venues' },
        { name: 'Khuyến mãi', href: '/promotions' },
        { name: 'Về chúng tôi', href: '/about' },
        { name: 'Liên hệ', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl shadow-sm">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:inline-block">
                        DatSan<span className="text-primary">247</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 capitalize">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Auth Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="font-semibold text-slate-600">
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="font-semibold px-5 rounded-lg" id="register-button">
                                    Đăng ký
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <NotificationBell />
                            
                            <div className="relative group">
                                <button className="flex items-center gap-2 pl-2 pr-1 h-10 rounded-full border border-slate-200 bg-white hover:border-primary/50 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20">
                                    <div className="text-sm font-bold text-slate-700 hidden sm:block max-w-[120px] truncate">
                                        {user.name || 'Người dùng'}
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-primary" />
                                        )}
                                    </div>
                                </button>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right overflow-hidden p-1.5 z-50">
                                    <div className="px-3 py-3 border-b border-slate-100 mb-1 bg-slate-50/50">
                                        <div className="font-bold text-slate-800 truncate">{user.name}</div>
                                        <div className="text-xs text-slate-500 truncate font-medium">{user.email}</div>
                                    </div>
                                    
                                    {/* Links based on Role */}
                                    <div className="space-y-0.5">
                                        {(user as any).role === 'super_admin' || (user as any).role === 'admin' ? (
                                            <>
                                                <Link href="/admin/dashboard" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <Settings className="w-4 h-4 mr-3 text-slate-400" /> Bảng điều khiển Admin
                                                </Link>
                                                <Link href="/admin/venues" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <Store className="w-4 h-4 mr-3 text-slate-400" /> Quản lý Sân bóng
                                                </Link>
                                                <Link href="/admin/support" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <MessagesSquare className="w-4 h-4 mr-3 text-slate-400" /> Hỗ trợ & Kiểm duyệt
                                                </Link>
                                            </>
                                        ) : (user as any).role === 'staff' ? (
                                            <>
                                                <Link href="/staff/lookup" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <Search className="w-4 h-4 mr-3 text-slate-400" /> Tra cứu & Phục vụ
                                                </Link>
                                                <Link href="/staff/moderation" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <MessagesSquare className="w-4 h-4 mr-3 text-slate-400" /> Kiểm duyệt nội dung
                                                </Link>
                                            </>
                                        ) : (user as any).role === 'owner' ? (
                                            <>
                                                <Link href="/owner/venues" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <Store className="w-4 h-4 mr-3 text-slate-400" /> Cơ sở của tôi
                                                </Link>
                                                <Link href="/owner/bookings" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                                                    <History className="w-4 h-4 mr-3 text-slate-400" /> Lịch đặt sân
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                {(user as any).isVenueStaff && (
                                                    <Link href="/venue-staff/schedule" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all mb-2 border border-indigo-100">
                                                        <Shield className="w-4 h-4 mr-3 text-indigo-500" />Giao diện Nhân viên
                                                    </Link>
                                                )}
                                                <Link href="/profile" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/profile') && "bg-primary/10 text-primary")}>
                                                    <User className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Hồ sơ cá nhân
                                                </Link>
                                                <Link href="/bookings" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/bookings') && "bg-primary/10 text-primary")}>
                                                    <History className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Quản lý Booking
                                                </Link>
                                                <Link href="/vouchers" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/vouchers') && "bg-primary/10 text-primary")}>
                                                    <Star className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Kho Vouchers
                                                </Link>
                                                <Link href="/wallet" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/wallet') && "bg-primary/10 text-primary")}>
                                                    <Wallet className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Tài chính & Hóa đơn
                                                </Link>
                                                <Link href="/messages" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/messages') && "bg-primary/10 text-primary")}>
                                                    <MessagesSquare className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Tin nhắn
                                                </Link>
                                                <Link href="/favorites" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/favorites') && "bg-primary/10 text-primary")}>
                                                    <Heart className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Sân yêu thích
                                                </Link>
                                                <Link href="/reviews" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/reviews') && "bg-primary/10 text-primary")}>
                                                    <Star className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Đánh giá của tôi
                                                </Link>
                                                <Link href="/support" className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all", pathname.includes('/support') && "bg-primary/10 text-primary")}>
                                                    <MessagesSquare className="w-4 h-4 mr-3 text-slate-400 group-hover:text-primary" /> Trợ giúp & Chat
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="pt-1.5 mt-1.5 border-t border-slate-100">
                                        <button 
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
                                            id="logout-button"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" /> Đăng xuất tài khoản
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="flex md:hidden items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    id="mobile-menu-toggle"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-white p-4 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-slate-600 transition-colors hover:text-primary px-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-4 border-t">
                            {!user ? (
                                <>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full text-primary border-primary">
                                            <LogIn className="w-4 h-4 mr-2" /> Đăng nhập
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full">
                                            <User className="w-4 h-4 mr-2" /> Đăng ký
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="px-3 py-2 mb-2 bg-slate-50 rounded-xl">
                                        <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                                        <div className="text-xs text-slate-500">{user.email}</div>
                                    </div>

                                    {(user as any).isVenueStaff && (
                                        <Link href="/venue-staff/schedule" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all mb-2 border border-indigo-100">
                                            <Shield className="w-4 h-4 mr-3 text-indigo-500" />Giao diện Nhân viên
                                        </Link>
                                    )}

                                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <User className="w-4 h-4 mr-3" /> Hồ sơ cá nhân
                                    </Link>
                                    <Link href="/bookings" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <History className="w-4 h-4 mr-3" /> Quản lý Booking
                                    </Link>
                                    <Link href="/vouchers" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <Star className="w-4 h-4 mr-3" /> Kho Vouchers
                                    </Link>
                                    <Link href="/wallet" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <Wallet className="w-4 h-4 mr-3" /> Tài chính & Hóa đơn
                                    </Link>
                                    <Link href="/messages" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <MessagesSquare className="w-4 h-4 mr-3" /> Tin nhắn
                                    </Link>
                                    <Link href="/favorites" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <Heart className="w-4 h-4 mr-3" /> Sân yêu thích
                                    </Link>
                                    <Link href="/reviews" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <Star className="w-4 h-4 mr-3" /> Đánh giá của tôi
                                    </Link>
                                    <Link href="/support" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-sm font-bold text-slate-600 hover:text-primary">
                                        <MessagesSquare className="w-4 h-4 mr-3" /> Trợ giúp & Chat
                                    </Link>
                                    <button 
                                        onClick={() => signOut()}
                                        className="flex items-center px-3 py-2 text-sm font-bold text-rose-600 text-left hover:bg-rose-50 rounded-xl mt-2 w-full"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" /> Đăng xuất
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
