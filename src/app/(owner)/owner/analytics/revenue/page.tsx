"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { OwnerRevenueAnalyticsDetailed } from '../../../../../features/owner/components/OwnerRevenueAnalyticsDetailed';

export default function OwnerRevenueAnalyticsPage() {
    const searchParams = useSearchParams();
    const venueId = searchParams.get('venueId') || '';

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 animate-in fade-in duration-500">
            <OwnerRevenueAnalyticsDetailed venueId={venueId} />
        </div>
    );
}
