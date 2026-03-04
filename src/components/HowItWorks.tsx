"use client";

import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

const steps = [
    {
        number: '01',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
        titleKey: 'howItWorks.step1Title',
        descKey: 'howItWorks.step1Desc',
        fallbackTitle: 'Pilih Layanan',
        fallbackDesc: 'Pilih layanan yang Anda butuhkan, tentukan jadwal yang nyaman untuk Anda.',
    },
    {
        number: '02',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
        titleKey: 'howItWorks.step2Title',
        descKey: 'howItWorks.step2Desc',
        fallbackTitle: 'Teknisi Datang',
        fallbackDesc: 'Teknisi terverifikasi dan bersertifikat tiba tepat waktu di lokasi Anda.',
    },
    {
        number: '03',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
        ),
        titleKey: 'howItWorks.step3Title',
        descKey: 'howItWorks.step3Desc',
        fallbackTitle: 'Selesai & Garansi',
        fallbackDesc: 'Bayar setelah puas dengan hasilnya. Garansi layanan 30 hari.',
    },
];

export default function HowItWorks() {
    const { t } = useLanguage();

    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            {/* Subtle dot pattern background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, #8B5E3C 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <Reveal direction="up">
                    <div className="text-center mb-16">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
                            {t('howItWorks.sectionTitle') || 'Cara Kerja'}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-dark leading-tight">
                            {t('howItWorks.mainHeading') || 'Semudah 1, 2, 3'}
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-xl mx-auto font-body text-lg">
                            {t('howItWorks.description') || 'Pesan layanan dalam hitungan menit, teknisi profesional siap hadir.'}
                        </p>
                    </div>
                </Reveal>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-[2px]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                        />
                    </div>

                    {steps.map((step, index) => (
                        <Reveal key={step.number} direction="up" delay={0.2 * index}>
                            <div className="relative text-center group">
                                {/* Step icon circle */}
                                <motion.div
                                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary border-2 border-primary/10 flex items-center justify-center text-primary relative z-10 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/20"
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {step.icon}
                                </motion.div>

                                {/* Step number badge */}
                                <div className="absolute top-0 right-[calc(50%-52px)] w-7 h-7 rounded-full bg-primary text-white text-xs font-stat font-bold flex items-center justify-center z-20 shadow-md">
                                    {step.number}
                                </div>

                                <h3 className="text-xl font-display font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                                    {t(step.titleKey) || step.fallbackTitle}
                                </h3>
                                <p className="text-gray-500 font-body leading-relaxed max-w-xs mx-auto">
                                    {t(step.descKey) || step.fallbackDesc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
