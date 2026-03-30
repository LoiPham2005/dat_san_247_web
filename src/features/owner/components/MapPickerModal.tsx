"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { X, MapPin, Check, Locate, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

// Sub-component and sub-hook to handle map events
const LocationPicker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

interface MapPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (lat: number, lng: number) => void;
    initialLat?: number | null;
    initialLng?: number | null;
}

const MapPickerModal: React.FC<MapPickerModalProps> = ({ 
    isOpen, onClose, onSave, initialLat, initialLng 
}) => {
    const [markerPos, setMarkerPos] = useState<[number, number] | null>(
        initialLat && initialLng ? [initialLat, initialLng] : null
    );
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && initialLat && initialLng) {
            setMarkerPos([initialLat, initialLng]);
        }
    }, [isOpen, initialLat, initialLng]);

    if (!isOpen || !isMounted) return null;

    // Custom Icon for pinpoint
    const customIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div class="marker-wrapper is-selected">
                <div class="marker-body" style="background-color: #10B981">
                    <span class="marker-icon">📍</span>
                </div>
              </div>`,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
    });

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border border-slate-200">
                
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" /> Xác định vị trí sân
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">Nhấp vào bản đồ để chọn tọa độ chính xác cho cơ sở của bạn</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl hover:bg-slate-100">
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative bg-slate-50 overflow-hidden">
                    <MapContainer 
                        center={markerPos || [21.0285, 105.8542]} 
                        zoom={13} 
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationPicker onLocationSelect={(lat, lng) => setMarkerPos([lat, lng])} />
                        
                        {markerPos && (
                            <Marker position={markerPos} icon={customIcon} />
                        )}
                    </MapContainer>

                    {/* Tutorial Hover */}
                    {!markerPos && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
                            <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 flex items-center gap-3 animate-pulse">
                                <Locate className="w-5 h-5 text-primary" />
                                <span className="font-bold text-slate-800 text-sm font-sans whitespace-nowrap">Nhấp vào bản đồ để ghim vị trí</span>
                            </div>
                        </div>
                    )}

                    {/* Coordinates Overlay */}
                    {markerPos && (
                        <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none">
                            <div className="px-5 py-3 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl text-white flex flex-col gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tọa độ đã chọn</span>
                                <div className="font-mono text-sm tracking-tighter">
                                    {markerPos[0].toFixed(6)} , {markerPos[1].toFixed(6)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium italic hidden md:block">
                        * Tọa độ sẽ tự động cập nhật vào thông tin cơ sở
                    </p>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Button variant="outline" onClick={onClose} className="h-12 w-full md:w-32 rounded-2xl font-bold border-slate-200">Hủy</Button>
                        <Button 
                            disabled={!markerPos}
                            onClick={() => markerPos && onSave(markerPos[0], markerPos[1])} 
                            className="h-12 w-full md:w-48 rounded-2xl font-black shadow-lg shadow-primary/20"
                        >
                            <Check className="w-5 h-5 mr-2" /> Lưu Vị Trí
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .leaflet-container {
                    cursor: crosshair !important;
                }
                .marker-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
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
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
                .marker-icon {
                    transform: rotate(45deg);
                    font-size: 18px;
                    line-height: 1;
                }
            `}</style>
        </div>
    );
};

export default MapPickerModal;
