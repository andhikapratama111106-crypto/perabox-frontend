"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '@/hooks/useReveal';
import { scaleIn, reducedMotionVariants, defaultTransition } from '@/utils/animationConfig';

/* ───────── Types ───────── */
export interface ServiceCardProps {
    /** Judul layanan */
    title: string;
    /** Deskripsi singkat */
    description: string;
    /** Source gambar */
    imageSrc: string;
    /** Alt text untuk aksesibilitas */
    imageAlt: string;
    /** Icon emoji atau react node */
    icon?: React.ReactNode;
    /** Callback tombol aksi */
    onAction?: () => void;
    /** Label tombol aksi */
    actionLabel?: string;
    /** Extra class */
    className?: string;
    /** Stagger index for group reveals */
    staggerIndex?: number;
}

/* ───────── Component ───────── */
export function ServiceCard({
    title,
    description,
    imageSrc,
    imageAlt,
    icon,
    onAction,
    actionLabel = 'Selengkapnya',
    className = '',
    staggerIndex = 0,
}: ServiceCardProps) {
    const { ref, isVisible, prefersReduced } = useReveal<HTMLDivElement>({
        once: true,
        staggerDelay: 100,
        staggerIndex,
    });

    const variants = prefersReduced ? reducedMotionVariants : scaleIn;

    return (
        <motion.div
            ref={ref}
            className={`card-service group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
        hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2
        focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-2
        transition-all duration-300 ease-out ${className}`}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ ...defaultTransition, delay: staggerIndex * 0.1 }}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {icon && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm text-xl">
                        {icon}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>
                {onAction && (
                    <button
                        onClick={onAction}
                        className="text-sm font-semibold text-primary hover:text-primary/80
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
              rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors"
                        aria-label={`${actionLabel} tentang ${title}`}
                    >
                        {actionLabel} →
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export default ServiceCard;
