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

    const blurAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [0, 0, 4]);
    const scaleY = useTransform(smoothVelocity, [-2000, 0, 2000], [0.99, 1, 1.02]);
    const hasTriggered = React.useRef(false);

    useEffect(() => {
        // Skip effect logic on blog pages
        if (isBlog) return;

        const unsubscribeBlur = blurAmount.on("change", (latest) => {
            if (hasTriggered.current) return;
            document.documentElement.style.setProperty('--scroll-blur', `${latest}px`);
        });

        const unsubscribeScale = scaleY.on("change", (latest) => {
            if (hasTriggered.current) return;
            document.documentElement.style.setProperty('--scroll-scale-y', `${latest}`);
        });

        const handleFirstScroll = () => {
            if (hasTriggered.current) return;
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
    }, [blurAmount, scaleY, isBlog]);

    // On blog pages, render children without scroll effects
    if (isBlog) {
        return <>{children}</>;
    }

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
