'use client';

import React from 'react';
import { ChatParticipant, ChatMessage } from '@/types/chat.types';

interface MessageBubbleProps {
    message: ChatMessage;
    isOwn: boolean;
    showAvatar?: boolean;
}

import { Calendar, MapPin, CheckCircle2, MoreVertical, Reply, Forward, Copy, Trash2, ShieldAlert } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const MessageBubble = ({ message, isOwn, showAvatar }: MessageBubbleProps) => {
    const renderContent = () => {
        switch (message.type) {
            case 'booking':
                return (
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden w-[280px]">
                        <div className="bg-gray-50/50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary-500" />
                            <span className="text-[12px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Booking #{message.metadata?.bookingId?.slice(0, 8)}</span>
                        </div>
                        <div className="p-4">
                            <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200 line-clamp-2">{message.content}</p>
                            <div className="mt-3">
                                <span className="px-2 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-green-100 dark:border-green-500/20">Confirmed</span>
                            </div>
                            <button className="w-full mt-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-[12px] font-bold text-gray-700 dark:text-gray-300 rounded-xl transition-all border border-gray-100 dark:border-gray-700">
                                View Details
                            </button>
                        </div>
                    </div>
                );
            case 'venue':
                return (
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden w-[280px]">
                        <div className="h-28 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                            <MapPin className="h-8 w-8 text-gray-400 opacity-30" />
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-primary-600 shadow-sm border border-black/5">Featured</div>
                        </div>
                        <div className="p-4">
                            <p className="text-[14px] font-bold text-gray-900 dark:text-gray-100 truncate">{message.content}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-yellow-500 text-[12px]">★</span>
                                <p className="text-[11px] font-bold text-gray-500">4.8 <span className="font-medium text-gray-400 opacity-60">(120 Reviews)</span></p>
                            </div>
                            <button className="w-full mt-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-[12px] font-bold rounded-xl transition-all shadow-md shadow-primary-500/20">
                                View Venue
                            </button>
                        </div>
                    </div>
                );
            case 'system':
                return (
                    <div className="w-full flex justify-center my-6">
                        <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-gray-100 dark:border-white/5">
                            {message.content}
                        </span>
                    </div>
                );
            default:
                return (
                    <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${isOwn ? 'bg-primary-600 text-white rounded-tr-none ml-10' : 'bg-white dark:bg-[#1e293b] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-800 rounded-tl-none mr-10'}`}>
                        {message.content}
                    </div>
                );
        }
    };

    return (
        <div className={`group relative flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1 items-end gap-2`}>
            {!isOwn && message.type !== 'system' && (
                <div className="w-8 flex-shrink-0">
                    {showAvatar && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-white dark:ring-gray-800 shadow-sm">
                            {message.sender?.avatarUrl ? (
                                <img src={message.sender.avatarUrl} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                                    {message.sender?.fullName?.[0]}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[80%]`}>
                <div className="flex items-center gap-1 group">
                    {isOwn && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MessageActions />
                        </div>
                    )}
                    {renderContent()}
                    {!isOwn && message.type !== 'system' && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MessageActions />
                        </div>
                    )}
                </div>

                {message.type !== 'system' && (
                    <div className="flex items-center gap-1.5 mt-0.5 px-1">
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isOwn && (
                            <span className="text-gray-400">
                                {message.status === 'read' ? (
                                    <CheckCircle2 className="h-3 w-3 text-primary-500 fill-primary-500/10" />
                                ) : (
                                    <CheckCircle2 className="h-3 w-3 opacity-30" />
                                )}
                            </span>
                        )}
                    </div>
                )}

                {message.reactions && message.reactions.length > 0 && (
                    <div className="reaction-bar">
                        {message.reactions.map((r, i) => (
                            <div key={i} className={`reaction-pill ${r.users.includes('me') ? 'reacted' : ''}`}>
                                <span>{r.emoji}</span>
                                <span>{r.count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const MessageActions = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors">
                <MoreVertical className="h-3 w-3" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32">
            <DropdownMenuItem className="text-xs">
                <Reply className="mr-2 h-3 w-3" /> Reply
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
                <Forward className="mr-2 h-3 w-3" /> Forward
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
                <Copy className="mr-2 h-3 w-3" /> Copy
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-red-600">
                <Trash2 className="mr-2 h-3 w-3" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-orange-600">
                <ShieldAlert className="mr-2 h-3 w-3" /> Report
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
