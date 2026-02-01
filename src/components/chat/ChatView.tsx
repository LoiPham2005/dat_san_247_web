'use client';

import React, { useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { Conversation, ChatMessage } from '@/types/chat.types';
import '@/app/chat.css';

interface ChatViewProps {
    currentUserId: string;
    mockConversations: Conversation[];
    initialMessages: ChatMessage[];
}

export const ChatView = ({ currentUserId, mockConversations, initialMessages }: ChatViewProps) => {
    const [conversations] = useState<Conversation[]>(mockConversations);
    const [activeId, setActiveId] = useState<string | null>(mockConversations[0]?.id || null);
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

    const activeConversation = conversations.find(c => c.id === activeId) || null;
    const filteredMessages = messages.filter(m => m.conversationId === activeId);

    const handleSendMessage = (content: string) => {
        if (!activeId) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            conversationId: activeId,
            senderId: currentUserId,
            content,
            type: 'text' as const,
            status: 'sent' as const,
            createdAt: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMessage]);
    };

    return (
        <div className="chat-container flex w-full h-[750px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <ChatSidebar
                conversations={conversations}
                activeId={activeId || undefined}
                onSelect={setActiveId}
                currentUserId={currentUserId}
            />
            <ChatWindow
                conversation={activeConversation}
                messages={filteredMessages}
                currentUserId={currentUserId}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};
