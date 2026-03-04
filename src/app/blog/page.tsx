"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

const CATEGORIES = ['all', 'tips', 'edu', 'diy', 'guide', 'warning'];

const CATEGORY_LABELS: Record<string, string> = {
    all: 'Semua',
    tips: '💡 Tips',
    edu: '📚 Edukasi',
    diy: '🔧 DIY',
    guide: '🗺️ Panduan',
    warning: '⚠️ Peringatan',
};

const articles = [
    { id: 'peralatan', date: '2023-11-22', image: '/article_handyman.png', slug: '/blog/peralatan-perawatan-ac', categoryKey: 'tips', position: 'center', readMin: 5 },
    { id: 'menangis', date: '2023-08-20', image: '/article_ac_broken.png', slug: '/blog/ac-menangis', categoryKey: 'edu', position: 'top', readMin: 4 },
    { id: 'memperbaiki', date: '2023-08-08', image: '/article_ac_unit.png', slug: '/blog/cara-memperbaiki-ac', categoryKey: 'diy', position: 'bottom', readMin: 7 },
    { id: 'servis', date: '2023-07-15', image: '/cover_servis_rutin.png', slug: '/blog/servis-rutin-ac', categoryKey: 'edu', position: 'top', readMin: 3 },
    { id: 'inverter', date: '2023-07-02', image: '/cover_inverter.png', slug: '/blog/ac-inverter-vs-non-inverter', categoryKey: 'guide', position: 'center', readMin: 6 },
    { id: 'panduanPk', date: '2023-06-20', image: '/cover_pk_ac.png', slug: '/blog/panduan-pk-ac', categoryKey: 'edu', position: 'center', readMin: 5 },
    { id: 'bahaya', date: '2023-06-05', image: '/cover_freon_bocor.png', slug: '/blog/bahaya-freon-bocor', categoryKey: 'warning', position: 'center', readMin: 4 },
    { id: 'berbau', date: '2023-05-18', image: '/cover_ac_bau.png', slug: '/blog/ac-berbau', categoryKey: 'edu', position: 'top', readMin: 3 },
    { id: 'merawat', date: '2023-05-01', image: '/cover_rawat_ac.png', slug: '/blog/tips-merawat-ac', categoryKey: 'tips', position: 'top', readMin: 5 },
];

export default function BlogPage() {
    const { t, currencyCode } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => { setMounted(true); }, []);

    const filtered = activeCategory === 'all'
        ? articles
        : articles.filter((a) => a.categoryKey === activeCategory);

    const featured = articles[0];

    const formatDate = (dateStr: string) => {
        if (!mounted) return dateStr;
        try {
            return new Date(dateStr).toLocaleDateString(currencyCode || 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch { return dateStr; }
    };

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #D4A373 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        {t('blogPage.backToHome')}
                    </Link>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">Blog & Tips</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight">{t('blogPage.title')}</h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl font-body">{t('blogPage.subtitle')}</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">

                {/* Featured Article */}
                <Reveal direction="up">
                    <Link href={featured.slug} className="group block mb-12">
                        <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 bg-dark">
                            <div
                                className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-700"
                                style={{ backgroundImage: `url(${featured.image})`, backgroundPosition: featured.position }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                                    🔥 Artikel Terpopuler
                                </span>
                                <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                    {t(`blogPage.articles.${featured.id}`)}
                                </h2>
                                <p className="text-gray-300 text-sm font-body">{formatDate(featured.date)} · {featured.readMin} min baca</p>
                            </div>
                        </div>
                    </Link>
                </Reveal>

                {/* Category Filter */}
                <Reveal direction="up" delay={0.1}>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {CATEGORIES.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {CATEGORY_LABELS[cat]}
                            </motion.button>
                        ))}
                        <span className="ml-auto text-sm text-gray-400 self-center font-body">{filtered.length} artikel</span>
                    </div>
                </Reveal>

                {/* Articles Grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filtered.map((article, index) => (
                        <Link
                            key={article.id}
                            href={article.slug}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-50"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${article.image})`, backgroundPosition: article.position }}
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {t(`blogPage.categories.${article.categoryKey}`)}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full font-body">
                                        {article.readMin} min
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display font-bold text-dark text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {t(`blogPage.articles.${article.id}`)}
                                </h3>
                                <p className="text-xs text-gray-400 font-body">{formatDate(article.date)}</p>
                            </div>
                        </Link>
                    ))}
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">📭</p>
                        <p className="font-body">Tidak ada artikel di kategori ini.</p>
                    </div>
                )}

                {/* Newsletter CTA */}
                <Reveal direction="up" delay={0.2}>
                    <div className="mt-16 bg-dark rounded-3xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-2xl font-display font-bold mb-3">Tips AC Langsung ke WhatsApp Anda 📲</h2>
                        <p className="text-gray-400 font-body mb-6 max-w-md mx-auto">Dapatkan tips perawatan AC gratis setiap minggu. Gabung komunitas 10.000+ pengguna PERABOX.</p>
                        <a
                            href="https://wa.me/6287774266360?text=Halo+PERABOX,+saya+ingin+langganan+tips+AC"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#1ebb57] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Gabung Sekarang
                        </a>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
