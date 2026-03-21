"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TimePickerProps {
    value?: string; // Format: HH:mm:ss or HH:mm
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

export const TimePicker = ({ value = "08:00:00", onChange, disabled, className }: TimePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Helper to parse value into H, M, S
    const parseValue = (val: string | undefined): [string, string, string] => {
        if (!val) return ["08", "00", "00"];
        
        // Handle ISO string from backend
        if (val.includes('T')) {
            const d = new Date(val);
            return [
                d.getHours().toString().padStart(2, '0'),
                d.getMinutes().toString().padStart(2, '0'),
                d.getSeconds().toString().padStart(2, '0')
            ];
        } 
        
        // Handle HH:mm:ss or HH:mm
        const parts = val.split(':');
        return [
            (parts[0] || "08").padStart(2, '0'),
            (parts[1] || "00").padStart(2, '0'),
            (parts[2] || "00").padStart(2, '0')
        ];
    };

    const initialParts = parseValue(value);
    const [hour, setHour] = useState(initialParts[0]);
    const [minute, setMinute] = useState(initialParts[1]);
    const [second, setSecond] = useState(initialParts[2]);

    useEffect(() => {
        const [nh, nm, ns] = parseValue(value);
        setHour(nh);
        setMinute(nm);
        setSecond(ns);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (nh: string, nm: string, ns: string) => {
        const formatted = `${nh.padStart(2, '0')}:${nm.padStart(2, '0')}:${ns.padStart(2, '0')}`;
        onChange?.(formatted);
    };

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
        <div className={cn("relative inline-block w-full", className)} ref={containerRef}>
            <div 
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-between h-10 px-3 py-2 bg-white border rounded-lg cursor-pointer transition-all duration-200",
                    isOpen ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200 hover:border-slate-300",
                    disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""
                )}
            >
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-slate-700 text-sm">
                        {hour}:{minute}:{second}
                    </span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen ? "rotate-180" : "")} />
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 flex gap-4 min-w-[320px] left-0 md:left-auto md:right-0 ring-1 ring-slate-900/5">
                    {/* GIỜ */}
                    <div className="flex-1 space-y-2">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Giờ</div>
                        <div className="h-48 overflow-y-auto scrollbar-hide space-y-1 pr-1 custom-scrollbar">
                            {hours.map(val => (
                                <button
                                    key={val}
                                    onClick={() => handleSelect(val, minute, second)}
                                    className={cn(
                                        "w-full py-1.5 rounded-lg text-sm font-bold transition-all",
                                        hour === val 
                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                                            : "text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PHÚT */}
                    <div className="flex-1 space-y-2 border-l border-slate-100 pl-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Phút</div>
                        <div className="h-48 overflow-y-auto scrollbar-hide space-y-1 pr-1 custom-scrollbar">
                            {minutes.map(val => (
                                <button
                                    key={val}
                                    onClick={() => handleSelect(hour, val, second)}
                                    className={cn(
                                        "w-full py-1.5 rounded-lg text-sm font-bold transition-all",
                                        minute === val 
                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                                            : "text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* GIÂY */}
                    <div className="flex-1 space-y-2 border-l border-slate-100 pl-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Giây</div>
                        <div className="h-48 overflow-y-auto scrollbar-hide space-y-1 pr-1 custom-scrollbar">
                            {seconds.map(val => (
                                <button
                                    key={val}
                                    onClick={() => handleSelect(hour, minute, val)}
                                    className={cn(
                                        "w-full py-1.5 rounded-lg text-sm font-bold transition-all",
                                        second === val 
                                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                                            : "text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex justify-center">
                         <button 
                            onClick={() => setIsOpen(false)}
                            className="bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20"
                         >
                            <Check className="w-3 h-3" /> HOÀN TẤT
                         </button>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
};
