"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { customSmoothScroll } from '@/utils/scrollUtils';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* ─── Focus Trap when mobile menu open ─── */
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const menu = menuRef.current;
        if (!menu) return;

        const focusable = menu.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
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
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        router.push('/login');
    };


    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Features', href: '#features' },
        { name: 'About', href: '#about' },
    ];

    const menuVariants = {
        closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-3'
                : 'bg-transparent py-5'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="transition-transform group-hover:scale-105">
                        <Image
                            src="/perabox_icon.png"
                            alt="PERABOX Logo"
                            width={160}
                            height={90}
                            className="h-10 w-auto md:h-12 object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-bold text-sm">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            role="menuitem"
                            onClick={(e) => {
                                e.preventDefault();
                                if (pathname === '/') {
                                    customSmoothScroll(link.href);
                                } else {
                                    router.push(`/${link.href}`);
                                }
                            }}
                            className={`transition-colors hover:text-primary tracking-wide cursor-pointer ${isScrolled ? 'text-gray-700' : 'text-gray-800'
                                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1`}
                        >
                            {link.name.toUpperCase()}
                        </a>
                    ))}

                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <Link
                                href="/customer/profile"
                                className="text-gray-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1"
                            >
                                PROFILE
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 rounded-lg px-2 py-1"
                            >
                                LOGOUT
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    ref={hamburgerRef}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                    aria-haspopup="true"
                    aria-controls="mobile-nav"
                >
                    <span
                        className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-nav"
                        ref={menuRef}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden absolute w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
                        role="menu"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-2 font-bold">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        if (pathname === '/') {
                                            customSmoothScroll(link.href);
                                        } else {
                                            router.push(`/${link.href}`);
                                        }
                                    }}
                                    className="text-gray-700 hover:text-primary py-3 px-4 hover:bg-primary/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer"
                                    role="menuitem"
                                >
                                    {link.name.toUpperCase()}
                                </a>
                            ))}
                            <div className="h-px bg-gray-100 my-2 mx-4" />
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/customer/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-gray-700 hover:text-primary py-3 px-4 hover:bg-primary/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                        role="menuitem"
                                    >
                                        PROFILE
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-red-500 hover:text-red-600 py-3 px-4 hover:bg-red-50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                                        role="menuitem"
                                    >
                                        LOGOUT
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-primary text-white px-6 py-4 rounded-2xl text-center shadow-lg shadow-primary/20 mt-2 active:scale-[0.98] transition-all"
                                    role="menuitem"
                                >
                                    LOGIN
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
