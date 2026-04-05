"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Save/Load preference from localStorage if needed
    useEffect(() => {
        const savedState = localStorage.getItem('sidebar_collapsed');
        if (savedState === 'true') {
            setIsCollapsed(true);
        }
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(prev => {
            const newState = !prev;
            localStorage.setItem('sidebar_collapsed', String(newState));
            return newState;
        });
    };

    const setCollapsed = (collapsed: boolean) => {
        setIsCollapsed(collapsed);
        localStorage.setItem('sidebar_collapsed', String(collapsed));
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, setCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        // Fallback for safety, should ideally wrap all pages
        return {
            isCollapsed: false,
            toggleSidebar: () => {},
            setCollapsed: () => {}
        };
    }
    return context;
};
