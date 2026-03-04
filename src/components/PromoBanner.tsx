"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PromoBanner() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('promo_dismissed');
        if (!dismissed) {
            setIsVisible(true);
            document.body.classList.add('has-promo');
        }
        return () => {
            document.body.classList.remove('has-promo');
        }
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('promo_dismissed', 'true');
        document.body.classList.remove('has-promo');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 right-0 z-[60] h-[44px] bg-gradient-to-r from-primary to-accent text-white text-center py-2.5 px-4 text-sm font-bold shadow-md overflow-hidden"
                >
                    <div className="container mx-auto flex items-center justify-center gap-3">
                        <span className="hidden sm:inline">🎉</span>
                        <span className="font-body">
                            {t('promo.bannerText') || 'Promo Bulan Ini: Cuci AC 2 unit hanya Rp 150.000!'}
                        </span>
                        <Link
                            href="/book"
                            className="bg-white text-primary px-3 py-1 rounded-full text-xs font-extrabold hover:bg-white/90 transition-colors ml-1"
                        >
                            {t('promo.bannerCTA') || 'Pesan Sekarang →'}
                        </Link>
                        <button
                            onClick={dismiss}
                            className="ml-2 text-white/80 hover:text-white transition-colors p-1"
                            aria-label="Dismiss promo"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
