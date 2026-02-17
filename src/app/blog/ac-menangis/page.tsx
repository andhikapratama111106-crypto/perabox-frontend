
import Link from 'next/link';

export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-16">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        Tahukah Anda? AC Anda &quot;Menangis&quot; Saat Terlalu Terbebani
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">August 20, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Pernah melihat AC Anda meneteskan air dari unit indoor? Banyak orang mengira itu hal biasa. Padahal, dalam beberapa kasus, itu adalah tanda bahwa AC sedang &quot;menangis&quot; karena bekerja terlalu keras.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Ya, AC bisa mengalami overload — dan air yang menetes bisa menjadi sinyal awal adanya masalah.
                </p>

                {/* Section: Kenapa AC Bisa Menangis */}
                <h2 className="text-2xl font-bold text-dark mb-6">Kenapa AC Bisa &quot;Menangis&quot;?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Saat AC bekerja, ia menyerap panas dari ruangan dan menghasilkan kondensasi (air). Normalnya, air ini mengalir keluar melalui saluran pembuangan (drain hose).
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                    Namun, ketika AC terlalu terbebani, beberapa hal bisa terjadi:
                </p>

                {/* Item 1 */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-dark mb-3">1. Filter Terlalu Kotor</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Debu yang menumpuk menghambat aliran udara. Akibatnya, evaporator membeku dan saat es mencair, air menetes berlebihan.
                    </p>
                </div>

                {/* Item 2 */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-dark mb-3">2. Ruangan Terlalu Panas &amp; AC Dipaksa Kerja Maksimal</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Mengatur suhu terlalu rendah dalam waktu lama membuat kompresor terus bekerja tanpa jeda.
                    </p>
                </div>

                {/* Item 3 */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-dark mb-3">3. Freon Bermasalah</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Tekanan freon yang tidak stabil bisa menyebabkan pembentukan bunga es yang berujung pada tetesan air.
                    </p>
                </div>

                {/* Item 4 */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-dark mb-3">4. Saluran Drainase Tersumbat</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Air tidak bisa keluar dengan lancar sehingga meluap dan menetes dari unit indoor.
                    </p>
                </div>

                {/* Warning Signs */}
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-8 mb-10">
                    <h2 className="text-xl font-bold text-dark mb-4">Tanda-Tanda AC Anda Sedang Overload</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li>⚠️ Air menetes dari unit indoor</li>
                        <li>⚠️ AC kurang dingin meski suhu sudah rendah</li>
                        <li>⚠️ Muncul bunga es pada pipa</li>
                        <li>⚠️ Suara mesin lebih keras dari biasanya</li>
                        <li>⚠️ Tagihan listrik meningkat drastis</li>
                    </ul>
                    <p className="text-gray-700 mt-4 font-medium">
                        Jika tanda-tanda ini muncul, jangan diabaikan.
                    </p>
                </div>

                {/* Prevention */}
                <div className="bg-green-50 border-l-4 border-green-400 rounded-xl p-8 mb-10">
                    <h2 className="text-xl font-bold text-dark mb-4">Cara Mencegah AC &quot;Menangis&quot;</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li>✅ Bersihkan filter setiap 2–4 minggu</li>
                        <li>✅ Jangan langsung set suhu terlalu rendah (atur di 24–26°C)</li>
                        <li>✅ Pastikan ventilasi ruangan baik</li>
                        <li>✅ Lakukan servis rutin setiap 3–4 bulan</li>
                        <li>✅ Periksa saluran pembuangan air secara berkala</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        Perawatan sederhana bisa mencegah kerusakan besar di kemudian hari.
                    </p>
                </div>

                {/* When to call professional */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-dark mb-4">Kapan Harus Menghubungi Profesional?</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Jika AC terus menetes meskipun sudah dibersihkan, atau muncul bunga es dan suara tidak normal, segera hubungi teknisi. Penanganan yang salah bisa merusak kompresor — komponen paling mahal pada AC.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-medium">
                        PERABOX siap membantu dengan layanan servis AC profesional yang cepat, aman, dan transparan.
                    </p>
                </div>

                {/* Closing Quote */}
                <div className="bg-secondary rounded-2xl p-8 mt-12 text-center">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4 italic">
                        AC yang &quot;menangis&quot; bukan sekadar bocor biasa — itu bisa menjadi tanda bahwa sistem sedang kewalahan.
                    </p>
                    <p className="text-dark font-bold text-lg">Rawat sebelum rusak.</p>
                    <p className="text-dark font-bold text-lg">Servis sebelum mahal.</p>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">Butuh bantuan profesional untuk perawatan AC Anda?</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
