
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
                        Cara Memperbaiki AC yang Rusak: Langkah Mudah yang Bisa Anda Coba di Rumah
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">August 8, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    AC tiba-tiba tidak dingin? Mengeluarkan suara aneh? Atau bahkan tidak menyala sama sekali?
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Sebelum panik dan langsung memanggil teknisi, ada beberapa langkah sederhana yang bisa Anda coba sendiri di rumah.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-10 font-medium">
                    Namun ingat, lakukan dengan hati-hati dan prioritaskan keselamatan.
                </p>

                {/* Step 1 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">1. Periksa Sumber Listrik</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Langkah pertama yang paling sederhana:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                        <li>Pastikan AC terhubung ke listrik.</li>
                        <li>Periksa MCB atau panel listrik, mungkin terjadi trip.</li>
                        <li>Coba nyalakan kembali setelah 5–10 menit.</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">Terkadang masalahnya hanya gangguan listrik ringan.</p>
                </div>

                {/* Step 2 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">2. Cek Remote dan Pengaturan Suhu</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Masalah yang sering terjadi:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                        <li>Baterai remote habis</li>
                        <li>Mode AC tidak diatur ke &quot;Cool&quot;</li>
                        <li>Suhu terlalu tinggi</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mb-2">Pastikan:</p>
                    <ul className="text-gray-700 space-y-1 ml-4">
                        <li>✅ Mode diatur ke Cool</li>
                        <li>✅ Suhu diatur 24–26°C</li>
                        <li>✅ Baterai remote masih berfungsi</li>
                    </ul>
                </div>

                {/* Step 3 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">3. Bersihkan Filter AC</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Filter yang kotor bisa membuat AC:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                        <li>Tidak dingin</li>
                        <li>Berbau</li>
                        <li>Mengeluarkan air berlebihan</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mb-3 font-medium">Cara membersihkan:</p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4 mb-3">
                        <li>Matikan AC dan cabut listrik.</li>
                        <li>Buka panel depan.</li>
                        <li>Lepaskan filter.</li>
                        <li>Cuci dengan air bersih.</li>
                        <li>Keringkan sepenuhnya sebelum dipasang kembali.</li>
                    </ol>
                    <p className="text-gray-700 leading-relaxed">Lakukan setiap 2–4 minggu sekali.</p>
                </div>

                {/* Step 4 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">4. Periksa Apakah Ada Es pada Pipa</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Jika Anda melihat bunga es pada pipa, kemungkinan penyebabnya:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                        <li>Filter sangat kotor</li>
                        <li>Freon bermasalah</li>
                        <li>Sirkulasi udara terganggu</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mb-2 font-medium">Solusi awal:</p>
                    <p className="text-gray-700 leading-relaxed">
                        Matikan AC selama beberapa jam hingga es mencair, lalu bersihkan filter. Jika masalah berlanjut, jangan menyalakan AC kembali sebelum diperiksa teknisi.
                    </p>
                </div>

                {/* Step 5 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">5. Cek Saluran Pembuangan Air</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">AC yang menetes biasanya disebabkan oleh:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                        <li>Selang drain tersumbat</li>
                        <li>Jalur pembuangan tertekuk</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Pastikan air bisa mengalir dengan lancar melalui selang pembuangan.
                    </p>
                </div>

                {/* Step 6 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">6. Dengarkan Suara Tidak Normal</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Jika AC berbunyi:</p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6 mb-3">
                        <ul className="space-y-2 text-gray-700">
                            <li>⚠️ Berisik keras</li>
                            <li>⚠️ Berdengung tidak wajar</li>
                            <li>⚠️ Bergetar berlebihan</li>
                        </ul>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                        Segera matikan AC. Ini bisa menandakan masalah pada kipas, motor, atau kompresor.
                    </p>
                </div>

                {/* When NOT to DIY */}
                <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-8 mb-10">
                    <h2 className="text-xl font-bold text-dark mb-4">Kapan Tidak Boleh Diperbaiki Sendiri?</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Hindari membongkar bagian dalam jika:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                        <li>AC tidak dingin sama sekali meski sudah dibersihkan</li>
                        <li>Tercium bau terbakar</li>
                        <li>Kompresor mati total</li>
                        <li>Perlu pengisian freon</li>
                        <li>Ada masalah kelistrikan</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4 font-medium">
                        Kesalahan penanganan bisa menyebabkan kerusakan lebih parah dan biaya lebih mahal.
                    </p>
                </div>

                {/* Tips */}
                <div className="bg-green-50 border-l-4 border-green-400 rounded-xl p-8 mb-10">
                    <h2 className="text-xl font-bold text-dark mb-4">Tips Agar AC Tidak Cepat Rusak</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li>✅ Bersihkan filter rutin</li>
                        <li>✅ Jangan set suhu terlalu rendah dalam waktu lama</li>
                        <li>✅ Servis profesional setiap 3–4 bulan</li>
                        <li>✅ Pastikan outdoor unit tidak tertutup debu atau barang</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        Perawatan rutin jauh lebih murah dibanding perbaikan besar.
                    </p>
                </div>

                {/* Conclusion */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">Kesimpulan</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Beberapa masalah AC memang bisa ditangani sendiri dengan langkah sederhana. Namun jika kerusakan lebih serius, jangan ambil risiko.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-medium">
                        Menghubungi teknisi profesional adalah pilihan paling aman untuk menjaga AC tetap awet dan rumah tetap nyaman.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-2">Butuh bantuan servis AC?</p>
                    <p className="text-gray-700 font-medium mb-6">PERABOX siap membantu dengan teknisi berpengalaman dan layanan transparan.</p>
                    <Link href="/#services" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Lihat Layanan Kami
                    </Link>
                </div>
            </article>
        </main>
    );
}
