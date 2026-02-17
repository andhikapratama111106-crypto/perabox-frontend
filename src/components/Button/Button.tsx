"use client";

import React, { useCallback, useRef, useEffect, useState } from 'react';

/* ───────── Types ───────── */
export interface BtnPrimaryProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    /** Toggle state for aria-pressed */
    pressed?: boolean;
    /** Variant style */
    variant?: 'primary' | 'outline' | 'ghost';
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Full width? */
    fullWidth?: boolean;
}

/* ───────── Component ───────── */
export function BtnPrimary({
    children,
    pressed,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    onClick,
    disabled,
    ...rest
}: BtnPrimaryProps) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [prefersReduced, setPrefersReduced] = useState(false);

    // Detect reduced-motion
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mql.matches);
        const h = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mql.addEventListener('change', h);
        return () => mql.removeEventListener('change', h);
    }, []);

    // ─── Ripple Effect ───
    const createRipple = useCallback(
        (x: number, y: number) => {
            if (prefersReduced || disabled) return;
            const btn = btnRef.current;
            if (!btn) return;

            const circle = document.createElement('span');
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;

            const rect = btn.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${x - rect.left - radius}px`;
            circle.style.top = `${y - rect.top - radius}px`;
            circle.className = 'ripple-effect';
            circle.setAttribute('aria-hidden', 'true');

            // Remove previous ripple
            const existingRipple = btn.querySelector('.ripple-effect');
            if (existingRipple) existingRipple.remove();

            btn.appendChild(circle);

            // Clean up after animation
            circle.addEventListener('animationend', () => circle.remove());
        },
        [prefersReduced, disabled],
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        createRipple(e.clientX, e.clientY);
        onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const btn = btnRef.current;
            if (btn) {
                const rect = btn.getBoundingClientRect();
                createRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
    };

    /* ─── Styles ─── */
    const base =
        'relative overflow-hidden rounded-xl font-semibold tracking-wide ' +
        'transition-all duration-200 ease-out select-none ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ' +
        'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ';

    const variants: Record<string, string> = {
        primary:
            'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20',
        outline:
            'border-2 border-primary text-primary hover:bg-primary/5',
        ghost: 'text-primary hover:bg-primary/5',
    };

    const sizes: Record<string, string> = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            ref={btnRef}
            className={`btn-primary ${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            disabled={disabled}
            aria-pressed={pressed}
            {...rest}
        >
            {children}
        </button>
    );
}

export default BtnPrimary;
