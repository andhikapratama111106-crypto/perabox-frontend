
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
                    <span className="inline-block bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Tips & Trik</span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        Tips Merawat AC Agar Tetap Awet Selama Bertahun-Tahun
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">May 1, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    AC adalah investasi jangka panjang. Dengan perawatan yang tepat, AC bisa bertahan lebih dari 10 tahun.
                </p>

                {/* Tip 1 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">1. Bersihkan Filter Secara Berkala</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Minimal setiap dua minggu untuk menjaga sirkulasi udara. Filter yang bersih memastikan udara yang dihembuskan tetap segar dan AC tidak bekerja terlalu keras.
                    </p>
                </div>

                {/* Tip 2 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">2. Jangan Langsung Atur Suhu Terlalu Rendah</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Mulailah dari suhu 24–26°C agar kompresor tidak bekerja ekstrem. Pengaturan suhu yang terlalu rendah secara tiba-tiba bisa membebani kompresor dan meningkatkan konsumsi listrik.
                    </p>
                </div>

                {/* Tip 3 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">3. Gunakan Timer</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Matikan AC saat tidak digunakan untuk menghemat listrik dan memperpanjang umur komponen. Fitur timer membantu mengotomatisasi jadwal penggunaan AC.
                    </p>
                </div>

                {/* Tip 4 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">4. Lakukan Servis Rutin</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Servis berkala membantu mendeteksi masalah sejak dini. Disarankan melakukan servis setiap 3–4 bulan agar AC tetap dalam kondisi prima.
                    </p>
                </div>

                {/* Tip 5 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">5. Pastikan Instalasi Benar</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Pemasangan yang tidak presisi bisa menyebabkan kebocoran atau kinerja tidak optimal. Pastikan AC dipasang oleh teknisi berpengalaman.
                    </p>
                </div>

                {/* Summary */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">📋 Ringkasan</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Dengan melakukan 5 tips di atas secara konsisten, AC Anda bisa bertahan lebih lama, bekerja lebih efisien, dan menghemat biaya perawatan jangka panjang.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">Butuh bantuan profesional untuk merawat AC Anda?</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
