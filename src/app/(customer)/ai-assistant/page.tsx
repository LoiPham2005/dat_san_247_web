'use client';

import { AIChatView } from '@/components/chat/AIChatView';
import { useAuthStore } from '@/lib/store/auth.store';

export default function CustomerAIAssistant() {
    const { user } = useAuthStore();

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        AI Assistant <span className="text-primary-600">Beta</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Your personal help for finding and booking sports venues.</p>
                </div>

                <AIChatView
                    role="customer"
                    currentUserId={user?.id || 'guest'}
                    userName={user?.name || 'Customer'}
                />
            </div>
        </div>
    );
}
