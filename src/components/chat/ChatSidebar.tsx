'use client';

import React from 'react';
import { Conversation } from '@/types/chat.types';
import { Pin, MessageSquare, ShieldAlert, Calendar, BellOff, Settings, MoreHorizontal, Check, Archive, Trash2, MapPin, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface ChatSidebarProps {
    conversations: Conversation[];
    activeId?: string;
    onSelect: (id: string) => void;
    currentUserId: string;
}


export const ChatSidebar = ({ conversations, activeId, onSelect, currentUserId }: ChatSidebarProps) => {
    const tabs = [
        { id: 'all', label: 'All', icon: MessageSquare },
        { id: 'venue', label: 'Venue', icon: MapPin },
        { id: 'support', label: 'Support', icon: ShieldAlert },
        { id: 'booking', label: 'Booking', icon: Calendar },
        { id: 'muted', label: 'Muted', icon: BellOff },
    ];

    const pinnedConversations = conversations.filter(c => c.isPinned);
    const unpinnedConversations = conversations.filter(c => !c.isPinned);

    const renderConversationItem = (conv: Conversation) => {
        const otherParticipant = conv.participants.find(p => p.id !== currentUserId);
        const isActive = conv.id === activeId;

        return (
            <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all border-b border-black/5 dark:border-white/5 relative group ${isActive ? 'bg-primary-50 dark:bg-primary-900/10 border-l-4 border-l-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            >
                <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-sm">
                        {conv.avatarUrl || otherParticipant?.avatarUrl ? (
                            <img src={conv.avatarUrl || otherParticipant?.avatarUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center font-bold text-gray-500 text-sm">
                                {conv.name?.[0] || otherParticipant?.fullName?.[0]}
                            </div>
                        )}
                    </div>
                    {otherParticipant?.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <p className={`text-[14px] truncate ${isActive ? 'font-bold text-primary-900 dark:text-primary-100' : 'font-semibold text-gray-900 dark:text-gray-200'}`}>
                                {conv.name || otherParticipant?.fullName || 'Unknown User'}
                            </p>
                            {conv.isPinned && <Pin className="h-3 w-3 text-gray-400 rotate-45" />}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter shrink-0">
                            {conv.lastMessage ? new Date(conv.lastMessage.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : ''}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className={`text-[12px] truncate pr-4 ${conv.unreadCount > 0 ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-500'}`}>
                            {conv.lastMessage?.content || 'No messages yet...'}
                        </p>
                        <div className="flex items-center gap-2">
                            {conv.isMuted && <BellOff className="h-3 w-3 text-gray-300" />}
                            {conv.unreadCount > 0 && (
                                <span className="h-5 w-5 bg-primary-600 text-[10px] text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary-500/30">
                                    {conv.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <ConversationActions conv={conv} />
                </div>
            </div>
        );
    };

    return (
        <div className="chat-sidebar flex flex-col w-[360px] border-r border-gray-100 dark:border-gray-800 bg-[#fcfcfc] dark:bg-slate-900 shrink-0 h-full overflow-hidden">
            <div className="sidebar-header p-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Messages</h2>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="sidebar-tabs flex px-4 gap-4 border-b border-gray-100 dark:border-gray-800 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab-item px-1 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer transition-all border-b-2 ${tab.id === 'all' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent hover:text-primary-600'}`}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            <div className="conversation-list flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {pinnedConversations.length > 0 && (
                    <>
                        <div className="conversation-section-label px-5 py-3 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Pinned Chats</div>
                        {pinnedConversations.map(renderConversationItem)}
                    </>
                )}

                <div className="conversation-section-label px-5 py-3 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">All Messages</div>
                {unpinnedConversations.map(renderConversationItem)}
            </div>
        </div>
    );
};

const ConversationActions = ({ conv }: { conv: Conversation }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
                onClick={(e) => e?.stopPropagation()}
                className="p-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full shadow-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            >
                <MoreHorizontal className="h-3 w-3" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="text-xs" onClick={(e) => { e?.stopPropagation(); /* Logic here */ }}>
                {conv.isPinned ? <><Pin className="mr-2 h-3 w-3 rotate-45" /> Unpin</> : <><Pin className="mr-2 h-3 w-3" /> Pin to TOP</>}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={(e) => { e?.stopPropagation(); }}>
                {conv.isMuted ? <><BellOff className="mr-2 h-3 w-3" /> Unmute</> : <><BellOff className="mr-2 h-3 w-3" /> Mute Notifications</>}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={(e) => { e?.stopPropagation(); }}>
                <Check className="mr-2 h-3 w-3" /> Mark as Read
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs" onClick={(e) => { e?.stopPropagation(); }}>
                <Archive className="mr-2 h-3 w-3" /> Archive Chat
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-red-600" onClick={(e) => { e?.stopPropagation(); }}>
                <Trash2 className="mr-2 h-3 w-3" /> Delete Chat
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
