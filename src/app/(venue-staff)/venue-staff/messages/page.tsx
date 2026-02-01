'use client';

import React from 'react';
import { ChatView } from '@/components/chat/ChatView';
import { Conversation, ChatMessage } from '@/types/chat.types';

export default function VenueStaffMessagesPage() {
    const currentUserId = 'vstaff-1';

    const mockConversations: Conversation[] = [
        {
            id: 'conv-vs-1',
            type: 'VENUE',
            unreadCount: 1,
            updatedAt: new Date().toISOString(),
            name: 'Administrative - Stadium ABC',
            participants: [
                { id: 'vstaff-1', fullName: 'Court Staff', role: 'VENUE_STAFF' },
                { id: 'owner-1', fullName: 'Venue Owner', role: 'OWNER', isOnline: true }
            ],
            lastMessage: {
                id: 'm-vs-1',
                conversationId: 'conv-vs-1',
                senderId: 'owner-1',
                content: 'Everything ready for the 8 PM slot?',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            }
        },
        {
            id: 'conv-vs-2',
            type: 'BOOKING',
            unreadCount: 2,
            updatedAt: new Date().toISOString(),
            name: 'Booking Management',
            participants: [
                { id: 'vstaff-1', fullName: 'Court Staff', role: 'VENUE_STAFF' },
                { id: 'cus-1', fullName: 'Nguyễn Văn Hải', role: 'CUSTOMER', isOnline: true, avatarUrl: 'https://i.pravatar.cc/150?u=hai' }
            ],
            lastMessage: {
                id: 'm-vs-2',
                conversationId: 'conv-vs-2',
                senderId: 'cus-1',
                content: 'Sân 1 có nướt lọc không bạn?',
                type: 'text',
                status: 'read',
                createdAt: new Date().toISOString()
            }
        }
    ];

    return (
        <div className="pb-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 italic">Venue Internal Chat</h1>
                <p className="text-sm text-gray-500">Coordinate with owners and handle walk-in customers.</p>
            </div>
            <ChatView
                currentUserId={currentUserId}
                mockConversations={mockConversations}
                initialMessages={[]}
            />
        </div>
    );
}
