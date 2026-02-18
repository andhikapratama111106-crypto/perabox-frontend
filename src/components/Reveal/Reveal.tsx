"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReveal, type UseRevealOptions } from '@/hooks/useReveal';
import {
    fadeUp,
    fadeDown,
    fadeLeft,
    fadeRight,
    fade,
    reducedMotionVariants,
    defaultTransition,
} from '@/utils/animationConfig';

/* ───────── Types ───────── */
export interface RevealProps extends UseRevealOptions {
    children: React.ReactNode;
    className?: string;
    /** Animation direction. Default 'up' */
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    /** Extra delay in seconds (added on top of stagger). Default 0 */
    delay?: number;
    /** Duration override in seconds */
    duration?: number;
    /** Custom Framer Motion variants (overrides direction) */
    variants?: Variants;
    /** HTML tag for the wrapper. Default 'div' */
    as?: keyof React.JSX.IntrinsicElements;
    /** Disable all animation via data attribute */
    'data-no-animations'?: boolean;
}

/* ───────── Direction → Variant map ───────── */
const directionVariants: Record<string, Variants> = {
    up: fadeUp,
    down: fadeDown,
    left: fadeLeft,
    right: fadeRight,
    none: fade,
};

/* ───────── Component ───────── */
export function Reveal({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration: durationOverride,
    variants: customVariants,
    as = 'div',
    'data-no-animations': noAnimations,
    // useReveal options
    threshold,
    rootMargin,
    once = true,
    mirror,
    staggerDelay,
    staggerIndex,
    reduceMotion,
    ...rest
}: RevealProps) {
    const { ref, isVisible, prefersReduced, computedDelay } = useReveal<HTMLDivElement>({
        threshold,
        rootMargin,
        once,
        mirror,
        staggerDelay,
        staggerIndex,
        reduceMotion,
    });

    // Determine which variants to use
    const shouldSkipAnimation = noAnimations || prefersReduced;
    const activeVariants = shouldSkipAnimation
        ? reducedMotionVariants
        : customVariants || directionVariants[direction] || fadeUp;

    const totalDelay = delay + computedDelay / 1000; // convert ms → sec

    // Build motion component
    const MotionComp = motion[as as keyof typeof motion] as typeof motion.div;

    return (
        <MotionComp
            ref={ref}
            className={`reveal ${className}`}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={activeVariants}
            transition={{
                ...defaultTransition,
                delay: totalDelay,
                ...(durationOverride ? { duration: durationOverride } : {}),
            }}
            {...rest}
        >
            {children}
        </MotionComp>
    );
}

export default Reveal;
