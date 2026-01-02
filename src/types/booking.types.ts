import { User } from './auth.types';
import { Venue } from './venue.types';

export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export interface Booking {
    id: string;
    userId: string;
    venueId: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: BookingStatus;
    notes?: string;
    createdAt: string;
    user?: User;
    venue?: Venue;
}

export interface CreateBookingData {
    venueId: string;
    startTime: string;
    endTime: string;
    notes?: string;
}
