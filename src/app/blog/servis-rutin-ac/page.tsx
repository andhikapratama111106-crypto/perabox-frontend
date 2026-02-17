
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
                        Kenapa AC Harus Diservis Rutin? Ini 5 Alasan Pentingnya
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">July 15, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    AC bukan hanya soal kenyamanan, tetapi juga kesehatan dan efisiensi energi. Banyak orang baru menyervis AC ketika sudah tidak dingin atau bocor. Padahal, servis rutin adalah langkah preventif yang jauh lebih hemat dibanding perbaikan besar.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Berikut 5 alasan penting kenapa AC wajib diservis secara rutin.
                </p>

                {/* Alasan 1 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">1. Menjaga Performa Pendinginan Tetap Optimal</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Debu dan kotoran yang menumpuk di filter serta evaporator membuat aliran udara terhambat. Akibatnya, AC bekerja lebih keras untuk menghasilkan suhu yang sama. Servis rutin memastikan AC tetap dingin maksimal tanpa beban berlebih.
                    </p>
                </div>

                {/* Alasan 2 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">2. Menghemat Konsumsi Listrik</h2>
                    <p className="text-gray-700 leading-relaxed">
                        AC yang kotor bisa meningkatkan konsumsi listrik hingga 20–30%. Dengan pembersihan berkala, komponen bekerja lebih ringan sehingga penggunaan listrik lebih efisien.
                    </p>
                </div>

                {/* Alasan 3 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">3. Mencegah Kerusakan Besar</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Kerusakan kompresor atau kebocoran sistem sering kali berawal dari masalah kecil yang diabaikan. Pemeriksaan rutin membantu mendeteksi potensi kerusakan sebelum menjadi lebih serius dan mahal.
                    </p>
                </div>

                {/* Alasan 4 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">4. Menjaga Kualitas Udara</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Filter yang kotor bisa menjadi sarang bakteri, jamur, dan debu. Ini berisiko memicu alergi atau gangguan pernapasan. Servis rutin menjaga udara tetap bersih dan sehat.
                    </p>
                </div>

                {/* Alasan 5 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">5. Memperpanjang Umur AC</h2>
                    <p className="text-gray-700 leading-relaxed">
                        AC yang dirawat dengan baik bisa bertahan lebih lama. Perawatan berkala mengurangi keausan komponen dan menjaga sistem tetap stabil.
                    </p>
                </div>

                {/* Recommendation */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">💡 Rekomendasi</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Disarankan servis AC setiap 3–4 bulan sekali, terutama jika digunakan setiap hari. Servis berkala bukan pengeluaran, melainkan investasi untuk kenyamanan dan efisiensi jangka panjang.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-4">Butuh bantuan profesional untuk servis AC Anda?</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
