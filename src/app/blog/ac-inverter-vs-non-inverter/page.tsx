
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
                    <span className="inline-block bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Panduan</span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        Perbedaan AC Inverter dan Non-Inverter: Mana yang Lebih Hemat?
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">July 2, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Saat membeli AC, Anda mungkin dihadapkan pada pilihan inverter atau non-inverter. Keduanya memiliki kelebihan dan kekurangan masing-masing.
                </p>

                {/* Non-Inverter */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Cara Kerja AC Non-Inverter</h2>
                    <p className="text-gray-700 leading-relaxed">
                        AC non-inverter bekerja dengan sistem on-off. Saat suhu tercapai, kompresor mati. Ketika suhu naik kembali, kompresor menyala penuh. Pola ini menyebabkan konsumsi listrik lebih tinggi saat start ulang.
                    </p>
                </div>

                {/* Inverter */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Cara Kerja AC Inverter</h2>
                    <p className="text-gray-700 leading-relaxed">
                        AC inverter menyesuaikan kecepatan kompresor sesuai kebutuhan. Setelah suhu tercapai, kompresor tetap menyala dengan daya rendah untuk menjaga stabilitas suhu.
                    </p>
                </div>

                {/* Comparison */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Mana yang Lebih Hemat?</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Dalam jangka panjang, AC inverter lebih hemat listrik, terutama jika digunakan lebih dari 6 jam per hari. Namun, harga awal biasanya lebih tinggi dibanding non-inverter.
                    </p>
                </div>

                {/* Conclusion */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">📌 Kesimpulan</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-primary font-bold">•</span>
                            <p className="text-gray-700 leading-relaxed"><strong>Pemakaian singkat & jarang</strong> → Non-inverter cukup</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-primary font-bold">•</span>
                            <p className="text-gray-700 leading-relaxed"><strong>Pemakaian lama & rutin</strong> → Inverter lebih hemat</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">Butuh bantuan memilih AC yang tepat?</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Konsultasi Gratis
                    </Link>
                </div>
            </article>
        </main>
    );
}
