"use client";

import React from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, HeadphonesIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            
            {/* Header Area */}
            <div className="bg-slate-900 border-b-8 border-primary relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                
                <div className="container px-4 max-w-6xl mx-auto py-16 md:py-24 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-200 border border-white/10 font-bold text-sm mb-6 backdrop-blur-md">
                        <HeadphonesIcon className="w-4 h-4" /> Trung Tâm Hỗ Trợ 24/7
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                        Luôn Luôn Lắng Nghe, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Sẵn Sàng Hỗ Trợ</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Bạn có câu hỏi, đóng góp ý kiến hay cần hỗ trợ kỹ thuật? Đội ngũ CSKH của chúng tôi cam kết sẽ phản hồi bạn trong thời gian sớm nhất.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container px-4 max-w-6xl mx-auto pt-16 relative z-20">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    {/* Left Column: Contact Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Thông Tin Liên Hệ</h2>
                            <p className="text-slate-500 font-medium">Bất kỳ thắc mắc nào, đừng ngần ngại liên kết với chúng tôi thông qua các kênh chính thức sau đây.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {/* Card 1: Address */}
                            <Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform group">
                                <CardContent className="p-6 flex items-start gap-5 bg-white">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-lg mb-1">Trụ Sở Chính</p>
                                        <p className="text-slate-500 leading-relaxed font-medium">Tòa nhà DatSan247, 123 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 2: Phone & Email */}
                            <Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform group">
                                <CardContent className="p-6 flex items-start gap-5 bg-white">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-lg mb-1">Hotline CSKH</p>
                                        <p className="text-slate-500 font-medium text-lg mb-4 hover:text-orange-500 transition-colors">1900 8888</p>
                                        
                                        <p className="font-bold text-slate-900 text-lg mb-1">Email Hỗ Trợ</p>
                                        <p className="text-slate-500 font-medium hover:text-primary transition-colors cursor-pointer">support@datsan247.vn</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 3: Working Hours */}
                            <Card className="rounded-3xl border-0 shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform group bg-gradient-to-br from-slate-800 to-slate-900">
                                <CardContent className="p-6 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div className="text-slate-300">
                                        <p className="font-bold text-white text-lg mb-2">Giờ Làm Việc</p>
                                        <div className="space-y-2 font-medium">
                                            <div className="flex justify-between gap-4 border-b border-slate-700/50 pb-2">
                                                <span>Thứ 2 - Thứ 6:</span>
                                                <span className="text-white">08:00 - 22:00</span>
                                            </div>
                                            <div className="flex justify-between gap-4 pt-1">
                                                <span>Thứ 7 - CN & Lễ:</span>
                                                <span className="text-white">07:00 - 23:00</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7">
                        <Card className="rounded-[2.5rem] border-0 shadow-xl shadow-slate-200 overflow-hidden bg-white">
                            <CardContent className="p-8 md:p-12">
                                <div className="mb-8">
                                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <MessageSquare className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Gửi Tin Nhắn Cho Chúng Tôi</h3>
                                    <p className="text-slate-500 font-medium">Xin vui lòng điền đầy đủ thông tin bên dưới. Bộ phận phù hợp sẽ tiếp nhận và phản hồi sớm nhất.</p>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Họ và Tên <span className="text-rose-500">*</span></label>
                                            <Input placeholder="Nguyễn Văn A" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white text-base" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Số Điện Thoại <span className="text-rose-500">*</span></label>
                                            <Input type="tel" placeholder="0901234567" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white text-base" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email <span className="text-slate-400 font-normal">(Tùy chọn)</span></label>
                                        <Input type="email" placeholder="nguyenvana@example.com" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white text-base" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Vấn Đề Gặp Phải <span className="text-rose-500">*</span></label>
                                        <select className="w-full h-14 px-4 bg-slate-50 border-transparent rounded-2xl font-medium text-slate-700 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer">
                                            <option value="">-- Chọn Chủ Đề --</option>
                                            <option value="booking">Vấn đề Đặt/Hủy sân</option>
                                            <option value="payment">Lỗi Thanh toán/Hoàn tiền</option>
                                            <option value="partner">Đăng ký Đối tác/Chủ sân</option>
                                            <option value="report">Phản ánh chất lượng dịch vụ</option>
                                            <option value="other">Ý kiến khác</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nội Dung Chi Tiết <span className="text-rose-500">*</span></label>
                                        <Textarea 
                                            placeholder="Mô tả rō vấn đề của bạn..." 
                                            className="min-h-[160px] rounded-2xl bg-slate-50 border-transparent focus:bg-white text-base p-4 resize-y" 
                                        />
                                    </div>

                                    <Button type="button" size="lg" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group">
                                        Gửi Yêu Cầu <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>

            {/* Map Section (Optional visual) */}
            <div className="container px-4 max-w-6xl mx-auto mt-24">
                <div className="bg-slate-200 rounded-[3rem] h-[400px] overflow-hidden relative shadow-inner flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=10.7769,106.7009&zoom=14&size=1200x600&maptype=roadmap&markers=color:red%7Clabel:D%7C10.7769,106.7009&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:poi|element:geometry.fill|color:0xe5e5e5')] bg-cover bg-center mix-blend-multiply opacity-50 group-hover:opacity-80 transition-opacity duration-1000 grayscale group-hover:grayscale-0"></div>
                    
                    {/* Placeholder content if Map background is missing */}
                    <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl relative z-10 text-center max-w-md transform group-hover:scale-105 transition-transform duration-500 border border-white/50">
                        <MapPin className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
                        <h4 className="font-black text-2xl text-slate-900 mb-2">DatSan247 HQ</h4>
                        <p className="text-slate-600 font-medium">Bạn có thể dễ dàng tìm thấy chúng tôi trên Google Maps. Nhấp để xem chi tiết đường đi.</p>
                        <Button className="mt-6 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white">Chỉ Đường Tới Đây</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
