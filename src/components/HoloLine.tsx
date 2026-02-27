"use client";

import { motion } from "framer-motion";

interface HoloLineProps {
    className?: string;
    color?: string;
    vertical?: boolean;
}

export default function HoloLine({ className = "", color = "var(--primary)", vertical = false }: HoloLineProps) {
    return (
        <div className={`relative overflow-hidden pointer-events-none ${className} ${vertical ? 'w-[1px] h-full' : 'h-[1px] w-full'} bg-primary/10`}>
            <motion.div
                className={`absolute ${vertical ? 'w-full h-20' : 'h-full w-20'}`}
                style={{
                    background: vertical
                        ? `linear-gradient(to bottom, transparent, ${color}, transparent)`
                        : `linear-gradient(to right, transparent, ${color}, transparent)`,
                    boxShadow: vertical
                        ? `0 0 15px ${color}`
                        : `0 0 15px ${color}`
                }}
                animate={vertical ? {
                    top: ["-100%", "200%"]
                } : {
                    left: ["-100%", "200%"]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 1]
                }}
            />
        </div>
    );
}
