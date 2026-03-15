import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const PublicFooter = () => {
    return (
        <footer className="w-full border-t bg-slate-50 pt-16 pb-8">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {/* Logo and About */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
                                D
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                DatSan<span className="text-primary">247</span>
                            </span>
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                            Nền tảng đặt sân thể thao chuyên nghiệp hàng đầu Việt Nam, giúp bạn kết nối đam mê và rèn luyện sức khỏe mỗi ngày.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Youtube size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-base font-bold text-slate-900">Liên kết nhanh</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/venues" className="text-sm text-slate-600 hover:text-primary transition-colors">Tìm kiếm sân</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-slate-600 hover:text-primary transition-colors">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-slate-600 hover:text-primary transition-colors">Tin tức thể thao</Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-slate-600 hover:text-primary transition-colors">Tuyển dụng</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-base font-bold text-slate-900">Hỗ trợ khách hàng</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-600 hover:text-primary transition-colors">Chính sách bảo mật</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-slate-600 hover:text-primary transition-colors">Điều khoản dịch vụ</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-slate-600 hover:text-primary transition-colors">Câu hỏi thường gặp</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-slate-600 hover:text-primary transition-colors">Liên hệ hỗ trợ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-base font-bold text-slate-900">Thông tin liên hệ</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-primary flex-shrink-0" />
                                <span>support@datsan247.vn</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-primary flex-shrink-0" />
                                <span>1900 68xx (8:00 - 22:00)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary flex-shrink-0" />
                                <span>Hoàng Mai, Hà Nội, Việt Nam</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} DatSan247. Đã đăng ký bản quyền.</p>
                </div>
            </div>
        </footer>
    );
};
