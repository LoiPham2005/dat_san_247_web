'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">Terms of Service</h1>
            <ScrollArea className="h-[600px] rounded-md border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                    <div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">Last Updated: January 1, 2024</p>
                        <Separator className="my-4" />
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            1. Acceptance of Terms
                        </h2>
                        <p>By accessing and using DatSan247, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. User Accounts</h2>
                        <p>To book a venue, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Booking and Payments</h2>
                        <p>All bookings are subject to availability. Prices are set by the venue owners and may change without notice. Full or partial payment may be required at the time of booking.</p>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Prohibited Activities</h2>
                        <p>You agree not to use DatSan247 for any unlawful purpose or to interfere with the proper working of the platform.</p>
                    </section>
                </div>
            </ScrollArea>
        </div>
    );
}
