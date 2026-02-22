"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { motion } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/translations';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { t, language, setLanguage } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [isLangOpen, setIsLangOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.replace('/login');
            return;
        }

        // Optimistically allow the layout to render if we have a token
        setIsLoading(false);

        const checkAuth = async () => {
            try {
                await authAPI.getCurrentUser();
            } catch (error) {
                console.error("Auth check failed", error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                router.replace('/login');
            }
        };
        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const sidebarItems = [
        {
            name: t('sidebar.myProfile'),
            href: '/customer/profile',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            name: t('sidebar.security'),
            href: '/customer/security',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            name: t('sidebar.notification'),
            href: '/customer/notifications',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        {
            name: t('sidebar.dashboard'),
            href: '/customer/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            name: t('sidebar.rate'),
            href: '/customer/rate',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        },
        {
            name: t('sidebar.support'),
            href: '/customer/support',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            name: t('sidebar.terms'),
            href: '/customer/terms',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
    ];

    const navLinks = [
        { name: t('common.home'), href: '/' },
        { name: t('common.about'), href: '/#about' },
        { name: t('common.services'), href: '/#services' },
        { name: t('common.profile'), href: '/customer/profile' },
    ];

    const languages: { code: Language; name: string; flag: string }[] = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-dark flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <Link href="/" className="flex items-center gap-2">
                    <div className="transition-transform hover:scale-105">
                        <Image
                            src="/perabox_icon.png"
                            alt="PERABOX Logo"
                            width={160}
                            height={90}
                            className="h-10 w-auto md:h-12"
                            priority
                        />
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold tracking-wide transition-all ${pathname === link.href ? 'text-[#9C6D3F]' : 'text-gray-500 hover:text-[#9C6D3F]'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </nav>

            <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-[2rem] p-5 shadow-sm h-full flex flex-col border border-gray-100">
                        <div className="space-y-1.5 mb-auto">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                                            ${isActive
                                                ? 'bg-[#FDF8F3] text-[#9C6D3F] shadow-sm shadow-[#9C6D3F]/5'
                                                : 'text-gray-500 hover:bg-[#FDF8F3]/50 hover:text-[#9C6D3F]'
                                            }
                                        `}
                                    >
                                        <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {item.icon}
                                        </div>
                                        <span className={`text-[13px] font-bold ${isActive ? 'tracking-tight' : 'tracking-normal'}`}>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-100 space-y-2 relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-500 hover:text-[#9C6D3F] hover:bg-[#FDF8F3]/50 rounded-xl transition-all font-bold group"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
                                    {t('common.changeLanguage')}
                                </span>
                                <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>

                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50 
                                                ${language === lang.code ? 'text-[#9C6D3F] font-bold bg-[#FDF8F3]/50' : 'text-gray-600'}
                                            `}
                                        >
                                            <span className="text-lg">{lang.flag}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <button
                                onClick={() => {
                                    localStorage.removeItem('access_token');
                                    window.location.href = '/login';
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold"
                            >
                                {t('common.logout')}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
