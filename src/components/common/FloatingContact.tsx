"use client";

import React, { useState } from 'react';
import { Phone, MessageCircle, MessageSquare, Plus, X, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SiZalo, SiMessenger, SiFacebook } from 'react-icons/si';

const CONTACT_METHODS = [
    {
        name: 'Zalo Tư Vấn',
        icon: SiZalo,
        color: 'bg-blue-500',
        link: 'https://zalo.me/0964175396', // Thay số điện thoại của bác vào đây
        description: 'Phản hồi nhanh trong 5p'
    },
    {
        name: 'Messenger',
        icon: SiMessenger,
        color: 'bg-blue-600',
        link: 'https://m.me/datsan247', // Thay fanpage của bác vào đây
        description: 'Hỗ trợ 24/7'
    },
    {
        name: 'Hotline',
        icon: Phone,
        color: 'bg-emerald-500',
        link: 'tel:0964175396',
        description: 'Hotline khẩn cấp'
    },
    {
        name: 'Gửi Ticket',
        icon: MessageSquareQuote,
        color: 'bg-orange-500',
        link: '/support', // Link đến trang hỗ trợ in-app của bác
        description: 'Kênh hỗ trợ chính thức'
    }
];

export const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
            {/* Contact List */}
            <div className={cn(
                "flex flex-col items-end gap-3 transition-all duration-300 origin-bottom",
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
            )}>
                {CONTACT_METHODS.map((method, index) => (
                    <a
                        key={method.name}
                        href={method.link}
                        target={method.link.startsWith('http') ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 transition-all duration-200"
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        {/* Label */}
                        <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-black text-slate-800 leading-none">{method.name}</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-semibold">{method.description}</p>
                        </div>
                        
                        {/* Icon Button */}
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                            method.color
                        )}>
                            <method.icon className="w-5 h-5" />
                        </div>
                    </a>
                ))}
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(59,130,246,0.5)] transition-all duration-500 relative ring-4 ring-white",
                    isOpen ? "bg-rose-500 rotate-180" : "bg-blue-600 hover:bg-blue-700"
                )}
            >
                {isOpen ? (
                    <X className="w-7 h-7" />
                ) : (
                    <>
                        <MessageCircle className="w-7 h-7 animate-pulse" />
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                    </>
                )}
            </button>
        </div>
    );
};
