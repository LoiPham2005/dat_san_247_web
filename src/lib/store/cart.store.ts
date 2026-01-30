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
    selected?: boolean;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    toggleSelection: (id: string) => void;
    toggleAll: (selected: boolean) => void;
    clearCart: () => void;
    clearSelectedItems: () => void;
    getTotal: () => number;
    getSelectedItems: () => CartItem[];
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const exists = get().items.find(i => i.id === item.id);
                if (exists) return;
                set((state) => ({ items: [...state.items, { ...item, selected: true }] }));
            },
            removeItem: (id) => {
                set((state) => ({ items: state.items.filter(i => i.id !== id) }));
            },
            toggleSelection: (id) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === id ? { ...item, selected: !item.selected } : item
                    )
                }));
            },
            toggleAll: (selected) => {
                set((state) => ({
                    items: state.items.map(item => ({ ...item, selected }))
                }));
            },
            clearCart: () => set({ items: [] }),
            clearSelectedItems: () => {
                set((state) => ({ items: state.items.filter(item => !item.selected) }));
            },
            getTotal: () => {
                return get().items
                    .filter(item => item.selected)
                    .reduce((total, item) => total + item.price, 0);
            },
            getSelectedItems: () => {
                return get().items.filter(item => item.selected);
            },
        }),
        {
            name: 'booking-cart',
        }
    )
);
