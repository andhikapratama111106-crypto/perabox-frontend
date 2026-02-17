"use client";

import { Reveal } from '@/components/Reveal/Reveal';

const WhyChooseUs = () => {
    const benefits = [
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            title: "QUALIFIED TECHNICIANS",
            description: "Skilled, trained experts delivering reliable service."
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "SAFE & TRUSTED",
            description: "Verified professionals with transparent pricing."
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "BUDGET-FRIENDLY",
            description: "Upfront, fair costs that help you save."
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "ECO-FRIENDLY CHOICE",
            description: "Service reduces waste and supports sustainability."
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <Reveal direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark">Why Choose Us?</h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <Reveal key={index} direction="up" delay={index * 0.12} staggerIndex={index} staggerDelay={80}>
                            <div className="flex flex-col items-center text-center p-6">
                                <div className="mb-6 text-primary p-4 bg-primary/5 rounded-full">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-sm font-bold tracking-wider mb-3 text-dark">{benefit.title}</h3>
                                <p className="text-gray-500 text-sm">{benefit.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
