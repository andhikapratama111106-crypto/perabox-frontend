import Image from 'next/image';
import { Reveal } from '@/components/Reveal/Reveal';

const OurCompany = () => {
    return (
        <section id="our-company" className="py-20 md:py-28 bg-secondary">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    {/* PERABOX Logo */}
                    <Reveal direction="none" delay={0.1}>
                        <div className="relative w-[160px] h-auto md:w-[220px] aspect-[4/3] mb-8">
                            <Image
                                src="/perabox_logo.png"
                                alt="PERABOX Company Logo"
                                fill
                                className="object-contain"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/logo.svg";
                                }}
                            />
                        </div>
                    </Reveal>

                    {/* Section Label */}
                    <Reveal direction="up" delay={0.2}>
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">
                            Our Company
                        </span>
                    </Reveal>

                    {/* Tagline */}
                    <Reveal direction="up" delay={0.3}>
                        <p className="text-lg md:text-xl text-dark font-medium max-w-md leading-relaxed">
                            PERABOX – Solusi Perawatan & Perbaikan Rumah Terpercaya
                        </p>
                    </Reveal>

                    {/* Decorative divider */}
                    <Reveal direction="none" delay={0.4}>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-8 h-[2px] bg-accent/40 rounded-full"></div>
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <div className="w-8 h-[2px] bg-accent/40 rounded-full"></div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default OurCompany;
