'use client';

import React from 'react';
import { ChatView } from '@/components/chat/ChatView';
import { Conversation, ChatMessage } from '@/types/chat.types';

export default function AdminMessagesPage() {
    const currentUserId = 'admin-1';

    const mockConversations: Conversation[] = [
        {
            id: 'conv-admin-1',
            type: 'SUPPORT',
            unreadCount: 5,
            updatedAt: new Date().toISOString(),
            name: 'Ticket #45 - Payment Issue',
            participants: [
                { id: 'admin-1', fullName: 'Super Admin', role: 'ADMIN' },
                { id: 'owner-1', fullName: 'Venue Owner John', role: 'OWNER', isOnline: true, avatarUrl: 'https://i.pravatar.cc/150?u=john' }
            ],
            lastMessage: {
                id: 'm-admin-1',
                conversationId: 'conv-admin-1',
                senderId: 'owner-1',
                content: 'I have an issue with my venue verification...',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            },
            metadata: { priority: 'high', ticketId: 'TICKET-0045' }
        }
    ];

    const initialMessages: ChatMessage[] = [
        {
            id: 'system-start',
            conversationId: 'conv-admin-1',
            senderId: 'system',
            content: 'Ticket Created - High Priority',
            type: 'system',
            status: 'read',
            createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: 'm-admin-0',
            conversationId: 'conv-admin-1',
            senderId: 'owner-1',
            content: 'Hello Admin, can you check my venue status?',
            type: 'text',
            status: 'read',
            createdAt: new Date(Date.now() - 3000000).toISOString(),
            sender: mockConversations[0].participants[1]
        }
    ];

    return (
        <div className="pb-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 italic">Support Center</h1>
                <p className="text-sm text-gray-500">Manage support tickets and user inquiries.</p>
            </div>
            <ChatView
                currentUserId={currentUserId}
                mockConversations={mockConversations}
                initialMessages={initialMessages}
            />
        </div>
    );
}
