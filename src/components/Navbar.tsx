"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { customSmoothScroll } from '@/utils/scrollUtils';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { useUIStore } from '@/store/uiStore';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useLanguage();
    const { resetPreloading } = useUIStore();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const isBlogPage = pathname?.startsWith('/blog');

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('access_token');
            setIsLoggedIn(!!token);

            if (token) {
                const savedGoogleUser = localStorage.getItem('google_user');
                if (savedGoogleUser) {
                    try {
                        const googleData = JSON.parse(savedGoogleUser);
                        if (googleData.picture) {
                            setUserAvatar(googleData.picture);
                        } else {
                            setUserAvatar(null);
                        }
                    } catch (e) {
                        console.error('Failed to parse google_user', e);
                        setUserAvatar(null);
                    }
                } else {
                    setUserAvatar(null);
                }
            } else {
                setUserAvatar(null);
            }
        };

        // Initial check
        checkLoginStatus();

        // Listen for custom login/logout events across components
        window.addEventListener('user-login', checkLoginStatus);
        window.addEventListener('user-logout', checkLoginStatus);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('user-login', checkLoginStatus);
            window.removeEventListener('user-logout', checkLoginStatus);
        };
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
        localStorage.removeItem('google_user');
        setIsLoggedIn(false);
        setUserAvatar(null);
        window.dispatchEvent(new Event('user-logout'));
        router.push('/login');
    };

    const navLinks = [
        { name: t('home') || 'Home', href: '#home' },
        { name: t('services') || 'Services', href: '#services' },
        { name: t('features') || 'Features', href: '#features' },
        { name: t('about') || 'Tentang Kami', href: '#about' },
        { name: t('articles') || 'Articles', href: 'blog' },
    ];

    const menuVariants = {
        closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
    };

    return (
        <nav
            className={`fixed w-full z-50 top-0 [.has-promo_&]:top-[44px] transition-all duration-300 ${(isScrolled || isBlogPage)
                ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 py-3'
                : 'bg-transparent py-5'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link
                    href="/"
                    className="transition-all"
                    onClick={() => resetPreloading()}
                >
                    <div className="flex items-center">
                        <div className="h-12 md:h-14 aspect-[16/9] relative">
                            <Image
                                src="/perabox_icon.png"
                                alt="PERABOX Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
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
                                if (link.href.startsWith('#')) {
                                    if (pathname === '/') {
                                        customSmoothScroll(link.href);
                                    } else {
                                        router.push(`/${link.href}`);
                                    }
                                } else {
                                    router.push(`/${link.href.startsWith('/') ? link.href.slice(1) : link.href}`);
                                }
                            }}
                            className={`relative group transition-all tracking-wide cursor-pointer ${(isScrolled || isBlogPage) ? 'text-gray-700' : 'text-gray-800'
                                } hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1`}
                        >
                            {link.name.toUpperCase()}
                            <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full opacity-0 group-hover:opacity-100"></span>
                        </a>
                    ))}

                    <LanguageSwitcher />

                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <Link
                                href="/customer/profile"
                                className="text-gray-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1"
                            >
                                {t('profile') || 'PROFILE'}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 rounded-lg px-2 py-1"
                            >
                                {t('logout') || 'LOGOUT'}
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                        >
                            {t('login') || 'LOGIN'}
                        </Link>
                    )}
                </div>

                {/* Mobile Actions (Language, Auth, Hamburger) */}
                <div className="flex md:hidden items-center gap-3">
                    <LanguageSwitcher />
                    {isLoggedIn ? (
                        <Link
                            href="/customer/profile"
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors overflow-hidden ${isScrolled ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-white/20 text-dark hover:bg-white/30 backdrop-blur-sm'}`}
                            aria-label={t('profile') || 'Profile'}
                        >
                            {userAvatar ? (
                                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                                <svg className={`w-5 h-5 flex-shrink-0 ${isScrolled || isBlogPage ? 'text-primary' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md active:scale-95 transition-all"
                        >
                            {t('login') || 'LOGIN'}
                        </Link>
                    )}
                    <button
                        ref={hamburgerRef}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
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
                                        if (link.href.startsWith('#')) {
                                            if (pathname === '/') {
                                                customSmoothScroll(link.href);
                                            } else {
                                                router.push(`/${link.href}`);
                                            }
                                        } else {
                                            router.push(`/${link.href.startsWith('/') ? link.href.slice(1) : link.href}`);
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
                                        {t('profile') || 'PROFILE'}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-red-500 hover:text-red-600 py-3 px-4 hover:bg-red-50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                                        role="menuitem"
                                    >
                                        {t('logout') || 'LOGOUT'}
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-primary text-white px-6 py-4 rounded-2xl text-center shadow-lg shadow-primary/20 mt-2 active:scale-[0.98] transition-all"
                                    role="menuitem"
                                >
                                    {t('login') || 'LOGIN'}
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
