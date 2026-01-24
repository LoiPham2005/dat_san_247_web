'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth.store';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCartStore } from '@/lib/store/cart.store';
import { useVenueStore } from '@/lib/store/venue.store';
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    Bell,
    Heart,
    LogOut,
    Settings,
    CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/format';

export const CustomerHeader = () => {
    const { user } = useAuthStore();
    const { logout } = useAuth();
    const { items } = useCartStore();
    const { favorites } = useVenueStore();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Transparent header logic for landing pages
    const isTransparentPage = pathname === '/' || pathname === '/about';
    const showTransparent = isTransparentPage && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Find Venues', href: '/venues' },
        { label: 'Promotions', href: '/promotions' },
        { label: 'About Us', href: '/about' },
        { label: 'Support', href: '/support' },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                showTransparent
                    ? "bg-transparent py-5"
                    : "bg-white/80 backdrop-blur-md shadow-md py-3 border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xl transition-colors",
                        showTransparent ? "bg-white text-primary-600" : "bg-primary-600 text-white"
                    )}>
                        DS
                    </div>
                    <span className={cn(
                        "text-xl font-bold transition-colors",
                        showTransparent ? "text-white" : "text-gray-900 dark:text-white"
                    )}>
                        DatSan247
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary-500",
                                showTransparent ? "text-gray-100 hover:text-white" : "text-gray-600 dark:text-gray-300"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Search Icon (Mobile/Compact) */}
                    <button className={cn(
                        "p-2 rounded-full transition-colors",
                        showTransparent ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}>
                        <Search className="h-5 w-5" />
                    </button>

                    {/* Cart */}
                    <Link href="/cart" className="relative group">
                        <div className={cn(
                            "p-2 rounded-full transition-colors",
                            showTransparent ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}>
                            <ShoppingCart className="h-5 w-5" />
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-gray-900 animate-in zoom-in duration-300">
                                    {items.length}
                                </span>
                            )}
                        </div>
                    </Link>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 pl-2">
                                    <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white/50 shadow-sm">
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                                    <p className="font-semibold text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile"
                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="mr-2 h-4 w-4" /> My Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/bookings"
                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" /> My Bookings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/favorites"
                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Heart className="mr-2 h-4 w-4" /> Favorites
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile?tab=security"
                                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Settings className="mr-2 h-4 w-4" /> Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => logout()} className="text-red-600 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        showTransparent ? "text-white hover:bg-white/10" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    )}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className={cn(
                                    showTransparent ? "bg-white text-primary-600 hover:bg-gray-100" : "bg-primary-600 text-white"
                                )}>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "md:hidden p-2 rounded-lg",
                            showTransparent ? "text-white" : "text-gray-900 dark:text-white"
                        )}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-base font-medium text-gray-900 py-2 border-b border-gray-50 last:border-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {!user && (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full">Login</Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};
