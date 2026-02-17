
import Link from 'next/link';

export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-16">
                <div className="container mx-auto px-6">
                    <Link href="/blog" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Blog
                    </Link>
                    <span className="inline-block bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Peringatan</span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        Bahaya Freon Bocor: Tanda-Tanda dan Cara Mengatasinya
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">June 5, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Freon adalah komponen penting dalam sistem pendinginan AC. Jika terjadi kebocoran, dampaknya bisa serius.
                </p>

                {/* Tanda-Tanda */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Tanda-Tanda Freon Bocor</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>AC tidak dingin meski sudah disetel maksimal</li>
                        <li>Muncul es di pipa AC</li>
                        <li>Terdengar suara mendesis</li>
                        <li>Konsumsi listrik meningkat</li>
                    </ul>
                </div>

                {/* Risiko */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Risiko Freon Bocor</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Kerusakan kompresor</li>
                        <li>Sistem pendinginan tidak stabil</li>
                        <li>Risiko kesehatan jika terhirup dalam jumlah besar</li>
                    </ul>
                </div>

                {/* Cara Mengatasi */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Cara Mengatasinya</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</span>
                            <p className="text-gray-700 leading-relaxed">Matikan AC segera</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</span>
                            <p className="text-gray-700 leading-relaxed">Jangan isi ulang tanpa pengecekan kebocoran</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</span>
                            <p className="text-gray-700 leading-relaxed">Panggil teknisi profesional untuk pemeriksaan tekanan dan perbaikan titik bocor</p>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-red-700 mb-4">⚠️ Peringatan Penting</h2>
                    <p className="text-red-600 leading-relaxed">
                        Isi freon tanpa memperbaiki kebocoran hanya solusi sementara. Pastikan titik kebocoran diperbaiki terlebih dahulu oleh teknisi profesional.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">AC Anda bermasalah? Hubungi teknisi kami sekarang.</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
