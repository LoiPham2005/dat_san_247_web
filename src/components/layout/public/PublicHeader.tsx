"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Menu, X, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const PublicHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Khám phá', href: '/venues' },
        { name: 'Khuyến mãi', href: '/promotions' },
        { name: 'Về chúng tôi', href: '/about' },
        { name: 'Liên hệ', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
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
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="font-semibold text-slate-600">
                            Đăng nhập
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm" className="font-semibold px-5 rounded-lg">
                            Đăng ký
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="flex md:hidden items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
