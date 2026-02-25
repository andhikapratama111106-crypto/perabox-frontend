"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';
import { customSmoothScroll } from '@/utils/scrollUtils';
import { useReveal } from '@/hooks/useReveal';
import { useParallax } from '@/hooks/useParallax';
import { staggerContainer, splitLineReveal, fadeUp, reducedMotionVariants } from '@/utils/animationConfig';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
    const { ref: heroRef, isVisible, prefersReduced } = useReveal<HTMLElement>({
        threshold: 0.1,
        once: true,
    });

    const { ref: parallaxRef, transform: parallaxTransform } = useParallax<HTMLDivElement>({
        multiplier: 0.15,
        clamp: [-60, 60],
    });

    const { t } = useLanguage();

    const textVariants = prefersReduced ? reducedMotionVariants : splitLineReveal;
    const ctaVariants = prefersReduced ? reducedMotionVariants : fadeUp;

    const headlineLines = [t('hero.headlineLine1'), t('hero.headlineLine2')];

    return (
        <section id="home" ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Parallax ambient blobs */}
            <div ref={parallaxRef} className="absolute inset-0 -z-10" style={{ willChange: 'transform' }}>
                <div className="absolute top-0 left-0 w-full h-full bg-secondary" style={{ transform: parallaxTransform }}></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]" style={{ transform: parallaxTransform }}></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px]" style={{ transform: parallaxTransform }}></div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                    {/* Badge */}
                    <Reveal direction="down" delay={0.1}>
                        <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent font-bold rounded-full text-xs tracking-wider uppercase mb-6">
                            {t('hero.badge')}
                        </span>
                    </Reveal>

                    {/* Split-line headline */}
                    <motion.div
                        variants={staggerContainer(0.12, 0.25)}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                        className="mb-8"
                    >
                        {headlineLines.map((line, i) => (
                            <div key={i} className="overflow-hidden">
                                <motion.h1
                                    variants={textVariants}
                                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-dark leading-[1.1]"
                                >
                                    {i === 1 ? (
                                        <span className="text-primary italic">{line}</span>
                                    ) : (
                                        line
                                    )}
                                </motion.h1>
                            </div>
                        ))}
                    </motion.div>

                    {/* Subtitle */}
                    <Reveal direction="up" delay={0.5}>
                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                    </Reveal>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={ctaVariants}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                    >
                        <Link href="/book" className="group relative bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2">
                            {t('hero.letsStart')}
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <button
                            onClick={() => customSmoothScroll('#services')}
                            className="px-10 py-4 border-2 border-primary/20 text-dark font-bold hover:bg-primary/5 hover:border-primary/40 rounded-full transition-all flex items-center gap-2 group active:scale-95"
                        >
                            {t('hero.exploreServices')}
                            <span className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform"></span>
                        </button>
                    </motion.div>

                    {/* Social proof */}
                    <Reveal direction="up" delay={0.9}>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <span className="block font-bold text-dark">{t('hero.socialProof')}</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                        ))}
                                    </div>
                                    <span className="font-bold text-dark text-xs">4.7</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Hero Image */}
                <Reveal direction="right" delay={0.3} className="relative hidden lg:block">
                    <div className="relative z-10 w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl rotate-2 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/family_photo.jpg"
                                alt="PERABOX Family Service"
                                fill
                                className="object-cover object-[40%_35%] scale-[1.35]"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=1200";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>
                        </div>
                        {/* Floating Info Card – breathe animation for real-time feel */}
                        <motion.div
                            className="absolute bottom-4 -left-8 z-30 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: [1, 1.03, 1],
                                boxShadow: [
                                    '0 25px 50px -12px rgba(0,0,0,0.15)',
                                    '0 25px 60px -8px rgba(0,0,0,0.22)',
                                    '0 25px 50px -12px rgba(0,0,0,0.15)',
                                ],
                            }}
                            transition={{
                                opacity: { delay: 1.0, duration: 0.5 },
                                y: { delay: 1.0, duration: 0.5 },
                                scale: { delay: 1.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                boxShadow: { delay: 1.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        >
                            <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('hero.techStatus')}</p>
                                <div className="flex items-center gap-2">
                                    {/* Pulsing live dot */}
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    <p className="text-dark font-bold">{t('hero.availableNow')}</p>
                                </div>
                            </div>
                        </motion.div>
                </Reveal>
            </div>
        </section>
    );
};

export default Hero;
