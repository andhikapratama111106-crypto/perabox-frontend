"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';

const Features = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const features = [
        {
            title: "Professional Service",
            description: "Experienced and certified technicians for all your home needs.",
            detail: "All PERABOX technicians go through a rigorous selection and training process. They are certified, background-checked, and equipped with professional tools. You can trust that every job will be done right the first time — from AC maintenance to full home repairs. We maintain a quality rating system so only the best technicians serve you.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: "bg-blue-500",
            highlights: ["Certified technicians", "Background-checked", "Quality rating system", "Professional tools"]
        },
        {
            title: "Fair Pricing",
            description: "Transparent costs with no hidden fees. Quality work at great value.",
            detail: "We believe in complete price transparency. Before any work begins, you'll receive a detailed cost breakdown — no surprises, no hidden charges. Our pricing is competitive and benchmarked against market rates to ensure you always get the best value. Plus, we offer a satisfaction guarantee on every service.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-green-500",
            highlights: ["Upfront cost breakdown", "No hidden fees", "Market-competitive rates", "Satisfaction guarantee"]
        },
        {
            title: "24/7 Support",
            description: "Always here to help you solve your home maintenance problems.",
            detail: "Home emergencies don't follow a schedule — and neither do we. Our support team is available around the clock, every day of the year. Whether it's a midnight AC breakdown or a weekend plumbing issue, just reach out via WhatsApp, phone, or the app and we'll dispatch a technician to you as soon as possible.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-purple-500",
            highlights: ["Available 365 days", "WhatsApp, phone & app", "Emergency dispatch", "Fast response times"]
        }
    ];

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <Reveal direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Features</h2>
                        <p className="text-4xl md:text-5xl font-extrabold text-dark mb-6 leading-tight">
                            Everything You Need for a <br />
                            <span className="text-primary italic">Better Home</span>
                        </p>
                        <p className="text-lg text-gray-500">
                            We combine technology and human expertise to give you the best homecare experience you&apos;ve ever had.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <Reveal key={index} direction="up" delay={index * 0.15} staggerIndex={index} staggerDelay={100}>
                            <div
                                onClick={() => toggleExpand(index)}
                                className={`group p-10 rounded-[2.5rem] bg-secondary border cursor-pointer transition-all duration-500 ${expandedIndex === index
                                    ? 'border-primary/30 bg-white shadow-2xl shadow-primary/10 ring-1 ring-primary/20'
                                    : 'border-transparent hover:border-accent/20 hover:bg-white hover:shadow-2xl hover:shadow-accent/10'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-16 h-16 ${feature.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        {feature.icon}
                                    </div>
                                    {/* Expand/collapse indicator */}
                                    <motion.div
                                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mt-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-dark mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Expandable detail section */}
                                <AnimatePresence initial={false}>
                                    {expandedIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                                                    {feature.detail}
                                                </p>
                                                <ul className="space-y-2">
                                                    {feature.highlights.map((item, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.15 + i * 0.07, duration: 0.3 }}
                                                            className="flex items-center gap-2 text-sm text-gray-700"
                                                        >
                                                            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            {item}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* "Learn more" hint when collapsed */}
                                {expandedIndex !== index && (
                                    <div className="mt-8 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Learn more
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
