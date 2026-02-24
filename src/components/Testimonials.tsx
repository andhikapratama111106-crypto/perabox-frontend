"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

interface Testimonial {
    name: string;
    role: string;
    quote: string;
    image: string;
    rating: number;
}

const StarRating = ({ count }: { count: number }) => (
    <div className="flex gap-1">
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const Testimonials = () => {
    const { t } = useLanguage();
    const testimonials: Testimonial[] = [
        {
            name: t('testimonials.t1Name'),
            role: t('testimonials.t1Role'),
            quote: t('testimonials.t1Quote'),
            image: '/testimonial_person.jpg',
            rating: 5,
        },
        {
            name: t('testimonials.t2Name'),
            role: t('testimonials.t2Role'),
            quote: t('testimonials.t2Quote'),
            image: '/testimonial_housewife.png',
            rating: 5,
        },
        {
            name: t('testimonials.t3Name'),
            role: t('testimonials.t3Role'),
            quote: t('testimonials.t3Quote'),
            image: '/testimonial_elderly.png',
            rating: 5,
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        goToSlide((activeIndex + 1) % testimonials.length);
    }, [activeIndex, goToSlide]);

    // Auto-scroll every 5 seconds
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide, isPaused]);

    return (
        <section className="py-20 md:py-28 bg-secondary overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <Reveal direction="up">
                    <div className="text-center mb-14">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
                            {t('testimonials.sectionTitle')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                            {t('testimonials.mainHeading')}
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            {t('testimonials.description')}
                        </p>
                    </div>
                </Reveal>

                {/* Testimonial Cards Carousel */}
                <div
                    className="max-w-[760px] mx-auto relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Cards Container */}
                    <div className="overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((t, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 px-1"
                                >
                                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                            {/* Photo */}
                                            <div className="flex-shrink-0">
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md border-2 border-white ring-2 ring-primary/10">
                                                    <Image
                                                        src={t.image}
                                                        alt={t.name}
                                                        fill
                                                        className="object-cover"
                                                        priority={index === 0}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1 text-center md:text-left">
                                                <StarRating count={t.rating} />
                                                <blockquote className="text-gray-700 leading-relaxed text-lg mt-4 mb-6 relative">
                                                    &ldquo;{t.quote}&rdquo;
                                                </blockquote>
                                                <h3 className="text-xl font-bold text-dark mb-1">
                                                    {t.name}
                                                </h3>
                                                <p className="text-sm text-primary font-semibold">
                                                    {t.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:shadow-xl transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goToSlide((activeIndex + 1) % testimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:shadow-xl transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
