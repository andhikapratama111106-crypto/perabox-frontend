"use client";

import Image from 'next/image';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <Reveal direction="left" className="w-full md:w-1/2 flex justify-center">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <Image
                                src="/perabox_icon.png"
                                alt="PERABOX Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.2} className="w-full md:w-1/2">
                        <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">{t('about.sectionTitle')}</span>
                        <h2 className="text-3xl font-bold text-dark mb-6">{t('about.mainHeading')}</h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            <span className="font-bold text-primary">PERABOX</span>{t('about.description1')}
                        </p>

                        <p className="text-gray-600 mb-8">
                            {t('about.description2')}
                        </p>

                        <blockquote className="text-xl font-bold italic text-dark border-l-4 border-primary pl-4">
                            &quot;{t('about.slogan')}&quot;
                        </blockquote>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
