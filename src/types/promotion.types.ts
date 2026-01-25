export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export enum PromotionStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    INACTIVE = 'INACTIVE',
}

export interface Promotion {
    id: string;
    code: string;
    name: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscountAmount?: number;
    minBookingAmount: number;
    usageLimit?: number;
    usageCount: number;
    validFrom: string;
    validTo: string;
    status: PromotionStatus;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePromotionDto {
    code: string;
    name: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscountAmount?: number;
    minBookingAmount?: number;
    usageLimit?: number;
    validFrom: string;
    validTo: string;
    status?: PromotionStatus;
}

export interface UpdatePromotionDto extends Partial<CreatePromotionDto> { }
