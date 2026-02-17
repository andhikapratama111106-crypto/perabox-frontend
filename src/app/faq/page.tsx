import Link from 'next/link';

export default function FAQPage() {
    const faqs = [
        {
            question: "Apa itu PERABOX?",
            answer: "PERABOX adalah platform homecare yang menghubungkan pengguna dengan teknisi terlatih untuk layanan perawatan AC dan rumah tangga. Kami hadir untuk memudahkan Anda mendapatkan servis profesional dengan cepat, aman, dan transparan."
        },
        {
            question: "Layanan apa saja yang tersedia di PERABOX?",
            answer: "Saat ini kami menyediakan layanan AC Cleaning (Cuci AC), AC Installation (Pemasangan AC), AC Repair (Perbaikan AC), dan Freon Refill (Isi Ulang Freon). Layanan lainnya akan segera hadir."
        },
        {
            question: "Bagaimana cara memesan layanan?",
            answer: "Anda bisa memesan layanan langsung melalui website kami dengan mengklik tombol 'Let's Start' di halaman utama. Pilih layanan yang diinginkan, tentukan jadwal, dan teknisi kami akan datang ke lokasi Anda."
        },
        {
            question: "Berapa biaya layanan PERABOX?",
            answer: "Biaya layanan bervariasi tergantung jenis servis dan kondisi AC Anda. Kami menjamin harga transparan tanpa biaya tersembunyi. Anda akan mendapatkan estimasi biaya sebelum pekerjaan dimulai."
        },
        {
            question: "Apakah teknisi PERABOX bersertifikat?",
            answer: "Ya, semua teknisi kami telah melalui proses seleksi ketat dan memiliki pengalaman di bidang servis AC. Mereka juga mendapatkan pelatihan berkala untuk memastikan kualitas layanan terbaik."
        },
        {
            question: "Berapa lama waktu pengerjaan?",
            answer: "Waktu pengerjaan bervariasi tergantung jenis layanan. Cuci AC biasanya memakan waktu 45-60 menit per unit. Pemasangan AC sekitar 2-4 jam. Perbaikan tergantung tingkat kerusakan."
        },
        {
            question: "Apakah ada garansi layanan?",
            answer: "Ya, kami memberikan garansi untuk setiap layanan yang dilakukan. Jika terjadi masalah setelah servis, Anda bisa menghubungi kami dan teknisi akan kembali untuk pengecekan ulang tanpa biaya tambahan."
        },
        {
            question: "Area mana saja yang dilayani PERABOX?",
            answer: "Saat ini PERABOX melayani area Jabodetabek dan sekitarnya. Kami terus memperluas jangkauan layanan ke kota-kota lain di Indonesia."
        },
        {
            question: "Bagaimana metode pembayaran yang tersedia?",
            answer: "Kami menerima pembayaran melalui QRIS, transfer bank, dan pembayaran tunai langsung kepada teknisi setelah pekerjaan selesai."
        },
        {
            question: "Bagaimana jika saya perlu membatalkan pesanan?",
            answer: "Anda dapat membatalkan pesanan sebelum teknisi berangkat ke lokasi Anda tanpa dikenakan biaya. Hubungi customer service kami melalui WhatsApp untuk proses pembatalan."
        },
    ];

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
                        Pertanyaan yang Sering Diajukan
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Temukan jawaban untuk pertanyaan umum seputar layanan PERABOX.
                    </p>
                </div>
            </div>

            {/* FAQ List */}
            <div className="container mx-auto px-6 py-16 max-w-3xl">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 md:p-8 hover:bg-gray-50 transition-colors list-none">
                                <h3 className="font-bold text-dark text-lg pr-4">{faq.question}</h3>
                                <svg className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 md:px-8 md:pb-8">
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16 bg-secondary rounded-2xl p-10">
                    <p className="text-gray-600 mb-2">Masih punya pertanyaan?</p>
                    <p className="text-dark font-bold text-lg mb-6">Hubungi kami, kami siap membantu!</p>
                    <Link href="/contact" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </main>
    );
}
