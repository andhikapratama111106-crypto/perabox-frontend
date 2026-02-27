"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const finishPreloading = useUIStore((state: any) => state.finishPreloading);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        // Sophisticated counter logic
        let start = 0;
        const duration = 2200; // Total duration
        const interval = 20; // Update frequency
        const step = 100 / (duration / interval);

        const counterTimer = setInterval(() => {
            start += step;
            if (start >= 100) {
                setCount(100);
                clearInterval(counterTimer);

                // Slight delay at 100% before exit
                setTimeout(() => {
                    setIsLoading(false);
                    finishPreloading();
                    document.body.style.overflow = "auto";
                }, 400);
            } else {
                setCount(Math.floor(start));
            }
        }, interval);

        return () => {
            clearInterval(counterTimer);
            document.body.style.overflow = "auto";
        };
    }, [finishPreloading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
                    exit={{
                        clipPath: "inset(0 0 100% 0)", // Curtain up reveal
                        transition: { duration: 1, ease: [0.77, 0, 0.175, 1] }
                    }}
                >
                    {/* Ambient Glow */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Logo and Branding */}
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="mb-12"
                        >
                            <Image
                                src="/perabox_icon.png"
                                alt="PERABOX"
                                width={80}
                                height={80}
                                className="object-contain brightness-0 invert opacity-40 "
                                priority
                            />
                        </motion.div>

                        {/* Large Digital Counter */}
                        <div className="relative overflow-hidden h-24 sm:h-32 flex items-center justify-center">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-7xl sm:text-9xl font-extrabold text-white/90 tracking-tighter tabular-nums"
                            >
                                {count.toString().padStart(2, '0')}
                            </motion.span>
                            <span className="text-xl sm:text-2xl font-bold text-primary ml-2 mb-8">%</span>
                        </div>

                        {/* Subtle Tagline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5] }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            className="mt-4 flex flex-col items-center"
                        >
                            <span className="text-[10px] sm:text-xs text-white/30 tracking-[0.5em] uppercase font-bold">
                                Initializing Premium Service
                            </span>

                            {/* Scanning line indicator */}
                            <div className="mt-8 w-40 h-[1px] bg-white/10 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-primary"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: `${count - 100}%` }}
                                    transition={{ type: "tween", ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Background Decorative Text (Ferrari-style watermark) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
                        <span className="text-[20vw] font-black tracking-tighter whitespace-nowrap">
                            PERABOX
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
    );
}
