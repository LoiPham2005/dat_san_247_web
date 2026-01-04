import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'vi' | 'ja';
export type Theme = 'light' | 'dark' | 'green';

interface SettingsStore {
    language: Language;
    theme: Theme;
    setLanguage: (lang: Language) => void;
    setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            language: 'vi', // Default VI as likely primary
            theme: 'light',

            setLanguage: (language) => set({ language }),
            setTheme: (theme) => {
                // Apply theme class to document element
                if (typeof document !== 'undefined') {
                    const root = document.documentElement;
                    root.classList.remove('dark', 'green');

                    if (theme === 'dark') {
                        root.classList.add('dark');
                    } else if (theme === 'green') {
                        root.classList.add('green');
                    }
                }
                set({ theme });
            },
        }),
        {
            name: 'settings-storage',
            onRehydrateStorage: () => (state) => {
                if (state && typeof document !== 'undefined') {
                    const root = document.documentElement;
                    root.classList.remove('dark', 'green');
                    if (state.theme === 'dark') root.classList.add('dark');
                    if (state.theme === 'green') root.classList.add('green');
                }
            }
        }
    )
);
