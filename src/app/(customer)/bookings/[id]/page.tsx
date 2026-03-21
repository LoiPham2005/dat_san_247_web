import React from 'react';
import { BookingDetailContent } from '@/features/customer/components/BookingDetailContent';

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="py-8 px-4">
            <BookingDetailContent id={id} />
        </div>
    );
}
