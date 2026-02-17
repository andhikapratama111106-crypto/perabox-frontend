"use client";

import React from 'react';
import { useParallax, type UseParallaxOptions } from '@/hooks/useParallax';

/* ───────── Types ───────── */
export interface ParallaxImageProps extends UseParallaxOptions {
    src: string;
    alt: string;
    className?: string;
    /** Container height class. Default 'h-96' */
    containerClassName?: string;
    /** Lazy loading */
    loading?: 'lazy' | 'eager';
}

/* ───────── Component ───────── */
export function ParallaxImage({
    src,
    alt,
    className = '',
    containerClassName = 'h-96',
    loading = 'lazy',
    multiplier,
    clamp,
    respectReducedMotion,
}: ParallaxImageProps) {
    const { ref, transform } = useParallax<HTMLDivElement>({
        multiplier,
        clamp,
        respectReducedMotion,
    });

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${containerClassName}`}
            aria-hidden="true"
        >
            <img
                src={src}
                alt={alt}
                loading={loading}
                className={`w-full h-[120%] object-cover absolute top-0 left-0 ${className}`}
                style={{
                    transform,
                    willChange: 'transform',
                }}
            />
        </div>
    );
}

export default ParallaxImage;
