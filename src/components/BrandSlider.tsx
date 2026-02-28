"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

interface BrandLogo {
    name: string;
    color: string;
    logoFile: string;
    scale?: number;
}

const brands: BrandLogo[] = [
    { name: 'Mitsubishi Electric', color: '#CC0000', logoFile: 'mitsubishi_upload.jpg', scale: 2.0 },
    { name: 'GREE', color: '#004B87', logoFile: 'gree_upload.png', scale: 2.0 },
    { name: 'LG', color: '#A50034', logoFile: 'lg_upload.jpg', scale: 1.8 },
    { name: 'Samsung', color: '#1428A0', logoFile: 'samsung_upload.jpg' },
    { name: 'Toshiba', color: '#FF0000', logoFile: 'toshiba_upload.jpg' },
    { name: 'Panasonic', color: '#004198', logoFile: 'panasonic_upload.jpg', scale: 1.8 },
    { name: 'Sharp', color: '#E60012', logoFile: 'sharp_upload.jpg', scale: 1.8 },
    { name: 'Midea', color: '#0099DA', logoFile: 'midea_upload.jpg' },
    { name: 'Daikin', color: '#0097E0', logoFile: 'daikin_upload.jpg' },
];

export default function BrandSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const { t } = useLanguage();

    // Triple duplication for smoother infinite loop
    const tripleBrands = [...brands, ...brands, ...brands];

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
    }, []);

    const handleTouchStart = () => setIsPaused(true);
    const handleTouchMove = () => setIsPaused(true);
    const handleTouchEnd = () => setIsPaused(false);

    return (
        <section className="py-20 bg-white/50 overflow-hidden">
            <Reveal direction="up">
                <div className="container mx-auto px-6 mb-12 text-center">
                    <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-4">{t('brandSlider.sectionTitle')}</h2>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                        {t('brandSlider.mainHeading')}
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        {t('brandSlider.description')}
                    </p>
                </div>
            </Reveal>

            <div
                className="relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    ref={sliderRef}
                    className={`marquee-container ${isPaused ? 'paused' : ''}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="marquee-track">
                        {tripleBrands.map((brand, index) => (
                            <div key={`${brand.name}-${index}`} className="flex-shrink-0">
                                <div
                                    className="flex items-center justify-center px-10 py-6 bg-white/60 backdrop-blur-sm border border-black/[0.04] shadow-sm rounded-3xl transition-all duration-700 ease-out hover:bg-white hover:shadow-xl hover:-translate-y-1"
                                    style={{
                                        minWidth: '260px',
                                        height: '140px',
                                    }}
                                    title={brand.name}
                                >
                                    <img
                                        src={`/brands/${brand.logoFile}`}
                                        alt={brand.name}
                                        className="w-auto object-contain opacity-75 hover:opacity-100 transition-opacity duration-700"
                                        style={{
                                            height: '70px',
                                            maxWidth: '220px',
                                            transform: brand.scale ? `scale(${brand.scale})` : 'none',
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const parent = e.currentTarget.parentElement;
                                            if (parent) {
                                                parent.innerText = brand.name;
                                                parent.style.color = brand.color;
                                                parent.style.fontWeight = 'bold';
                                                parent.style.fontSize = '1.25rem';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient Fades for smoother edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
            </div>

            <style jsx>{`
                .marquee-container {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    position: relative;
                    padding: 20px 0;
                }
                
                .marquee-track {
                    display: inline-flex;
                    gap: 60px;
                    animation: marquee 80s linear infinite;
                    will-change: transform;
                }

                .marquee-container.paused .marquee-track {
                    animation-play-state: paused;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-33.33% - 20px)); }
                }

                /* Mobile Optimization */
                @media (max-width: 768px) {
                    .marquee-track {
                        gap: 32px;
                        animation-duration: 30s;
                    }
                }
            `}</style>
        </section>
    );
}
