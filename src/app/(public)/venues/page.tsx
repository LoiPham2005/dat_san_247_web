import { Metadata } from 'next';
import { CustomerVenueSearch } from '@/features/venue/components/CustomerVenueSearch';

export const metadata: Metadata = {
    title: 'Tìm sân thể thao | DatSan247',
    description: 'Khám phá và đặt các sân bóng đá, cầu lông, tennis chất lượng nhất',
};

export default function VenuesSearchPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                <CustomerVenueSearch />
            </div>
        </div>
    );
}
