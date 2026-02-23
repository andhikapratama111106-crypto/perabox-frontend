"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────── Types ───────── */
interface NavLink {
    name: string;
    href: string;
}

export interface AnimatedNavbarProps {
    /** Nav links */
    links?: NavLink[];
    /** Scroll threshold to trigger "scrolled" state (px) */
    scrollThreshold?: number;
    /** Logo src (Next Image) */
    logoSrc?: string;
}

/* ───────── Component ───────── */
export function AnimatedNavbar({
    links = [
        { name: 'BERANDA', href: '/' },
        { name: 'TENTANG', href: '/#about' },
        { name: 'LAYANAN', href: '/#services' },
        { name: 'BLOG', href: '/blog' },
    ],
    scrollThreshold = 50,
    logoSrc = '/perabox_icon.png',
}: AnimatedNavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    /* ─── Scroll Detection ─── */
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const onScroll = () => {
            setScrolled(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial check
        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollThreshold]);

    /* ─── Focus Trap when mobile menu open ─── */
    useEffect(() => {
        if (!mobileOpen) return;

        const menu = menuRef.current;
        if (!menu) return;

        const focusable = menu.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
                hamburgerRef.current?.focus();
                return;
            }
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        first?.focus();

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [mobileOpen]);

    /* ─── Close mobile menu on route change or resize ─── */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = useCallback(() => setMobileOpen((prev) => !prev), []);

    /* ─── Menu animation variants ─── */
    const menuVariants = {
        closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-3'
                : 'bg-transparent py-5'
                }`}
            role="navigation"
            aria-label="Navigasi utama"
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="transition-transform hover:scale-105">
                    <Image
                        src={logoSrc}
                        alt="PERABOX Logo"
                        width={160}
                        height={90}
                        className="h-10 w-auto md:h-12 object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold tracking-wide transition-colors
                ${scrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-600 hover:text-primary'}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-lg px-2 py-1`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Hamburger (mobile) */}
                <button
                    ref={hamburgerRef}
                    onClick={toggleMenu}
                    className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                    aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-nav"
                >
                    <span
                        className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-nav"
                        ref={menuRef}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg"
                        role="menu"
                    >
                        <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="py-3 px-4 text-gray-700 font-semibold hover:text-primary hover:bg-primary/5
                    rounded-xl transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    role="menuitem"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default AnimatedNavbar;
