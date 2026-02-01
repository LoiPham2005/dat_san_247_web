'use client';

import React from 'react';
import { ChatView } from '@/components/chat/ChatView';
import { Conversation, ChatMessage } from '@/types/chat.types';

export default function OwnerMessagesPage() {
    const currentUserId = 'owner-1';

    const mockConversations: Conversation[] = [
        {
            id: 'conv-owner-1',
            type: 'DIRECT',
            unreadCount: 3,
            updatedAt: new Date().toISOString(),
            participants: [
                { id: 'owner-1', fullName: 'Venue Manager', role: 'OWNER' },
                { id: 'customer-1', fullName: 'John Doe', role: 'CUSTOMER', isOnline: true, avatarUrl: 'https://i.pravatar.cc/150?u=customer1' }
            ],
            lastMessage: {
                id: 'm-owner-1',
                conversationId: 'conv-owner-1',
                senderId: 'customer-1',
                content: 'Is the court available 15 mins earlier?',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            }
        },
        {
            id: 'staff-group-1',
            type: 'GROUP',
            name: 'Stadium ABC Staff',
            unreadCount: 0,
            updatedAt: new Date().toISOString(),
            participants: [
                { id: 'owner-1', fullName: 'Manager', role: 'OWNER' },
                { id: 'staff-1', fullName: 'Worker A', role: 'STAFF' },
                { id: 'staff-2', fullName: 'Worker B', role: 'STAFF' }
            ],
            lastMessage: {
                id: 'm-s-1',
                conversationId: 'staff-group-1',
                senderId: 'owner-1',
                content: 'Everyone check the schedule for next week.',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            }
        }
    ];

    return (
        <div className="pb-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 italic">Owner Inbox</h1>
                <p className="text-sm text-gray-500">Manage customers and staff communications.</p>
            </div>
            <ChatView
                currentUserId={currentUserId}
                mockConversations={mockConversations}
                initialMessages={[]}
            />
        </div>
    );
}
