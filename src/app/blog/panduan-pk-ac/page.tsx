"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ShareBar from '@/components/ShareBar';

export default function ArticlePage() {
    const { t, currencyCode } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const articleId = 'panduanPk';
    const date = "2023-06-20";

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
            return dateStr;
        }
    };

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white pt-24 md:pt-28 pb-16">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('blogPage.backToHome')}
                    </Link>
                    <span className="inline-block bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                        {t('blogPage.categories.edu')}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        {t(`blogPage.articles.${articleId}`)}
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">{formatDate(date)}</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Memilih PK (Paardekracht) AC yang tepat sangat penting agar ruangan dingin optimal tanpa boros listrik.
                </p>

                {/* Apa Itu PK */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Apa Itu PK?</h2>
                    <p className="text-gray-700 leading-relaxed">
                        PK menunjukkan kapasitas pendinginan AC. Semakin besar ruangan, semakin besar PK yang dibutuhkan.
                    </p>
                </div>

                {/* Perhitungan */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Perhitungan Sederhana</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">Sebagai gambaran umum:</p>
                    <div className="bg-secondary rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-3 text-dark font-bold text-sm">Kapasitas AC</th>
                                    <th className="px-6 py-3 text-dark font-bold text-sm">Ukuran Ruangan</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr className="border-b border-gray-100">
                                    <td className="px-6 py-3">0.5 PK</td>
                                    <td className="px-6 py-3">± 10 m²</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="px-6 py-3">0.75 PK</td>
                                    <td className="px-6 py-3">± 14 m²</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="px-6 py-3">1 PK</td>
                                    <td className="px-6 py-3">± 18 m²</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="px-6 py-3">1.5 PK</td>
                                    <td className="px-6 py-3">± 24 m²</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3">2 PK</td>
                                    <td className="px-6 py-3">± 36 m²</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Faktor Tambahan */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Faktor Tambahan yang Perlu Dipertimbangkan</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Tinggi plafon</li>
                        <li>Jumlah jendela</li>
                        <li>Paparan sinar matahari</li>
                        <li>Jumlah orang di dalam ruangan</li>
                    </ul>
                </div>

                {/* Warning */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">⚠️ Perhatian</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Memilih PK terlalu kecil membuat AC cepat rusak karena bekerja terlalu keras. Terlalu besar membuat konsumsi listrik tidak efisien. Pastikan memilih kapasitas yang sesuai dengan kebutuhan ruangan Anda.
                    </p>
                </div>

                {/* Share Bar */}
                <ShareBar title="Panduan Memilih PK AC yang Tepat – PERABOX" />

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">Butuh bantuan memilih dan memasang AC?</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
