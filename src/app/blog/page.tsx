"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function BlogPage() {
    const { t, currencyCode } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const articles = [
        {
            id: 'peralatan',
            date: "2023-11-22",
            image: "/article_handyman.png",
            slug: "/blog/peralatan-perawatan-ac",
            categoryKey: "tips",
            position: "center",
        },
        {
            id: 'menangis',
            date: "2023-08-20",
            image: "/article_ac_broken.png",
            slug: "/blog/ac-menangis",
            categoryKey: "edu",
            position: "top",
        },
        {
            id: 'memperbaiki',
            date: "2023-08-08",
            image: "/article_ac_unit.png",
            slug: "/blog/cara-memperbaiki-ac",
            categoryKey: "diy",
            position: "bottom",
        },
        {
            id: 'servis',
            date: "2023-07-15",
            image: "/cover_servis_rutin.png",
            slug: "/blog/servis-rutin-ac",
            categoryKey: "edu",
            position: "top",
        },
        {
            id: 'inverter',
            date: "2023-07-02",
            image: "/cover_inverter.png",
            slug: "/blog/ac-inverter-vs-non-inverter",
            categoryKey: "guide",
            position: "center",
        },
        {
            id: 'panduanPk',
            date: "2023-06-20",
            image: "/cover_pk_ac.png",
            slug: "/blog/panduan-pk-ac",
            categoryKey: "edu",
            position: "center",
        },
        {
            id: 'bahaya',
            date: "2023-06-05",
            image: "/cover_freon_bocor.png",
            slug: "/blog/bahaya-freon-bocor",
            categoryKey: "warning",
            position: "center",
        },
        {
            id: 'berbau',
            date: "2023-05-18",
            image: "/cover_ac_bau.png",
            slug: "/blog/ac-berbau",
            categoryKey: "edu",
            position: "top",
        },
        {
            id: 'merawat',
            date: "2023-05-01",
            image: "/cover_rawat_ac.png",
            slug: "/blog/tips-merawat-ac",
            categoryKey: "tips",
            position: "top",
        },
    ];

    const formatDate = (dateStr: string) => {
        if (!mounted) return dateStr;
        try {
            return new Date(dateStr).toLocaleDateString(currencyCode || 'id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Date formatting error:', error);
            // Fallback to a simple date string if toLocaleDateString fails
            return dateStr;
        }
    };

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-20">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('blogPage.backToHome')}
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        {t('blogPage.title')}
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        {t('blogPage.subtitle')}
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <Link
                            key={index}
                            href={article.slug}
                            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${article.slug === '#' ? 'pointer-events-none' : ''
                                }`}
                        >
                            <div className="relative h-52 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${article.image})`, backgroundPosition: article.position || 'center' }}
                                ></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {t(`blogPage.categories.${article.categoryKey}`)}
                                    </span>
                                </div>
                                {article.slug === '#' && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="bg-white/90 text-dark text-xs font-bold px-4 py-2 rounded-full">
                                            {t('blogPage.comingSoon')}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-dark text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {t(`blogPage.articles.${article.id}`)}
                                </h3>
                                <p className="text-xs text-gray-400">{formatDate(article.date)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
