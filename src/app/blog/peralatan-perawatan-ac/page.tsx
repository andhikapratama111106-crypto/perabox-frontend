
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
                        Peralatan Perawatan AC: Wajib Dimiliki untuk Menjaga AC Tetap Optimal
                    </h1>
                    <p className="text-gray-400 text-sm mt-4">November 22, 2023</p>
                </div>
            </div>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16 max-w-3xl">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    AC yang terawat bukan hanya membuat ruangan lebih sejuk, tetapi juga membantu menghemat listrik dan memperpanjang usia unit. Untuk melakukan perawatan dasar di rumah, ada beberapa peralatan penting yang sebaiknya tersedia.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Berikut daftar peralatan perawatan AC yang direkomendasikan.
                </p>

                {/* Item 1 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">1. Obeng (+) dan (–)</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Obeng digunakan untuk membuka panel AC saat membersihkan filter atau melakukan pengecekan ringan. Pilih obeng dengan ukuran yang sesuai agar tidak merusak baut.
                    </p>
                </div>

                {/* Item 2 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">2. Kuas Halus atau Sikat Lembut</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Digunakan untuk membersihkan debu pada bagian:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                        <li>Filter udara</li>
                        <li>Kisi-kisi ventilasi</li>
                        <li>Area evaporator ringan</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Sikat yang terlalu kasar dapat merusak komponen, jadi gunakan yang berbulu halus.
                    </p>
                </div>

                {/* Item 3 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">3. Vacuum Cleaner (Opsional tetapi Direkomendasikan)</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Vacuum cleaner kecil atau portable sangat membantu untuk menyedot debu dari:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                        <li>Filter</li>
                        <li>Sirip evaporator</li>
                        <li>Area sekitar unit indoor</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Alat ini mempercepat proses pembersihan dan hasilnya lebih maksimal dibanding hanya menggunakan kuas.
                    </p>
                </div>

                {/* Item 4 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">4. Cairan Pembersih AC (AC Cleaner Spray)</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        AC cleaner spray membantu membersihkan kotoran membandel dan membunuh bakteri pada evaporator.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Pastikan menggunakan cairan khusus AC yang aman untuk komponen aluminium.
                    </p>
                </div>

                {/* Item 5 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">5. Lap Microfiber</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Lap microfiber efektif untuk:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                        <li>Membersihkan permukaan unit</li>
                        <li>Mengeringkan filter setelah dicuci</li>
                        <li>Mengelap area sekitar AC</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Tidak meninggalkan serat dan aman untuk permukaan plastik maupun metal.
                    </p>
                </div>

                {/* Item 6 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">6. Ember dan Air Bersih</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Digunakan untuk mencuci filter AC secara manual. Pastikan filter benar-benar kering sebelum dipasang kembali untuk mencegah bau apek.
                    </p>
                </div>

                {/* Item 7 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">7. Tangga Kecil atau Step Stool</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Karena AC biasanya terpasang di bagian atas dinding, tangga kecil sangat membantu agar proses pembersihan lebih aman dan stabil.
                    </p>
                </div>

                {/* Item 8 */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-dark mb-3">8. Alat Cek Listrik (Test Pen)</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Untuk memastikan aliran listrik sudah mati sebelum melakukan pembersihan. Keselamatan harus selalu menjadi prioritas.
                    </p>
                </div>

                {/* Pro Section */}
                <div className="bg-secondary rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-bold text-dark mb-4">Peralatan Khusus (Untuk Teknisi Profesional)</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Beberapa alat berikut tidak disarankan digunakan tanpa keahlian khusus:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                        <li>Manifold gauge (alat ukur tekanan freon)</li>
                        <li>Vacuum pump</li>
                        <li>Jet washer khusus AC</li>
                        <li>Multimeter profesional</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Peralatan ini biasanya digunakan saat servis menyeluruh, pengisian freon, atau perbaikan teknis.
                    </p>
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
