"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const services = [
    {
        id: 'cuci-ac',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        ),
        badge: '🔥 Terlaris',
        badgeColor: 'bg-red-100 text-red-600',
        titleKey: 'servicesSection.service1Title',
        fallbackTitle: 'Cuci AC',
        descKey: 'servicesSection.service1Headline',
        fallbackDesc: 'Bersih Total, Udara Lebih Segar',
        price: 'Mulai Rp 85.000',
        duration: '45–60 menit',
        href: '/book',
        color: 'from-blue-50 to-cyan-50',
        iconBg: 'bg-blue-100 text-blue-600',
    },
    {
        id: 'pasang-ac',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        ),
        badge: null,
        badgeColor: '',
        titleKey: 'servicesSection.service2Title',
        fallbackTitle: 'Pasang AC',
        descKey: 'servicesSection.service2Headline',
        fallbackDesc: 'Pemasangan Tepat & Profesional',
        price: 'Mulai Rp 350.000',
        duration: '2–4 jam',
        href: '/book',
        color: 'from-green-50 to-emerald-50',
        iconBg: 'bg-green-100 text-green-600',
    },
    {
        id: 'perbaikan-ac',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        badge: '⚡ Cepat',
        badgeColor: 'bg-orange-100 text-orange-600',
        titleKey: 'servicesSection.service3Title',
        fallbackTitle: 'Perbaikan AC',
        descKey: 'servicesSection.service3Headline',
        fallbackDesc: 'Perbaikan Cepat & Tepat Sasaran',
        price: 'Mulai Rp 150.000',
        duration: '1–3 jam',
        href: '/book',
        color: 'from-orange-50 to-amber-50',
        iconBg: 'bg-orange-100 text-orange-600',
    },
    {
        id: 'isi-freon',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
        badge: null,
        badgeColor: '',
        titleKey: 'servicesSection.service4Title',
        fallbackTitle: 'Isi Freon',
        descKey: 'servicesSection.service4Headline',
        fallbackDesc: 'Optimal dengan Freon Berkualitas',
        price: 'Mulai Rp 120.000',
        duration: '30–60 menit',
        href: '/book',
        color: 'from-purple-50 to-violet-50',
        iconBg: 'bg-purple-100 text-purple-600',
    },
];

export default function ServicesPage() {
    const { t } = useLanguage();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'radial-gradient(circle, #D4A373 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} />
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
                        Layanan Kami
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight">
                        Semua yang Anda Butuhkan<br />
                        <span className="text-accent italic">untuk AC Anda</span>
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl font-body">
                        Teknisi bersertifikat siap membantu. Mulai dari cuci rutin hingga perbaikan darurat, kami ada untuk Anda.
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Pelanggan Puas', value: '10.000+' },
                            { label: 'Teknisi Aktif', value: '120+' },
                            { label: 'Rating Google', value: '4.7 ⭐' },
                            { label: 'Garansi Layanan', value: '30 Hari' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-2xl font-stat font-bold text-primary">{stat.value}</p>
                                <p className="text-xs text-gray-500 font-body mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <Reveal key={service.id} direction="up" delay={0.1 * index}>
                            <motion.div
                                className={`relative bg-gradient-to-br ${service.color} rounded-3xl p-8 border-2 transition-all duration-300 cursor-pointer ${hoveredId === service.id ? 'border-primary shadow-xl shadow-primary/10' : 'border-transparent shadow-sm'}`}
                                onHoverStart={() => setHoveredId(service.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                whileHover={{ y: -4 }}
                            >
                                {/* Badge */}
                                {service.badge && (
                                    <span className={`absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full ${service.badgeColor}`}>
                                        {service.badge}
                                    </span>
                                )}

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}>
                                    {service.icon}
                                </div>

                                <h2 className="text-2xl font-display font-bold text-dark mb-2">
                                    {t(service.titleKey) || service.fallbackTitle}
                                </h2>
                                <p className="text-gray-600 font-body mb-6">
                                    {t(service.descKey) || service.fallbackDesc}
                                </p>

                                {/* Details */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-bold text-dark">{service.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{service.duration}</span>
                                    </div>
                                </div>

                                <Link
                                    href={service.href}
                                    className="inline-flex items-center gap-2 bg-dark text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary transition-colors duration-300 text-sm"
                                >
                                    Pesan Sekarang
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>

                {/* Bottom CTA */}
                <Reveal direction="up" delay={0.3}>
                    <div className="mt-16 bg-dark rounded-3xl p-10 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle, #D4A373 1.5px, transparent 1.5px)',
                            backgroundSize: '24px 24px',
                        }} />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-4">
                                Butuh Layanan Darurat? 🚨
                            </h2>
                            <p className="text-gray-400 font-body mb-6 max-w-lg mx-auto">
                                Tim kami siap 7 hari seminggu. Hubungi kami via WhatsApp untuk layanan dengan respons super cepat.
                            </p>
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6287774266360'}?text=Halo+PERABOX,+saya+butuh+bantuan+darurat`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#1ebb57] transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat WhatsApp Sekarang
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
