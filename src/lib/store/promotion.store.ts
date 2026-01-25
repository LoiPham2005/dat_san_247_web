import { create } from 'zustand';
import { Promotion } from '@/types/promotion.types';

interface PromotionState {
    promotions: Promotion[];
    isLoading: boolean;
    setPromotions: (promotions: Promotion[]) => void;
    setLoading: (isLoading: boolean) => void;
    updatePromotionStatus: (id: string, status: Promotion['status']) => void;
}

export const usePromotionStore = create<PromotionState>((set) => ({
    promotions: [],
    isLoading: false,
    setPromotions: (promotions) => set({ promotions }),
    setLoading: (isLoading) => set({ isLoading }),
    updatePromotionStatus: (id, status) => set((state) => ({
        promotions: state.promotions.map((p) =>
            p.id === id ? { ...p, status } : p
        )
    })),
}));
