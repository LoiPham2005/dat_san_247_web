export interface ChatParticipant {
    id: string;
    fullName: string;
    avatarUrl?: string;
    role: string;
    isOnline?: boolean;
    lastSeen?: string;
}

export interface ChatMessage {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'file' | 'location' | 'booking' | 'venue' | 'system' | 'voice';
    status: 'sending' | 'sent' | 'delivered' | 'read';
    createdAt: string;
    sender?: ChatParticipant;
    metadata?: {
        bookingId?: string;
        venueId?: string;
        fileUrl?: string;
        fileName?: string;
        latitude?: number;
        longitude?: number;
        duration?: number; // for voice/video
    };
    reactions?: { emoji: string; count: number; users: string[] }[];
    replyToId?: string;
}

export type ConversationType = 'DIRECT' | 'GROUP' | 'SUPPORT' | 'BOOKING' | 'VENUE';

export interface Conversation {
    id: string;
    type: ConversationType;
    participants: ChatParticipant[];
    lastMessage?: ChatMessage;
    unreadCount: number;
    updatedAt: string;
    isPinned?: boolean;
    isMuted?: boolean;
    name?: string; // For group chats or venue chats
    avatarUrl?: string;
    metadata?: {
        venueId?: string;
        bookingId?: string;
        ticketId?: string;
        priority?: 'low' | 'medium' | 'high' | 'urgent';
    };
}
