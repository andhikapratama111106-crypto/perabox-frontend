
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
                    <span className="inline-block bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Edukasi</span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
                        Mengapa AC Anda Berbau? Penyebab dan Solusinya
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">May 18, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    AC yang mengeluarkan bau tidak sedap sering kali disebabkan oleh penumpukan kotoran dan kelembapan.
                </p>

                {/* Penyebab */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Penyebab Umum</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Filter kotor</li>
                        <li>Jamur di evaporator</li>
                        <li>Saluran pembuangan tersumbat</li>
                        <li>Bangkai serangga di unit outdoor</li>
                    </ul>
                </div>

                {/* Solusi */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">Solusi</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</span>
                            <p className="text-gray-700 leading-relaxed">Bersihkan filter setiap 2–4 minggu</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</span>
                            <p className="text-gray-700 leading-relaxed">Lakukan servis cuci AC menyeluruh</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</span>
                            <p className="text-gray-700 leading-relaxed">Pastikan drainase lancar</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">4</span>
                            <p className="text-gray-700 leading-relaxed">Gunakan mode fan sebelum mematikan AC</p>
                        </div>
                    </div>
                </div>

                {/* Tip */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">💡 Tips</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Perawatan rutin adalah kunci mencegah bau kembali muncul. Jadwalkan servis AC berkala untuk menjaga udara tetap segar dan sehat.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">AC Anda berbau? Hubungi teknisi kami untuk servis cuci AC.</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
