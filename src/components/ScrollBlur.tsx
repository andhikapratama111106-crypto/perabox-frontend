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
    // Most users scroll between 0 and 2000px/s. Bugatti effect is subtle.
    const blurAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [4, 0, 4]);

    useEffect(() => {
        const unsubscribe = blurAmount.on("change", (latest) => {
            // Update CSS variable on document root for high performance
            document.documentElement.style.setProperty('--scroll-blur', `${latest}px`);
        });
        return () => unsubscribe();
    }, [blurAmount]);

    return (
        <div className="scroll-blur-content" style={{ filter: 'blur(var(--scroll-blur, 0px))', willChange: 'filter' }}>
            {children}
        </div>
    );
}
