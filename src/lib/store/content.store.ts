import { create } from 'zustand';

interface ContentStore {
    banners: any[];
    setBanners: (banners: any[]) => void;
    addBanner: (banner: any) => void;
    updateBanner: (id: string, banner: any) => void;
    removeBanner: (id: string) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
    banners: [],
    setBanners: (banners) => set({ banners }),
    addBanner: (banner) => set((state) => ({ banners: [...state.banners, banner] })),
    updateBanner: (id, updatedBanner) =>
        set((state) => ({
            banners: state.banners.map((b) => (b.id === id ? updatedBanner : b)),
        })),
    removeBanner: (id) =>
        set((state) => ({
            banners: state.banners.filter((b) => b.id !== id),
        })),
}));
