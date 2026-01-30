import { create } from 'zustand';
import { Promotion } from '@/types/promotion.types';

interface PromotionStore {
    promotions: Promotion[];
    setPromotions: (promotions: Promotion[]) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const usePromotionStore = create<PromotionStore>((set) => ({
    promotions: [],
    setPromotions: (promotions) => set({ promotions }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));
