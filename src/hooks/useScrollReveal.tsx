"use client";

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollRevealOptions = {}
): [RefObject<T>, boolean] {
    const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

// Utility component for wrapping sections
interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
}

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 700,
}: ScrollRevealProps) {
    const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

    const directionStyles: Record<string, string> = {
        up: 'translate-y-8',
        down: '-translate-y-8',
        left: 'translate-x-8',
        right: '-translate-x-8',
        none: '',
    };

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${className} ${isVisible
                ? 'opacity-100 translate-x-0 translate-y-0'
                : `opacity-0 ${directionStyles[direction]}`
                }`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
