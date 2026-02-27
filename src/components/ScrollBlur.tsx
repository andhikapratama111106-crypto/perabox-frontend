"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ScrollBlur({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Disable on blog articles
    const isBlog = pathname?.startsWith('/blog');

    if (isBlog) {
        return <>{children}</>;
    }

    // Smooth the velocity value to prevent jitter
    const smoothVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform velocity into blur amount (0px to 4px)
    // Only blur when scrolling down (positive velocity).
    const blurAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [0, 0, 4]);

    // Transform velocity into vertical scale (1 to 1.02) - McLaren-style "kinetic stretch"
    const scaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.99, 1, 1.02]);

    // Track if the blur has already been triggered
    const hasTriggered = React.useRef(false);

    useEffect(() => {
        const unsubscribeBlur = blurAmount.on("change", (latest) => {
            if (hasTriggered.current) return;
            document.documentElement.style.setProperty('--scroll-blur', `${latest}px`);

            // Mark as triggered once the blur has been noticeable (>0.5px) and returns to 0
            if (latest > 0.5) {
                // We've started blurring
            } else if (latest === 0 && document.documentElement.style.getPropertyValue('--scroll-blur') !== '0px') {
                // We've finished the first blur event
                // However, for a better "one-time" feel, we might want to wait until the velocity actually peak and drops.
                // Simple logic: once it hits a certain threshold, we mark it.
            }
        });

        const unsubscribeScale = scaleY.on("change", (latest) => {
            if (hasTriggered.current) return;
            document.documentElement.style.setProperty('--scroll-scale-y', `${latest}`);

            // If we've reached a significant velocity and returned to normal, lock it.
            if (parseFloat(latest.toString()) > 1.01) {
                // Effect is active
            } else if (parseFloat(latest.toString()) === 1 && document.documentElement.style.getPropertyValue('--scroll-scale-y') !== '1') {
                // hasTriggered.current = true; // Disabled for now to ensure it feels smooth
            }
        });

        // Better approach for "one-time": clear variables after a short delay once scrolling starts
        const handleFirstScroll = () => {
            if (hasTriggered.current) return;

            // Wait for the animation to likely finish (e.g., 2 seconds after first movement)
            setTimeout(() => {
                hasTriggered.current = true;
                document.documentElement.style.setProperty('--scroll-blur', '0px');
                document.documentElement.style.setProperty('--scroll-scale-y', '1');
            }, 2000);

            window.removeEventListener('scroll', handleFirstScroll);
        };

        window.addEventListener('scroll', handleFirstScroll, { passive: true });

        return () => {
            unsubscribeBlur();
            unsubscribeScale();
            window.removeEventListener('scroll', handleFirstScroll);
        };
    }, [blurAmount, scaleY]);

    return (
        <div
            className="scroll-blur-content"
            style={{
                filter: 'blur(var(--scroll-blur, 0px))',
                transform: 'scaleY(var(--scroll-scale-y, 1))',
                willChange: 'filter, transform',
                transformOrigin: 'center'
            }}
        >
            {children}
        </div>
    );
}
