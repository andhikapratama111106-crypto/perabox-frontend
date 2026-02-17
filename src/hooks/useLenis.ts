"use client";

import { useEffect, useRef } from 'react';

/**
 * Optional Lenis smooth-scroll wrapper.
 * SSR-safe — only initializes in browser.
 * Bundle impact: ~3KB gzipped.
 *
 * Usage:
 *   useLenis({ enabled: true, duration: 1.2 });
 *
 * Alternative (zero JS): add `html { scroll-behavior: smooth }` in CSS.
 */
export interface UseLenisOptions {
    /** Enable smooth scroll. Default true */
    enabled?: boolean;
    /** Scroll duration in seconds. Default 1.2 */
    duration?: number;
    /** Easing function. Default ease-out quad */
    easing?: (t: number) => number;
    /** Orientation. Default 'vertical' */
    orientation?: 'vertical' | 'horizontal';
}

export function useLenis(options: UseLenisOptions = {}) {
    const {
        enabled = true,
        duration = 1.2,
        easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation = 'vertical',
    } = options;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !enabled) return;

        let raf: number;

        const init = async () => {
            try {
                const Lenis = (await import('@studio-freight/lenis')).default;
                const lenis = new Lenis({
                    duration,
                    easing,
                    orientation,
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                });

                lenisRef.current = lenis;

                const animate = (time: number) => {
                    lenis.raf(time);
                    raf = requestAnimationFrame(animate);
                };
                raf = requestAnimationFrame(animate);
            } catch (e) {
                console.warn('[useLenis] Lenis not available, falling back to native scroll', e);
            }
        };

        init();

        return () => {
            cancelAnimationFrame(raf);
            lenisRef.current?.destroy();
        };
    }, [enabled, duration, easing, orientation]);

    return lenisRef;
}
