"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useOwnerVenues } from '../hooks/useOwnerVenue';

interface OwnerFacilityContextType {
    selectedVenueId: string | null;
    setSelectedVenueId: (id: string | null) => void;
    venues: any[];
    isLoading: boolean;
}

const OwnerFacilityContext = createContext<OwnerFacilityContextType | undefined>(undefined);

export const OwnerFacilityProvider = ({ children }: { children: React.ReactNode }) => {
    const { venues, isLoading } = useOwnerVenues();
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedId = localStorage.getItem('owner_selected_venue_id');
        if (savedId) {
            setSelectedVenueId(savedId);
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage when changed
    useEffect(() => {
        if (selectedVenueId) {
            localStorage.setItem('owner_selected_venue_id', selectedVenueId);
        }
    }, [selectedVenueId]);

    // Default to first venue if none selected and venues are loaded
    useEffect(() => {
        if (isInitialized && venues.length > 0 && !selectedVenueId) {
            setSelectedVenueId(venues[0].id);
        }
    }, [isInitialized, venues, selectedVenueId]);

    return (
        <OwnerFacilityContext.Provider value={{ selectedVenueId, setSelectedVenueId, venues, isLoading }}>
            {children}
        </OwnerFacilityContext.Provider>
    );
};

export const useOwnerFacility = () => {
    const context = useContext(OwnerFacilityContext);
    if (context === undefined) {
        // Return a stable empty state if used outside provider, but normally it should wrap all owner pages
        return {
            selectedVenueId: null,
            setSelectedVenueId: () => {},
            venues: [],
            isLoading: false
        };
    }
    return context;
};
