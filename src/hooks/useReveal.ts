"use client";

import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

/* ───────── Types ───────── */
export interface UseRevealOptions {
    /** IntersectionObserver threshold (0–1). Default 0.15 */
    threshold?: number;
    /** IntersectionObserver rootMargin. Default '0px 0px -60px 0px' */
    rootMargin?: string;
    /** Fire only once then unobserve. Default true */
    once?: boolean;
    /** Allow element to re-hide when out of view (opposite of once). */
    mirror?: boolean;
    /** Index-based stagger delay in ms. 0 = no stagger. */
    staggerDelay?: number;
    /** Stagger index (order within a group). Default 0 */
    staggerIndex?: number;
    /** Auto-detect prefers-reduced-motion? Default true */
    reduceMotion?: boolean;
}

export interface UseRevealReturn<T extends HTMLElement> {
    ref: RefObject<T>;
    isVisible: boolean;
    prefersReduced: boolean;
    /** Computed delay in ms (staggerIndex × staggerDelay) */
    computedDelay: number;
}

/* ───────── Hook ───────── */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
    options: UseRevealOptions = {},
): UseRevealReturn<T> {
    const {
        threshold = 0.15,
        rootMargin = '0px 0px -60px 0px',
        once = true,
        mirror = false,
        staggerDelay = 0,
        staggerIndex = 0,
        reduceMotion = true,
    } = options;

    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [prefersReduced, setPrefersReduced] = useState(false);

    // Detect prefers-reduced-motion
    useEffect(() => {
        if (!reduceMotion) return;
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mql.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [reduceMotion]);

    // IntersectionObserver
    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (once) observer.unobserve(entry.target);
            } else if (mirror) {
                setIsVisible(false);
            }
        },
        [once, mirror],
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If reduced-motion, show immediately
        if (prefersReduced) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(handleIntersect, {
            threshold,
            rootMargin,
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, handleIntersect, prefersReduced]);

    const computedDelay = staggerIndex * staggerDelay;

    return { ref, isVisible, prefersReduced, computedDelay };
}
