import Link from 'next/link';

const articles = [
    {
        title: "Peralatan Perawatan AC: Wajib Dimiliki untuk Menjaga AC Tetap Optimal",
        date: "November 22, 2023",
        image: "/article_handyman.png",
        slug: "/blog/peralatan-perawatan-ac",
        category: "Tips & Trik",
        position: "center",
    },
    {
        title: "Tahukah Anda? AC Anda \"Menangis\" Saat Terlalu Terbebani",
        date: "August 20, 2023",
        image: "/article_ac_broken.png",
        slug: "/blog/ac-menangis",
        category: "Edukasi",
        position: "top",
    },
    {
        title: "Cara Memperbaiki AC yang Rusak: Langkah Mudah yang Bisa Anda Coba di Rumah",
        date: "August 8, 2023",
        image: "/article_ac_unit.png",
        slug: "/blog/cara-memperbaiki-ac",
        category: "DIY",
        position: "bottom",
    },
    {
        title: "Kenapa AC Harus Diservis Rutin? Ini 5 Alasan Pentingnya",
        date: "July 15, 2023",
        image: "/cover_servis_rutin.png",
        slug: "/blog/servis-rutin-ac",
        category: "Edukasi",
        position: "top",
    },
    {
        title: "Perbedaan AC Inverter dan Non-Inverter: Mana yang Lebih Hemat?",
        date: "July 2, 2023",
        image: "/cover_inverter.png",
        slug: "/blog/ac-inverter-vs-non-inverter",
        category: "Panduan",
        position: "center",
    },
    {
        title: "Panduan Memilih PK AC yang Tepat Sesuai Ukuran Ruangan",
        date: "June 20, 2023",
        image: "/cover_pk_ac.png",
        slug: "/blog/panduan-pk-ac",
        category: "Edukasi",
        position: "center",
    },
    {
        title: "Bahaya Freon Bocor: Tanda-Tanda dan Cara Mengatasinya",
        date: "June 5, 2023",
        image: "/cover_freon_bocor.png",
        slug: "/blog/bahaya-freon-bocor",
        category: "Peringatan",
        position: "center",
    },
    {
        title: "Mengapa AC Anda Berbau? Penyebab dan Solusinya",
        date: "May 18, 2023",
        image: "/cover_ac_bau.png",
        slug: "/blog/ac-berbau",
        category: "Edukasi",
        position: "top",
    },
    {
        title: "Tips Merawat AC Agar Tetap Awet Selama Bertahun-Tahun",
        date: "May 1, 2023",
        image: "/cover_rawat_ac.png",
        slug: "/blog/tips-merawat-ac",
        category: "Tips & Trik",
        position: "top",
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-20">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        Blog & Artikel
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Temukan informasi terbaru seputar perawatan AC, tips hemat listrik, dan panduan rumah tangga dari tim PERABOX.
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <Link
                            key={index}
                            href={article.slug}
                            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${article.slug === '#' ? 'pointer-events-none' : ''
                                }`}
                        >
                            <div className="relative h-52 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${article.image})`, backgroundPosition: article.position || 'center' }}
                                ></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                                {article.slug === '#' && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="bg-white/90 text-dark text-xs font-bold px-4 py-2 rounded-full">
                                            Segera Hadir
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-dark text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-xs text-gray-400">{article.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
