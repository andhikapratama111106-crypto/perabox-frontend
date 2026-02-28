'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
    onAddressSelect: (address: string, lat: number, lng: number) => void;
    initialAddress?: string;
}

// Component to handle map movement and center tracking
function MapController({ onPositionChange }: { onPositionChange: (pos: L.LatLng) => void }) {
    const map = useMapEvents({
        moveend: () => {
            onPositionChange(map.getCenter());
        },
    });
    return null;
}

export default function MapPicker({ onAddressSelect, initialAddress }: MapPickerProps) {
    const [center, setCenter] = useState<L.LatLngExpression>([-6.2088, 106.8456]); // Jakarta default
    const [address, setAddress] = useState(initialAddress || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const mapRef = useRef<L.Map | null>(null);

    // Geocoding function using Nominatim
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const formattedAddress = data.display_name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
            setAddress(formattedAddress);
            setSearchQuery(formattedAddress);
            onAddressSelect(formattedAddress, lat, lng);
        } catch (error) {
            console.error('Reverse geocoding failed', error);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                const newCenter: L.LatLngExpression = [parseFloat(lat), parseFloat(lon)];
                setCenter(newCenter);
                setAddress(display_name);
                onAddressSelect(display_name, parseFloat(lat), parseFloat(lon));

                if (mapRef.current) {
                    mapRef.current.setView(newCenter, 16);
                }
            }
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setIsSearching(false);
        }
    };

    // Initialize with user location if possible
    useEffect(() => {
        if ("geolocation" in navigator && !initialAddress) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCenter([latitude, longitude]);
                reverseGeocode(latitude, longitude);
            });
        }
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari lokasi anda..."
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
                <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-bold transition-all text-sm disabled:opacity-50"
                >
                    {isSearching ? '...' : 'Cari'}
                </button>
            </form>

            {/* Map Container */}
            <div className="relative h-[300px] w-full rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner group">
                <MapContainer
                    center={center}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    ref={mapRef}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapController onPositionChange={(newCenter) => {
                        reverseGeocode(newCenter.lat, newCenter.lng);
                    }} />
                </MapContainer>

                {/* Fixed Center Pin (Gojek Style) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-[1000] pointer-events-none mb-4">
                    <div className="relative flex flex-col items-center">
                        <div className="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-bounce">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="w-2 h-2 bg-dark/20 rounded-full blur-[1px] mt-1" />
                    </div>
                </div>

                {/* Floating Map Help */}
                <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm pointer-events-none">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Geser peta untuk menentukan titik</p>
                </div>
            </div>

            {/* Selected Address Display */}
            {address && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-xs text-gray-600 leading-tight">
                        <span className="font-bold text-dark block mb-1">Lokasi Terpilih:</span>
                        {address}
                    </p>
                </div>
            )}
        </div>
    );
}
