import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // Unique ID for the cart item (hash of venue+court+time)
    venueId: string;
    venueName: string;
    courtId: string;
    courtName: string;
    sportType: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    thumbnailUrl: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const exists = get().items.find(i => i.id === item.id);
                if (exists) return;
                set((state) => ({ items: [...state.items, item] }));
            },
            removeItem: (id) => {
                set((state) => ({ items: state.items.filter(i => i.id !== id) }));
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price, 0);
            },
        }),
        {
            name: 'booking-cart',
        }
    )
);
