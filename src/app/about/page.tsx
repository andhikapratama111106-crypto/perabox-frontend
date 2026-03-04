"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';

const timeline = [
    { year: '2022', title: 'PERABOX Berdiri', desc: 'Dimulai dari garasi kecil dengan 3 teknisi dan visi besar untuk mengubah industri homecare di Indonesia.' },
    { year: '2023', title: 'Ekspansi Jabodetabek', desc: 'Bergabung dengan 50+ teknisi bersertifikat. Melayani lebih dari 5.000 pelanggan di seluruh Jabodetabek.' },
    { year: '2024', title: 'Platform Digital', desc: 'Meluncurkan platform digital perabox.id. Meraih lebih dari 10.000 pelanggan & rating Google 4.7/5.' },
    { year: '2025', title: 'Ekspansi Kota Baru', desc: 'Memperluas jangkauan ke Bandung, Surabaya, dan kota-kota besar lainnya di seluruh Indonesia.' },
];

const values = [
    { icon: '🏆', title: 'Profesionalisme', desc: 'Teknisi bersertifikat dengan standar kerja tertinggi di industri.' },
    { icon: '🔒', title: 'Keamanan', desc: 'Teknisi terverifikasi identitasnya sebelum masuk ke rumah Anda.' },
    { icon: '💯', title: 'Kualitas', desc: 'Garansi 30 hari untuk setiap pekerjaan. Tidak puas, kami kembali.' },
    { icon: '❤️', title: 'Kepedulian', desc: 'Kami peduli pada kenyamanan dan kesejahteraan semua pelanggan.' },
];

const team = [
    { name: 'Budi Santoso', role: 'CEO & Founder', initial: 'B', bg: '#8B5E3C' },
    { name: 'Rina Wijaya', role: 'Head of Operations', initial: 'R', bg: '#D4A373' },
    { name: 'Dimas Ardian', role: 'Lead Technician', initial: 'D', bg: '#B07D56' },
    { name: 'Sari Pertiwi', role: 'Customer Experience', initial: 'S', bg: '#A67C5B' },
];

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-light">
            {/* Hero Header */}
            <div className="bg-dark text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'radial-gradient(circle, #D4A373 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-4">
                        Tentang Kami
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6">
                        Kami Hadir untuk<br />
                        <span className="text-accent italic">Rumah yang Lebih Baik</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl font-body leading-relaxed">
                        PERABOX adalah platform homecare terpercaya yang menghubungkan pemilik rumah dengan teknisi profesional bersertifikat di Indonesia.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Reveal direction="left">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 text-2xl">🎯</div>
                            <h2 className="text-2xl font-display font-bold text-dark mb-4">Misi Kami</h2>
                            <p className="text-gray-600 font-body leading-relaxed">
                                Menyederhanakan akses ke layanan perawatan rumah yang berkualitas untuk setiap keluarga Indonesia. Kami percaya setiap rumah berhak mendapat perawatan terbaik dengan harga yang adil dan transparan.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal direction="right">
                        <div className="bg-primary text-white rounded-3xl p-8 shadow-xl">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-2xl">🌟</div>
                            <h2 className="text-2xl font-display font-bold mb-4">Visi Kami</h2>
                            <p className="text-white/80 font-body leading-relaxed">
                                Menjadi platform homecare #1 di Asia Tenggara. Membangun ekosistem yang menguntungkan teknisi, pelanggan, dan masyarakat sekitar secara berkelanjutan.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Stats */}
            <section className="container mx-auto px-6 pb-16">
                <Reveal direction="up">
                    <div className="bg-secondary rounded-3xl p-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { val: '10.000+', label: 'Pelanggan Puas' },
                                { val: '120+', label: 'Teknisi Aktif' },
                                { val: '4.7 ⭐', label: 'Rating Google' },
                                { val: '3+', label: 'Tahun Pengalaman' },
                            ].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
                                    <p className="text-4xl font-stat font-bold text-primary mb-2">{stat.val}</p>
                                    <p className="text-sm text-gray-600 font-body">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Timeline */}
            <section className="container mx-auto px-6 pb-16">
                <Reveal direction="up">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full">Perjalanan Kami</span>
                        <h2 className="text-3xl font-display font-bold text-dark mt-4">Dari Garasi ke Platform Nasional</h2>
                    </div>
                </Reveal>
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-0.5 md:-translate-x-px" />
                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <Reveal key={item.year} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1 * index}>
                                <div className={`relative flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} pl-20 md:pl-0`}>
                                    {/* Year dot */}
                                    <div className="absolute left-6 md:left-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-md md:-translate-x-2.5 top-6" />
                                    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8'}`}>
                                        <span className="text-xs font-stat font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{item.year}</span>
                                        <h3 className="text-lg font-display font-bold text-dark mt-3 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm font-body leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <Reveal direction="up">
                        <div className="text-center mb-12">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full">Nilai-Nilai Kami</span>
                            <h2 className="text-3xl font-display font-bold text-dark mt-4">Yang Kami Junjung Tinggi</h2>
                        </div>
                    </Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <Reveal key={v.title} direction="up" delay={0.1 * i}>
                                <div className="text-center p-6 rounded-2xl bg-secondary hover:shadow-md transition-shadow">
                                    <div className="text-4xl mb-4">{v.icon}</div>
                                    <h3 className="font-display font-bold text-dark mb-2">{v.title}</h3>
                                    <p className="text-sm text-gray-600 font-body leading-relaxed">{v.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="container mx-auto px-6 py-16">
                <Reveal direction="up">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full">Tim Kami</span>
                        <h2 className="text-3xl font-display font-bold text-dark mt-4">Orang-Orang di Balik PERABOX</h2>
                    </div>
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <Reveal key={member.name} direction="up" delay={0.1 * i}>
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg" style={{ backgroundColor: member.bg }}>
                                    {member.initial}
                                </div>
                                <h3 className="font-display font-bold text-dark text-sm">{member.name}</h3>
                                <p className="text-xs text-gray-500 font-body">{member.role}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 pb-16">
                <Reveal direction="up">
                    <div className="bg-dark rounded-3xl p-10 text-center text-white">
                        <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-4">Bergabunglah dengan 10.000+ Keluarga Puas 🏠</h2>
                        <p className="text-gray-400 font-body mb-8 max-w-lg mx-auto">Pesan layanan pertama Anda sekarang dan rasakan perbedaan layanan profesional PERABOX.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/book" className="bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-colors">
                                Pesan Sekarang →
                            </Link>
                            <Link href="/contact" className="bg-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors border border-white/20">
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
