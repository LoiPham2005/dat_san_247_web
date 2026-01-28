
import { Booking } from '@/types/booking.types';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, formatTime, formatCurrency } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

interface BookingCardProps {
    booking: Booking;
    onCancel?: (id: string) => void;
}

export const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
    return (
        <Card className="mb-4">
            <CardContent className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">{booking.venue?.name}</h3>
                    <p className="text-gray-600">{formatDate(booking.startTime)} | {formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>
                    <p className="font-semibold text-primary-600">{formatCurrency(booking.totalAmount)}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {booking.status}
                    </span>
                </div>
                {onCancel && booking.status === 'PENDING' && (
                    <Button variant="destructive" size="sm" onClick={() => onCancel(booking.id)}>
                        Cancel
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
