"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const finishPreloading = useUIStore((state: any) => state.finishPreloading);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsLoading(false);
            finishPreloading();
            document.body.style.overflow = "auto";
        }, 2200);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [finishPreloading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-secondary overflow-hidden"
                    exit={{
                        clipPath: "inset(0 0 100% 0)", // Curtain up reveal
                        transition: { duration: 1, ease: [0.77, 0, 0.175, 1] }
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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Image
                                src="/perabox_icon.png"
                                alt="PERABOX"
                                width={120}
                                height={120}
                                className="object-contain"
                                priority
                            />
                        </motion.div>
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
    );
}
