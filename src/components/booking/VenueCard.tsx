
import { Venue } from '@/types/venue.types';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface VenueCardProps {
    venue: Venue;
}

export const VenueCard = ({ venue }: VenueCardProps) => {
    return (
        <Link href={`/venues/${venue.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="h-48 bg-gray-200 rounded-t-lg relative">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image</div>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{venue.name}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{venue.address}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="font-semibold text-primary-600">{(venue.pricePerHour || 0).toLocaleString()} VND/h</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Rating: {venue.rating || 0}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
