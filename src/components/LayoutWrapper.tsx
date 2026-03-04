"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollBlur from './ScrollBlur';
import PageTransition from './PageTransition';
import ChatBot from './ChatBot';
import BackToTop from './BackToTop';
import FloatingWhatsApp from './FloatingWhatsApp';
import PromoBanner from './PromoBanner';
import CookieBanner from './CookieBanner';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const isAuth = pathname === '/login' || pathname === '/register';
    const isBook = pathname === '/book';

    return (
        <>
            {!isAdmin && <PromoBanner />}
            {!isAdmin && <Navbar />}
            {isBook ? (
                <PageTransition>
                    {children}
                </PageTransition>
            ) : (
                <ScrollBlur>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </ScrollBlur>
            )}
            {!isAdmin && !isAuth && <Footer />}
            <ChatBot />
            <FloatingWhatsApp />
            <BackToTop />
            <CookieBanner />
        </>
    );
}
