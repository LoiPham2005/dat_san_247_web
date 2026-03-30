"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils/cn';

// Mapping sport to Icon & Color
const sportConfig: Record<string, { icon: string, color: string }> = {
    'FOOTBALL': { icon: '⚽', color: '#3B82F6' }, // Blue
    'FOOTBALL_5': { icon: '⚽', color: '#3B82F6' },
    'FOOTBALL_7': { icon: '⚽', color: '#2563EB' },
    'BADMINTON': { icon: '🏸', color: '#F59E0B' }, // Amber
    'TENNIS': { icon: '🎾', color: '#84CC16' },   // Lime
    'BASKETBALL': { icon: '🏀', color: '#F97316' }, // Orange
    'PICKLEBALL': { icon: '🏓', color: '#8B5CF6' }, // Violet
    'DEFAULT': { icon: '🏆', color: '#64748B' }    // Slate
};

const createSportIcon = (sports: string[], isSelected: boolean) => {
    const mainSport = sports?.[0] || 'DEFAULT';
    const config = sportConfig[mainSport] || sportConfig['DEFAULT'];
    
    const iconColor = isSelected ? '#10B981' : config.color; // Emerald when selected

    return L.divIcon({
        className: 'custom-sport-marker',
        html: `
            <div class="marker-wrapper ${isSelected ? 'is-selected' : ''}">
                <div class="marker-body" style="background-color: ${iconColor}">
                    <span class="marker-icon">${config.icon}</span>
                </div>
                <div class="marker-pin" style="border-top-color: ${iconColor}"></div>
            </div>
        `,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -42],
    });
};

interface OSMMapProps {
    venues: any[];
    selectedVenue: any;
    onVenueSelect: (venue: any) => void;
    onVenuePreview?: (venue: any) => void;
}

const MapViewHandler = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 15, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

const OSMMap: React.FC<OSMMapProps> = ({ venues, selectedVenue, onVenueSelect, onVenuePreview }) => {
    const defaultCenter: [number, number] = [21.0285, 105.8542];
    const initialCenter = selectedVenue 
        ? [selectedVenue.latitude, selectedVenue.longitude] as [number, number] 
        : venues.length > 0 && venues[0].latitude
            ? [venues[0].latitude, venues[0].longitude] as [number, number]
            : defaultCenter;

    return (
        <div className="h-full w-full relative z-0">
            <MapContainer 
                key="main-osm-map"
                center={initialCenter} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                
                <ZoomControl position="topright" />
                
                {selectedVenue && selectedVenue.latitude && (
                    <MapViewHandler center={[selectedVenue.latitude, selectedVenue.longitude]} />
                )}

                {venues.map((v) => {
                    if (!v.latitude || !v.longitude) return null;
                    
                    const isSelected = selectedVenue?.id === v.id;
                    
                    return (
                        <Marker 
                            key={v.id} 
                            position={[v.latitude, v.longitude]}
                            icon={createSportIcon(v.sports, isSelected)}
                            eventHandlers={{
                                click: () => onVenueSelect(v),
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1 min-w-[180px]">
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{v.name}</h4>
                                    <p className="text-[10px] text-slate-500 mb-2 truncate">{v.address}</p>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-primary font-black text-xs">{(v.min_price || 0).toLocaleString()}đ</span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-600">
                                            ⭐ {v.rating?.toFixed(1) || '5.0'}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onVenuePreview?.(v);
                                        }}
                                        className="w-full py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-primary transition-colors"
                                    >
                                        Xem nhanh
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            <style jsx global>{`
                .leaflet-container {
                    background: #f8fafc;
                }
                .marker-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                }
                .marker-wrapper.is-selected {
                    transform: scale(1.2);
                    filter: drop-shadow(0 10px 15px rgba(16, 185, 129, 0.4));
                    z-index: 1000 !important;
                }
                .marker-body {
                    width: 36px;
                    height: 36px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid white;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .marker-icon {
                    transform: rotate(45deg);
                    font-size: 18px;
                    line-height: 1;
                }
                .is-selected .marker-body {
                    border-color: #ECFDF5;
                }
                
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    padding: 4px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .custom-popup .leaflet-popup-tip {
                    background: white;
                }
                .leaflet-bar {
                    border: none !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                }
                .leaflet-bar a {
                    background-color: white !important;
                    color: #475569 !important;
                    border: 1px solid #f1f5f9 !important;
                }
                .leaflet-bar a:first-child { border-radius: 12px 12px 0 0 !important; }
                .leaflet-bar a:last-child { border-radius: 0 0 12px 12px !important; }
            `}</style>
        </div>
    );
};

export default OSMMap;
