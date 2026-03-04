"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
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
                        Syarat & Ketentuan
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Berlaku sejak 1 Januari 2024
                    </p>
                </div>
            </div>

            {/* Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl prose prose-lg prose-gray">
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">1. Penerimaan Ketentuan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Dengan menggunakan layanan PERABOX, Anda menyetujui syarat dan ketentuan yang tercantum di halaman ini. Jika Anda tidak setuju dengan syarat-syarat ini, mohon untuk tidak menggunakan layanan kami.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">2. Deskripsi Layanan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        PERABOX menyediakan platform yang menghubungkan pengguna dengan teknisi profesional untuk layanan perawatan dan perbaikan rumah, termasuk namun tidak terbatas pada: cuci AC, pasang AC, perbaikan AC, dan pengisian freon.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">3. Pemesanan dan Pembayaran</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Semua pemesanan layanan dilakukan melalui platform PERABOX. Harga layanan ditampilkan secara transparan sebelum konfirmasi pesanan. Pembayaran dapat dilakukan melalui QRIS, transfer bank, atau tunai langsung kepada teknisi setelah pekerjaan selesai.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">4. Garansi Layanan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        PERABOX memberikan garansi 30 hari untuk setiap layanan yang diberikan. Jika terjadi masalah setelah layanan, teknisi akan kembali untuk melakukan pengecekan ulang tanpa biaya tambahan.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">5. Pembatalan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Anda dapat membatalkan pesanan sebelum teknisi berangkat tanpa dikenakan biaya. Pembatalan setelah teknisi dalam perjalanan mungkin dikenakan biaya administrasi.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">6. Tanggung Jawab</h2>
                    <p className="text-gray-600 leading-relaxed">
                        PERABOX bertanggung jawab untuk memastikan kualitas layanan yang diberikan oleh teknisi. Teknisi kami telah melewati proses seleksi ketat dan menerima pelatihan rutin.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">7. Perubahan Ketentuan</h2>
                    <p className="text-gray-600 leading-relaxed">
                        PERABOX berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui platform kami.
                    </p>
                </section>

                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">📞 Ada Pertanyaan?</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Hubungi tim kami jika Anda memiliki pertanyaan mengenai syarat dan ketentuan.
                    </p>
                    <Link href="/contact" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Hubungi Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
