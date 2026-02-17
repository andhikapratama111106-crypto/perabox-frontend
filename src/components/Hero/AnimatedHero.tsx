"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { BtnPrimary } from '@/components/Button/Button';
import {
    staggerContainer,
    splitLineReveal,
    fadeUp,
    reducedMotionVariants,
} from '@/utils/animationConfig';
import { useReveal } from '@/hooks/useReveal';

/* ───────── Types ───────── */
export interface AnimatedHeroProps {
    /** Headline teks (baris-baris untuk split-line reveal) */
    headlineLines?: string[];
    /** Sub-headline */
    subtitle?: string;
    /** CTA utama */
    ctaLabel?: string;
    ctaOnClick?: () => void;
    /** CTA sekunder */
    secondaryLabel?: string;
    secondaryOnClick?: () => void;
    /** Hero background image URL */
    backgroundImage?: string;
    /** CSS overlay color */
    overlayColor?: string;
}

/* ───────── Component ───────── */
export function AnimatedHero({
    headlineLines = ['Layanan Perawatan', 'Rumah Terpercaya'],
    subtitle = 'Solusi profesional untuk perbaikan dan perawatan AC, elektronik, dan peralatan rumah tangga Anda.',
    ctaLabel = 'Mulai Sekarang',
    ctaOnClick,
    secondaryLabel = 'Pelajari Lebih Lanjut',
    secondaryOnClick,
    backgroundImage = '/hero-bg.jpg',
    overlayColor = 'rgba(251, 246, 239, 0.85)',
}: AnimatedHeroProps) {
    const { ref: heroRef, isVisible, prefersReduced } = useReveal<HTMLDivElement>({
        threshold: 0.1,
        once: true,
    });

    const { ref: parallaxRef, transform: parallaxTransform } =
        useParallax<HTMLDivElement>({
            multiplier: 0.2,
            clamp: [-80, 80],
        });

    const textVariants = prefersReduced ? reducedMotionVariants : splitLineReveal;
    const ctaVariants = prefersReduced ? reducedMotionVariants : fadeUp;

    return (
        <section
            ref={heroRef}
            className="relative min-h-[90vh] flex items-center overflow-hidden"
            aria-label="Hero banner"
        >
            {/* Parallax Background */}
            <div
                ref={parallaxRef}
                className="absolute inset-0 -top-20 -bottom-20"
                style={{ willChange: 'transform' }}
            >
                {/* Fallback for no-JS: plain image visible */}
                <img
                    src={backgroundImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    style={{ transform: parallaxTransform }}
                    loading="eager"
                />
            </div>

            {/* Warm overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: overlayColor }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-20 max-w-3xl">
                {/* Staggered headline */}
                <motion.div
                    variants={staggerContainer(0.12, 0.2)}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                    className="mb-6"
                >
                    {headlineLines.map((line, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.h1
                                variants={textVariants}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight font-[family-name:var(--font-poppins)]"
                            >
                                {line}
                            </motion.h1>
                        </div>
                    ))}
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={ctaVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={ctaVariants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-4"
                >
                    <BtnPrimary size="lg" onClick={ctaOnClick}>
                        {ctaLabel}
                    </BtnPrimary>
                    <BtnPrimary variant="outline" size="lg" onClick={secondaryOnClick}>
                        {secondaryLabel}
                    </BtnPrimary>
                </motion.div>
            </div>
        </section>
    );
}

export default AnimatedHero;
