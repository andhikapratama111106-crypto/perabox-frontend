"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-20">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('faqPage.backToHome') || 'Kembali ke Beranda'}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Kebijakan Privasi
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Terakhir diperbarui: 1 Januari 2024
                    </p>
                </div>
            </div>

            {/* Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl prose prose-lg prose-gray">
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">1. Informasi yang Kami Kumpulkan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kami mengumpulkan informasi yang Anda berikan secara langsung saat mendaftar atau memesan layanan, termasuk: nama lengkap, alamat email, nomor telepon, dan alamat tempat tinggal.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">2. Penggunaan Informasi</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Informasi Anda digunakan untuk: memproses pemesanan layanan, mengirimkan teknisi ke lokasi Anda, berkomunikasi terkait jadwal dan status layanan, serta meningkatkan kualitas layanan kami.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">3. Keamanan Data</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai untuk melindungi data pribadi Anda dari akses, perubahan, atau pengungkapan yang tidak sah.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">4. Berbagi Informasi</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan kepada teknisi yang ditugaskan untuk layanan Anda dan mitra pembayaran yang diperlukan untuk memproses transaksi.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">5. Cookie dan Pelacakan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Website kami menggunakan cookie untuk menyimpan preferensi bahasa dan meningkatkan pengalaman pengguna. Anda dapat mengatur browser Anda untuk menolak cookie, namun hal ini dapat mempengaruhi fungsionalitas website.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">6. Hak Anda</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Anda berhak untuk mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja. Hubungi tim kami untuk permintaan terkait data pribadi.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">7. Perubahan Kebijakan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui email atau notifikasi di platform kami.
                    </p>
                </section>

                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">🔒 Keamanan Anda Prioritas Kami</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, jangan ragu untuk menghubungi tim kami.
                    </p>
                    <Link href="/contact" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Hubungi Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
