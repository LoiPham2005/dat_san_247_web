'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
            <ScrollArea className="h-[600px] rounded-md border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                    <div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">Last Updated: January 1, 2024</p>
                        <Separator className="my-4" />
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Data Collection</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, make a booking, or contact support.</p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use of Information</h2>
                        <p>We use your information to facilitate bookings, communicate with you, and improve our services. We do not sell your personal data to third parties.</p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
                        <p>We take reasonable measures to protect your information from unauthorized access or disclosure.</p>
                    </section>
                </div>
            </ScrollArea>
        </div>
    );
}
