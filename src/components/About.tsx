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
                        <div className="relative flex items-center justify-center w-72 md:w-96">
                            <Image
                                src="/perabox_icon.png"
                                alt="PERABOX Icon"
                                width={600}
                                height={338}
                                className="object-contain w-full h-auto shadow-sm"
                            />
                        </div>
                    </Reveal>

                    <Reveal direction="right" delay={0.2} className="w-full md:w-1/2">
                        <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">{t('aboutSection.sectionTitle')}</span>
                        <h2 className="text-3xl font-bold text-dark mb-6">{t('aboutSection.mainHeading')}</h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            <span className="font-bold text-primary">PERABOX</span>{t('aboutSection.description1')}
                        </p>

                        <p className="text-gray-600 mb-8">
                            {t('aboutSection.description2')}
                        </p>

                        <blockquote className="text-xl font-bold italic text-dark border-l-4 border-primary pl-4">
                            &quot;{t('aboutSection.slogan')}&quot;
                        </blockquote>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
