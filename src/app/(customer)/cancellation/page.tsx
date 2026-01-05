'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function CancellationPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">Cancellation Policy</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                <Alert className="bg-blue-50 border-blue-100 text-blue-800 mb-8">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="font-bold">Summary</AlertTitle>
                    <AlertDescription>
                        Cancellations are generally allowed up to 24 hours before the booking time for a full refund.
                    </AlertDescription>
                </Alert>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. General Rules</h2>
                    <p>Each venue may have its own specific cancellation policy. However, the default policy for DatSan247 is as follows:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>More than 24 hours notice:</strong> Full refund (minus small processing fee).</li>
                        <li><strong>12-24 hours notice:</strong> 50% refund.</li>
                        <li><strong>Less than 12 hours notice:</strong> No refund.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Weather Conditions</h2>
                    <p>For outdoor venues, if weather conditions make it impossible to play, you may request a reschedule or refund. This is subject to venue owner approval.</p>
                </section>
            </div>
        </div>
    );
}
