'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/context/LanguageContext';

// Fix for default marker icons in React-Leaflet
if (typeof window !== 'undefined') {
    const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
}

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
    const { t } = useLanguage();
    const [center, setCenter] = useState<L.LatLngExpression>([-6.2088, 106.8456]); // Jakarta default
    const [address, setAddress] = useState(initialAddress || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
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

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const handleUseMyLocation = () => {
        if (!("geolocation" in navigator)) {
            alert(t('bookPage.map.locationError'));
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newCenter: L.LatLngExpression = [latitude, longitude];
                setCenter(newCenter);
                reverseGeocode(latitude, longitude);
                if (mapRef.current) {
                    mapRef.current.setView(newCenter, 16);
                }
                setIsLocating(false);
            },
            (error) => {
                console.error("Error getting location", error);
                setIsLocating(false);
                alert(t('bookPage.map.locationError'));
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    // Initialize with user location if possible
    useEffect(() => {
        if ("geolocation" in navigator && !initialAddress) {
            handleUseMyLocation();
        }
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Search Bar & Location Button */}
            <div className="flex flex-col gap-2">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            placeholder={t('bookPage.map.searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
                        />
                        <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="bg-dark hover:bg-dark/90 text-white px-6 py-3 rounded-2xl font-bold transition-all text-sm disabled:opacity-50 shadow-lg shadow-dark/10"
                    >
                        {isSearching ? '...' : t('bookPage.map.searchBtn')}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleUseMyLocation}
                    disabled={isLocating}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-dark hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                >
                    {isLocating ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    )}
                    {t('bookPage.map.useMyLocation')}
                </button>
            </div>

            {/* Map Container */}
            <div className="relative h-[300px] w-full rounded-[2.5rem] overflow-hidden border-2 border-white shadow-2xl group ring-1 ring-gray-100">
                <MapContainer
                    center={center}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    ref={mapRef}
                    zoomControl={false}
                >
                    {/* Low Fidelity Gojek Style Map (CartoDB Positron) */}
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <MapController onPositionChange={(newCenter) => {
                        reverseGeocode(newCenter.lat, newCenter.lng);
                    }} />
                </MapContainer>

                {/* Fixed Center Pin (Gojek Style) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-[1000] pointer-events-none mb-4">
                    <div className="relative flex flex-col items-center">
                        <div className="w-12 h-12 bg-primary rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-bounce-slow">
                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="w-3 h-1 bg-dark/20 rounded-full blur-[2px] mt-1 pulse-shadow" />
                    </div>
                </div>

                {/* Floating Map Help */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-dark/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-2xl pointer-events-none transition-all group-hover:opacity-100">
                    <p className="text-[9px] font-black text-white uppercase tracking-widest text-center whitespace-nowrap">{t('bookPage.map.dragHelp')}</p>
                </div>
            </div>

            {/* Selected Address Display */}
            {address && (
                <div className="p-4 bg-[#FDF8F3] rounded-3xl border border-[#9C6D3F]/10 flex items-start gap-3 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-[#9C6D3F]/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#9C6D3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-[#9C6D3F] uppercase tracking-wider mb-0.5">{t('bookPage.map.selectedLocation')}</p>
                        <p className="text-xs text-dark font-medium leading-relaxed truncate-2-lines">
                            {address}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
