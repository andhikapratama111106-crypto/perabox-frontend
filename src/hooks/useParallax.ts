"use client";

import { useEffect, useRef, useState, RefObject } from 'react';

/* ───────── Types ───────── */
export interface UseParallaxOptions {
    /** Parallax speed multiplier. 0.5 = half speed, -0.5 = reversed. Default 0.3 */
    multiplier?: number;
    /** Clamp output range [min, max] in px. Prevents excessive offsets. */
    clamp?: [number, number];
    /** Disable on reduced-motion. Default true */
    respectReducedMotion?: boolean;
}

export interface UseParallaxReturn<T extends HTMLElement> {
    ref: RefObject<T>;
    /** Current translateY offset in px */
    offset: number;
    /** CSS transform string ready for style prop */
    transform: string;
}

/* ───────── Hook ───────── */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
    options: UseParallaxOptions = {},
): UseParallaxReturn<T> {
    const { multiplier = 0.3, clamp, respectReducedMotion = true } = options;

    const ref = useRef<T>(null);
    const [offset, setOffset] = useState(0);
    const rafId = useRef<number>(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check reduced motion
        if (respectReducedMotion) {
            const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mql.matches) return;
        }

        const update = () => {
            const el = ref.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const viewportH = window.innerHeight;

            // Only compute when element is near viewport
            if (rect.bottom < -100 || rect.top > viewportH + 100) return;

            // Calculate parallax: center of element relative to center of viewport
            const center = rect.top + rect.height / 2;
            const viewportCenter = viewportH / 2;
            let value = (center - viewportCenter) * multiplier;

            // Clamp
            if (clamp) {
                value = Math.max(clamp[0], Math.min(clamp[1], value));
            }

            setOffset(value);
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(update);
        };

        // Initial calculation
        update();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId.current);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [multiplier, clamp, respectReducedMotion]);

    const transform = `translate3d(0, ${offset}px, 0)`;

    return { ref, offset, transform };
}
