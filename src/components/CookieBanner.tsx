"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieBanner() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        setIsVisible(false);
        localStorage.setItem('cookie_consent', 'accepted');
    };

    const decline = () => {
        setIsVisible(false);
        localStorage.setItem('cookie_consent', 'declined');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-[9997] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-4 md:p-4"
                >
                    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl">
                        <p className="text-sm text-gray-600 font-body text-center sm:text-left">
                            {t('cookie.message') || 'Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookie kami.'}
                        </p>
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={decline}
                                className="text-sm text-gray-500 hover:text-dark font-medium transition-colors px-4 py-2"
                            >
                                {t('cookie.decline') || 'Tolak'}
                            </button>
                            <button
                                onClick={accept}
                                className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                {t('cookie.accept') || 'Terima'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
