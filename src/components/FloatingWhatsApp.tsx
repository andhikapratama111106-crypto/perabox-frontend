"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6287774266360';
    const waLink = `https://wa.me/${waNumber}?text=Halo+PERABOX,+saya+ingin+memesan+layanan`;

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 800);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {mounted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    // Stacked: ChatBot is at bottom-4, BackToTop is at bottom-40, WA sits between at bottom-[5.5rem]
                    className="fixed bottom-[5.5rem] right-4 md:bottom-[6.5rem] md:right-10 z-[9997]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Hover tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                                className="absolute right-16 md:right-[4.5rem] top-1/2 -translate-y-1/2 bg-white text-dark text-sm font-bold px-4 py-2 rounded-xl shadow-lg whitespace-nowrap"
                            >
                                Chat dengan Kami
                                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* WhatsApp Button */}
                    <motion.a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
                        aria-label="Chat via WhatsApp"
                    >
                        <svg className="w-7 h-7 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </motion.a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
