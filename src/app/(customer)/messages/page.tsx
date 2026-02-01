'use client';

import React from 'react';
import { ChatView } from '@/components/chat/ChatView';
import { Conversation, ChatMessage } from '@/types/chat.types';

export default function CustomerMessagesPage() {
    const currentUserId = 'customer-1';

    const mockConversations: Conversation[] = [
        {
            id: 'conv-1',
            type: 'VENUE',
            isPinned: true,
            unreadCount: 2,
            updatedAt: new Date().toISOString(),
            name: 'Stadium ABC - Owner Nguyen',
            participants: [
                { id: 'customer-1', fullName: 'John Doe', role: 'CUSTOMER' },
                { id: 'owner-1', fullName: 'Nguyen Owner', role: 'OWNER', isOnline: true, avatarUrl: 'https://i.pravatar.cc/150?u=nguyen' }
            ],
            lastMessage: {
                id: 'm-1',
                conversationId: 'conv-1',
                senderId: 'owner-1',
                content: 'Booking confirmed! See you then.',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            }
        },
        {
            id: 'conv-2',
            type: 'SUPPORT',
            unreadCount: 0,
            updatedAt: new Date().toISOString(),
            name: 'Customer Support',
            participants: [
                { id: 'customer-1', fullName: 'John Doe', role: 'CUSTOMER' },
                { id: 'admin-1', fullName: 'Support Admin', role: 'ADMIN', isOnline: true }
            ],
            lastMessage: {
                id: 'm-2',
                conversationId: 'conv-2',
                senderId: 'admin-1',
                content: 'How can I help you today?',
                type: 'text',
                status: 'read',
                createdAt: new Date(Date.now() - 3600000).toISOString()
            }
        }
    ];

    const initialMessages: ChatMessage[] = [
        {
            id: 'msg-1',
            conversationId: 'conv-1',
            senderId: 'customer-1',
            content: 'Hello, is the court available tomorrow at 6 PM?',
            type: 'text',
            status: 'read',
            createdAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
            id: 'msg-2',
            conversationId: 'conv-1',
            senderId: 'owner-1',
            content: 'Yes, it is!',
            type: 'text',
            status: 'read',
            createdAt: new Date(Date.now() - 7100000).toISOString()
        },
        {
            id: 'msg-3',
            conversationId: 'conv-1',
            senderId: 'customer-1',
            content: 'Great, I will book it now.',
            type: 'text',
            status: 'read',
            createdAt: new Date(Date.now() - 7000000).toISOString()
        },
        {
            id: 'msg-4',
            conversationId: 'conv-1',
            senderId: 'owner-1',
            content: 'Stadium ABC',
            type: 'venue',
            status: 'read',
            createdAt: new Date(Date.now() - 6900000).toISOString()
        },
        {
            id: 'msg-5',
            conversationId: 'conv-1',
            senderId: 'owner-1',
            content: 'Confirmed for 18:00 - 20:00',
            type: 'booking',
            status: 'read',
            createdAt: new Date(Date.now() - 6800000).toISOString(),
            metadata: { bookingId: 'BK12345678' }
        },
        {
            id: 'system-1',
            conversationId: 'conv-1',
            senderId: 'system',
            content: 'Today',
            type: 'system',
            status: 'read',
            createdAt: new Date().toISOString()
        }
    ];

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 italic">My Conversations</h1>
                <p className="text-sm text-gray-500">Chat with venue owners and support staff.</p>
            </div>
            <ChatView
                currentUserId={currentUserId}
                mockConversations={mockConversations}
                initialMessages={initialMessages}
            />
        </div>
    );
}
