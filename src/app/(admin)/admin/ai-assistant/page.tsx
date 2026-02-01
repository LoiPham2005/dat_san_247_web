'use client';

import { AIChatView } from '@/components/chat/AIChatView';
import { useAuthStore } from '@/lib/store/auth.store';

export default function AdminAIAssistant() {
    const { user } = useAuthStore();

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                    System AI Moderator <span className="text-red-600 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-lg text-xs tracking-widest font-black uppercase">Admin Tier</span>
                </h1>
                <p className="text-gray-500 font-medium">Fraud detection, system health check, and advanced moderation tools.</p>
            </div>

            <AIChatView
                role="admin"
                currentUserId={user?.id || 'admin-1'}
                userName={user?.name || 'Admin'}
            />
        </div>
    );
}
