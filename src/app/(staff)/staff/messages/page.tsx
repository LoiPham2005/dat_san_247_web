'use client';

import React from 'react';
import { ChatView } from '@/components/chat/ChatView';
import { Conversation, ChatMessage } from '@/types/chat.types';

export default function StaffMessagesPage() {
    const currentUserId = 'staff-1';

    const mockConversations: Conversation[] = [
        {
            id: 'conv-staff-1',
            type: 'SUPPORT',
            unreadCount: 0,
            updatedAt: new Date().toISOString(),
            name: 'Moderation Chat',
            participants: [
                { id: 'staff-1', fullName: 'Moderator', role: 'STAFF' },
                { id: 'customer-1', fullName: 'Reported User', role: 'CUSTOMER', isOnline: true }
            ],
            lastMessage: {
                id: 'm-staff-1',
                conversationId: 'conv-staff-1',
                senderId: 'staff-1',
                content: 'Please explain the booking dispute...',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            }
        }
    ];

    return (
        <div className="pb-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 italic">Staff Workspace</h1>
                <p className="text-sm text-gray-500">Handle support tickets and site moderation.</p>
            </div>
            <ChatView
                currentUserId={currentUserId}
                mockConversations={mockConversations}
                initialMessages={[]}
            />
        </div>
    );
}
