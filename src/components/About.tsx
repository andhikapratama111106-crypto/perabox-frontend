"use client";

import Image from 'next/image';
import { Reveal } from '@/components/Reveal/Reveal';

const About = () => {
    return (
        <section id="about" className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <Reveal direction="left" className="w-full md:w-1/2 flex justify-center">
                        <Image
                            src="/logo_square.png"
                            alt="PERABOX Corporate Logo"
                            width={160}
                            height={160}
                            className="h-16 w-auto mb-10 block grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        />
                    </Reveal>

                    <Reveal direction="right" delay={0.2} className="w-full md:w-1/2">
                        <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">About Us</span>
                        <h2 className="text-3xl font-bold text-dark mb-6">Our Company</h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            <span className="font-bold text-primary">PERABOX</span> is a homecare platform that connects users with trained technicians and furniture rental vendors quickly, safely, and transparently. We&apos;re here to make your life easier.
                        </p>

                        <p className="text-gray-600 mb-8">
                            Our slogan is:
                        </p>

                        <blockquote className="text-xl font-bold italic text-dark border-l-4 border-primary pl-4">
                            &quot;Simple. Smooth. Secure.&quot;
                        </blockquote>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
