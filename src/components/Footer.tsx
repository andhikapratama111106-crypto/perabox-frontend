
"use client";
import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';
import { translations, Language } from '@/translations';
// Forced refresh for Vercel build v1.1.2


const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://instagram.com/perabox',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com/perabox',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://youtube.com/@perabox',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
            </svg>
        ),
    },
    {
        name: 'WhatsApp',
        href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6287774266360'}`,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
        ),
    },
];

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
            <div className="container mx-auto px-6">

                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">

                    {/* Column 1: Brand & Social */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-dark mb-4 tracking-tighter">
                                PERA<span className="text-primary">BOX</span>
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Solusi pintar untuk perawatan dan pemeliharaan rumah Anda. Teknisi profesional, harga transparan, dan bergaransi.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-black text-dark text-xs uppercase tracking-[0.2em] mb-8">{t('footer.company')}</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.aboutUs')}</Link></li>
                            <li><Link href="/services" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.services')}</Link></li>
                            <li><Link href="/blog" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('articles') || 'Blog & Artikel'}</Link></li>
                            <li><Link href="/contact" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 className="font-black text-dark text-xs uppercase tracking-[0.2em] mb-8">{t('footer.support')}</h4>
                        <ul className="space-y-4">
                            <li><Link href="/faq" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.faq')}</Link></li>
                            <li><Link href="/terms" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.termsOfService')}</Link></li>
                            <li><Link href="/privacy" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.privacyPolicy')}</Link></li>
                            <li><Link href="/vendor-registration" className="text-gray-500 hover:text-primary transition-all text-sm font-medium">{t('footer.becomeVendor')}</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter / Contact */}
                    <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                        <h4 className="font-black text-dark text-xs uppercase tracking-[0.2em] mb-6">Butuh Bantuan?</h4>
                        <p className="text-sm text-gray-500 mb-6">Hubungi Customer Service kami 24/7</p>
                        <Link
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6287774266360'}`}
                            className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-black transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                            WhatsApp CS
                        </Link>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs text-gray-400 font-medium tracking-tight">
                            © 2024 PERABOX Indonesia. All rights reserved.
                        </p>

                        <div className="flex gap-8">
                            <Link href="/terms" className="text-xs text-gray-400 hover:text-primary transition-colors font-medium">Syarat & Ketentuan</Link>
                            <Link href="/privacy" className="text-xs text-gray-400 hover:text-primary transition-colors font-medium">Kebijakan Privasi</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
