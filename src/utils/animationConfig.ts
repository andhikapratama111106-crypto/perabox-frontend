import type { Variants, Transition } from 'framer-motion';

/* ═══════════════════════════════════════════════
   PERABOX Animation Config
   Shared Framer Motion variants & timing tokens
   ═══════════════════════════════════════════════ */

/* ───────── Easing Tokens ───────── */
export const easing = {
    smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
    easeInOut: [0.42, 0, 0.58, 1] as [number, number, number, number],
    spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
    bounce: { type: 'spring' as const, stiffness: 400, damping: 10 },
};

/* ───────── Duration Tokens ───────── */
export const duration = {
    fast: 0.2,
    normal: 0.5,
    slow: 0.8,
    reveal: 0.7,
};

/* ───────── Shared Transition ───────── */
export const defaultTransition: Transition = {
    duration: duration.reveal,
    ease: easing.smooth,
};

/* ───────── Framer Motion Variants ───────── */

/** Fade up from 24px below */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: defaultTransition,
    },
};

/** Fade down from 24px above */
export const fadeDown: Variants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: defaultTransition,
    },
};

/** Fade in from left */
export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: defaultTransition },
};

/** Fade in from right */
export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: defaultTransition },
};

/** Scale in from 0.9 */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { ...defaultTransition, duration: duration.normal },
    },
};

/** Simple fade (no movement — reduced-motion safe) */
export const fade: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal } },
};

/* ───────── Stagger Container ───────── */
export const staggerContainer = (
    staggerDelay = 0.1,
    delayChildren = 0.15,
): Variants => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: staggerDelay,
            delayChildren,
        },
    },
});

/** Split-text line reveal (for hero headings) */
export const splitLineReveal: Variants = {
    hidden: { opacity: 0, y: '100%' },
    visible: {
        opacity: 1,
        y: '0%',
        transition: {
            duration: 0.6,
            ease: easing.easeOut,
        },
    },
};

/* ───────── Reduced-motion variants ───────── */
export const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
};
