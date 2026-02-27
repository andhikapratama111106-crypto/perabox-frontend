"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";

export default function Preloader() {
    const isFinishedPreloading = useUIStore((state: any) => state.isFinishedPreloading);
    const finishPreloading = useUIStore((state: any) => state.finishPreloading);
    const [isLoading, setIsLoading] = useState(!isFinishedPreloading);

    useEffect(() => {
        if (!isFinishedPreloading) {
            setIsLoading(true);
            // Prevent scrolling while loading
            document.body.style.overflow = "hidden";

            const timer = setTimeout(() => {
                setIsLoading(false);
                finishPreloading();
                document.body.style.overflow = "auto";
            }, 1600); // Reveal faster per user request

            return () => {
                clearTimeout(timer);
                document.body.style.overflow = "auto";
            };
        }
    }, [isFinishedPreloading, finishPreloading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-secondary overflow-hidden"
                    exit={{
                        clipPath: "inset(0 0 100% 0)", // Curtain up reveal
                        transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } // Faster transition
                    }}
                >
                    {/* Ambient Glow */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
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

                    {/* Logo Branding */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="opacity-100">
                            <Image
                                src="/perabox_icon.png"
                                alt="PERABOX"
                                width={120}
                                height={120}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Background Decorative Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                        <span className="text-[20vw] font-black tracking-tighter whitespace-nowrap text-primary">
                            PERABOX
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
