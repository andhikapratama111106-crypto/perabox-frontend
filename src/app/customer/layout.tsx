"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.replace('/login');
                return;
            }
            try {
                await authAPI.getCurrentUser();
                setIsLoading(false);
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
        { name: 'My Profile', href: '/customer/profile', icon: '👤' },
        { name: 'Security', href: '/customer/security', icon: '🛡️' },
        { name: 'Notification', href: '/customer/notifications', icon: '🔔' },
        { name: 'Dashboard', href: '/customer/dashboard', icon: '📊' }, // Assuming this leads to main customer dashboard
        { name: 'Rate', href: '/customer/rate', icon: '⭐' },
        { name: 'Help & Support', href: '/customer/support', icon: 'ℹ️' },
        { name: 'Terms & Conditions', href: '/customer/terms', icon: '❓' },
    ];

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT', href: '/#about' },
        { name: 'SERVICES', href: '/#services' },
        { name: 'PROFILE', href: '/customer/profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-dark flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <Link href="/" className="flex items-center gap-2">
                    {/* Use text logo as in Figma if image not available, or keep existing branding */}
                    <div className="relative h-10 w-32 md:h-12 md:w-40">
                        <Image
                            src="/perabox_icon.png"
                            alt="PERABOX Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold tracking-wide transition-colors ${pathname === link.href ? 'text-primary' : 'text-gray-500 hover:text-dark'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </nav>

            <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-4 shadow-sm h-full flex flex-col">
                        <div className="space-y-1 mb-auto">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                                            ${isActive
                                                ? 'bg-orange-50 text-orange-600 font-bold' // Matching visual style (My Profile highlighted)
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                                            }
                                        `}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-100 space-y-2">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-dark transition-colors font-medium">
                                Change Language
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('access_token');
                                    window.location.href = '/login';
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-bold"
                            >
                                Log Out
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
