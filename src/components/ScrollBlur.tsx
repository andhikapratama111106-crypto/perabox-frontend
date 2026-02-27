"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export default function ScrollBlur({ children }: { children: React.ReactNode }) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

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

    useEffect(() => {
        const unsubscribeBlur = blurAmount.on("change", (latest) => {
            document.documentElement.style.setProperty('--scroll-blur', `${latest}px`);
        });
        const unsubscribeScale = scaleY.on("change", (latest) => {
            document.documentElement.style.setProperty('--scroll-scale-y', `${latest}`);
        });
        return () => {
            unsubscribeBlur();
            unsubscribeScale();
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
