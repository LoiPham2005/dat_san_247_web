import { User } from './auth.types';
import { Venue } from './venue.types';

export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CHECKED_IN = 'CHECKED_IN',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    NO_SHOW = 'NO_SHOW',
}

export interface Booking {
    id: string;
    bookingCode: string;
    customerId: string;
    courtId: string;
    venueId: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    status: BookingStatus;
    totalAmount: number;
    depositAmount: number;
    customerName: string;
    customerPhone: string;
    note?: string;
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
