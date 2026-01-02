export interface Venue {
    id: string;
    name: string;
    description: string;
    address: string;
    ownerId: string;
    images: string[];
    sportTypes: SportType[];
    amenities: string[];
    pricePerHour: number;
    openTime: string;
    closeTime: string;
    isActive: boolean;
    rating: number;
    totalBookings: number;
}

export enum SportType {
    FOOTBALL = 'FOOTBALL',
    BASKETBALL = 'BASKETBALL',
    TENNIS = 'TENNIS',
    BADMINTON = 'BADMINTON',
    VOLLEYBALL = 'VOLLEYBALL'
}

export interface TimeSlot {
    start: string;
    end: string;
    isAvailable: boolean;
    price: number;
}
