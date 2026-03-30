import { Metadata } from 'next';
import { VenueMapFullView } from '@/features/venue/components/VenueMapFullView';

export const metadata: Metadata = {
    title: 'Bản đồ sân thể thao | DatSan247',
    description: 'Tìm kiếm và khám phá các sân thể thao trên bản đồ trực quan',
};

export default function VenuesMapPage() {
    return (
        <main className="flex-1 w-full overflow-hidden">
            <VenueMapFullView />
        </main>
    );
}
