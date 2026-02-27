"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        // Wait a bit to show the animation, then hide
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 2200);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Pulsing blurred background circle */}
                    <motion.div
                        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Logo container */}
                    <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                            animate={{
                                scale: [0.5, 1.2, 1],
                                opacity: [0, 1, 1],
                                rotate: [-5, 5, 0]
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 1, 0.5, 1], // Custom spring-like easing
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.2 // Start pulsing after the initial zoom
                                }}
                            >
                                <Image
                                    src="/perabox_icon.png"
                                    alt="PERABOX Preloader"
                                    width={140}
                                    height={140}
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Loading Text and dots */}
                    <motion.div
                        className="mt-8 flex items-center gap-1 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <span className="text-primary font-bold tracking-widest text-sm uppercase">
                            MENYIAPKAN
                        </span>
                        <div className="flex gap-1 ml-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                    animate={{
                                        y: ["0%", "-50%", "0%"],
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Progress Bar Line */}
                    <motion.div
                        className="absolute bottom-20 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "circOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
