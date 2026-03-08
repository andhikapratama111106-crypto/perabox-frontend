"use client";

import React, { useEffect } from "react";
import { useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ScrollBlur({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Disable on blog articles
    const isBlog = pathname?.startsWith('/blog');

    // ALL hooks must be called unconditionally (Rules of Hooks)
    const smoothVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const blurAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [0, 0, 2.5]); // Reduced max blur from 4 to 2.5
    const scaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.995, 1, 1.005]); // Subtle scaling
    const hasTriggered = React.useRef(false);

    useEffect(() => {
        if (isBlog) return;

        const unsubscribeBlur = blurAmount.on("change", (latest) => {
            if (hasTriggered.current) return;
            // Only apply blur if it's significant enough to be seen (performance win)
            const value = latest < 0.2 ? 0 : latest;
            document.documentElement.style.setProperty('--scroll-blur', `${value}px`);
        });

        const unsubscribeScale = scaleY.on("change", (latest) => {
            if (hasTriggered.current) return;
            document.documentElement.style.setProperty('--scroll-scale-y', `${latest}`);
        });

        // Cleanup values after scroll stops to ensure crisp text
        let timeout: NodeJS.Timeout;
        const handleScrollStop = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!hasTriggered.current) {
                    document.documentElement.style.setProperty('--scroll-blur', '0px');
                    document.documentElement.style.setProperty('--scroll-scale-y', '1');
                }
            }, 150);
        };

        window.addEventListener('scroll', handleScrollStop, { passive: true });

        return () => {
            unsubscribeBlur();
            unsubscribeScale();
            window.removeEventListener('scroll', handleScrollStop);
            clearTimeout(timeout);
        };
    }, [blurAmount, scaleY, isBlog]);

    if (isBlog) {
        return <>{children}</>;
    }

    return (
        <div
            className="scroll-blur-content"
            style={{
                filter: 'blur(var(--scroll-blur, 0px))',
                transform: 'scaleY(var(--scroll-scale-y, 1))',
                willChange: 'transform', // Removed 'filter' from will-change as it can be counter-productive on some GPUs
                transformOrigin: 'center'
            }}
        >
            {children}
        </div>
    );
}
