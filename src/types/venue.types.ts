export enum VenueStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    SUSPENDED = 'SUSPENDED',
}

export interface Venue {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    ownerId: string;
    phone?: string;
    owner?: {
        fullName: string;
        email: string;
        phone: string;
    };
    status: VenueStatus;
    thumbnailUrl: string;
    images?: any[];
    amenities?: any[];
    courts?: any[];
    isActive: boolean;
    rating: number;
    totalReviews: number;
    openingTime: string;
    closingTime: string;
    createdAt: string;
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
