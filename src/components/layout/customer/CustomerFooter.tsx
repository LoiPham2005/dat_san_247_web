'use client';

import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CustomerFooter = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-xl text-white">
                                DS
                            </div>
                            <span className="text-xl font-bold text-white">
                                DatSan247
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            The #1 sports venue booking platform. Find and book football fields, tennis courts, badminton courts, and more nearby with just a few clicks.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <SocialLink icon={Facebook} href="#" color="hover:text-blue-500" />
                            <SocialLink icon={Instagram} href="#" color="hover:text-pink-500" />
                            <SocialLink icon={Twitter} href="#" color="hover:text-blue-400" />
                            <SocialLink icon={Youtube} href="#" color="hover:text-red-500" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/venues">Find Venues</FooterLink>
                            <FooterLink href="/promotions">Promotions</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/blog">Blog & News</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/support">Help Center</FooterLink>
                            <FooterLink href="/terms">Terms of Service</FooterLink>
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/cancellation">Cancellation Policy</FooterLink>
                            <FooterLink href="/contact">Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-white mb-4">Contact</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 mt-1 text-primary-500" />
                                    <span>Vietnam National University, Ha Noi</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-primary-500" />
                                    <span>+84 987 654 321</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-primary-500" />
                                    <span>support@datsan247.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-4">Newsletter</h3>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email..."
                                    className="bg-gray-800 border-none rounded-lg text-sm px-4 py-2 w-full focus:ring-1 focus:ring-primary-500"
                                />
                                <Button size="icon" className="shrink-0 bg-primary-600 hover:bg-primary-700">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>&copy; 2024 DatSan247. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                        <div className="flex items-center gap-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                            <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

function SocialLink({ icon: Icon, href, color }: any) {
    return (
        <a
            href={href}
            className={`h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center transition-all hover:bg-white hover:-translate-y-1 ${color}`}
        >
            <Icon className="h-5 w-5" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                <span className="h-0.5 w-0 bg-primary-500 group-hover:w-2 transition-all duration-300" />
                {children}
            </Link>
        </li>
    );
}
