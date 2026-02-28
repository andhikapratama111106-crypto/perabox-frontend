"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-20 bg-secondary">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left: Interactive Icon/Logo */}
                    <Reveal direction="left" className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src="/perabot_mascot.png"
                                    alt="Perabox Logo"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </Reveal>

                    {/* Right: Content */}
                    <Reveal direction="right" delay={0.2} className="w-full lg:w-1/2">
                        <div className="text-left">
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">About Us</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-8 leading-[1.1] tracking-tighter">
                                {t('aboutSection.mainHeading')}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                                {t('aboutSection.description')}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-2">
                                    <h4 className="text-dark font-bold text-lg">{t('aboutSection.qualityTitle')}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{t('aboutSection.qualityDesc')}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-dark font-bold text-lg">{t('aboutSection.expertTitle')}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{t('aboutSection.expertDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
