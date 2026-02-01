'use client';

import { AIChatView } from '@/components/chat/AIChatView';
import { useAuthStore } from '@/lib/store/auth.store';

export default function OwnerAIAssistant() {
    const { user } = useAuthStore();

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                    Business AI Analyst <span className="text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-lg text-xs">AI POWERED</span>
                </h1>
                <p className="text-gray-500 font-medium">Analyze your revenue, manage staff, and optimize venue performance with AI.</p>
            </div>

            <AIChatView
                role="owner"
                currentUserId={user?.id || 'owner-1'}
                userName={user?.name || 'Owner'}
            />
        </div>
    );
}
