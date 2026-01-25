import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleCollapse: () => void;
    setCollapsed: (collapsed: boolean) => void;
    setMobileOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            isCollapsed: false,
            isMobileOpen: false,
            toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
            setCollapsed: (isCollapsed) => set({ isCollapsed }),
            setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
        }),
        {
            name: 'sidebar-storage',
        }
    )
);
