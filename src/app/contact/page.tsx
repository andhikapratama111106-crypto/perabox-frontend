"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';

const contactMethods = [
    {
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        label: 'WhatsApp',
        value: '+62 877-7426-6360',
        badge: '⚡ Respons Tercepat',
        badgeBg: 'bg-green-100 text-green-700',
        color: 'bg-[#25D366]/10 text-[#25D366]',
        href: 'https://wa.me/6287774266360?text=Halo+PERABOX,+saya+ingin+bertanya',
        note: 'Tersedia 07:00 – 22:00 WIB',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'Email',
        value: 'hello@perabox.com',
        badge: null,
        badgeBg: '',
        color: 'bg-primary/10 text-primary',
        href: 'mailto:hello@perabox.com',
        note: 'Balasan dalam 1×24 jam',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        label: 'Telepon',
        value: '+62 877-7426-6360',
        badge: null,
        badgeBg: '',
        color: 'bg-blue-100 text-blue-600',
        href: 'tel:+6287774266360',
        note: 'Senin – Sabtu, 08:00 – 20:00 WIB',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: 'Alamat',
        value: 'Jakarta, Indonesia',
        badge: null,
        badgeBg: '',
        color: 'bg-orange-100 text-orange-600',
        href: 'https://maps.google.com/?q=Jakarta,Indonesia',
        note: 'Area layanan: Jabodetabek',
    },
];

const faqs = [
    { q: 'Berapa lama teknisi tiba?', a: 'Rata-rata 30–60 menit setelah konfirmasi booking. Untuk luar jam sibuk, biasanya lebih cepat.' },
    { q: 'Apakah ada garansi layanan?', a: 'Ya! Semua layanan bergaransi 30 hari. Jika ada masalah setelah servis, kami kembali tanpa biaya tambahan.' },
    { q: 'Metode pembayaran apa yang diterima?', a: 'Kami menerima transfer bank, QRIS, GoPay, OVO, Dana, dan kartu kredit/debit.' },
    { q: 'Apakah teknisi terverifikasi?', a: 'Ya. Semua teknisi kami sudah melalui seleksi ketat, pelatihan bersertifikat, dan verifikasi identitas.' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #D4A373 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40" />
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Kembali ke Beranda
                    </Link>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">Hubungi Kami</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight">
                        Ada yang Perlu<br />
                        <span className="text-accent italic">Dibantu?</span>
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl font-body">Tim kami siap membantu Anda 7 hari seminggu. Pilih cara yang paling nyaman untuk Anda.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">

                {/* Quick Contact Methods */}
                <Reveal direction="up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {contactMethods.map((method, i) => (
                            <motion.a
                                key={i}
                                href={method.href}
                                target={method.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 block"
                            >
                                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mb-4`}>
                                    {method.icon}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-display font-bold text-dark">{method.label}</h3>
                                    {method.badge && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${method.badgeBg}`}>{method.badge}</span>
                                    )}
                                </div>
                                <p className="font-medium text-dark text-sm mb-1">{method.value}</p>
                                <p className="text-xs text-gray-500 font-body">{method.note}</p>
                            </motion.a>
                        ))}
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Contact Form */}
                    <Reveal direction="left">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-dark mb-2">Pesan Terkirim! 🎉</h3>
                                    <p className="text-gray-600 font-body mb-6">Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 1×24 jam.</p>
                                    <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="text-primary font-bold hover:underline">
                                        Kirim pesan lagi
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-display font-bold text-dark mb-6">Kirim Pesan</h2>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-dark mb-1.5">Nama Lengkap</label>
                                                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-body" placeholder="Nama lengkap" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-dark mb-1.5">Email</label>
                                                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-body" placeholder="email@contoh.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-dark mb-1.5">No. Telepon / WA</label>
                                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-body" placeholder="08xxxxxxxxxx" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-dark mb-1.5">Subjek</label>
                                            <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-body" placeholder="Topik pesan Anda" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-dark mb-1.5">Pesan</label>
                                            <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none font-body" placeholder="Tulis pesan Anda di sini..." />
                                        </div>
                                        <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-display font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                                            Kirim Pesan →
                                        </button>
                                        <p className="text-xs text-gray-400 text-center font-body">
                                            Atau langsung chat via{' '}
                                            <a href="https://wa.me/6287774266360" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">WhatsApp</a>
                                            {' '}untuk respons lebih cepat
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </Reveal>

                    {/* FAQ Accordion */}
                    <Reveal direction="right">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-dark mb-6">Pertanyaan Umum</h2>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-display font-bold text-dark text-sm">{faq.q}</span>
                                            <motion.svg
                                                animate={{ rotate: openFaq === i ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-5 h-5 text-primary flex-shrink-0"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-6 pb-4"
                                            >
                                                <p className="text-sm text-gray-600 font-body leading-relaxed">{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 p-6 bg-secondary rounded-2xl">
                                <h3 className="font-display font-bold text-dark mb-4">Ikuti Kami</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { name: 'Instagram', icon: '📸', href: 'https://instagram.com/perabox' },
                                        { name: 'Facebook', icon: '👍', href: 'https://facebook.com/perabox' },
                                        { name: 'YouTube', icon: '▶️', href: 'https://youtube.com/@perabox' },
                                        { name: 'TikTok', icon: '🎵', href: 'https://tiktok.com/@perabox' },
                                    ].map((s) => (
                                        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-dark hover:bg-primary hover:text-white transition-colors shadow-sm border border-gray-100">
                                            <span>{s.icon}</span> {s.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}
