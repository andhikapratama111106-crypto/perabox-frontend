import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal/Reveal';

const Services = () => {
    const [activeTab, setActiveTab] = useState(0);

    const services = [
        {
            title: "AC Cleaning",
            image: "/ac_cleaning.jpg",
            headline: "Servis Cuci AC Profesional untuk Udara Lebih Sehat & Dingin Maksimal",
            description: "Layanan pembersihan AC menyeluruh untuk menghilangkan debu, kotoran, jamur, dan bakteri yang menumpuk pada filter, evaporator, dan unit outdoor. Proses dilakukan dengan alat khusus agar AC kembali bekerja optimal, lebih hemat listrik, dan bebas bau tidak sedap.",
            features: [
                "Pembersihan filter & evaporator",
                "Pembersihan unit outdoor",
                "Cek tekanan freon",
                "Pemeriksaan kelistrikan dasar",
            ],
        },
        {
            title: "AC Installation",
            image: "/ac_installation.jpg",
            headline: "Pemasangan AC Aman, Presisi & Standar Teknis",
            description: "Instalasi AC dilakukan oleh teknisi berpengalaman dengan pemasangan yang rapi dan sesuai standar keamanan. Kami memastikan posisi unit indoor dan outdoor optimal untuk sirkulasi udara dan performa maksimal.",
            features: [
                "Pemasangan unit indoor & outdoor",
                "Pemasangan pipa & kabel standar",
                "Vakum instalasi",
                "Tes fungsi & kebocoran",
            ],
        },
        {
            title: "AC Repair",
            image: "/ac_repair.jpg",
            headline: "Perbaikan AC Cepat & Tepat Sasaran",
            description: "Mengatasi berbagai masalah AC seperti AC bocor, tidak dingin, berisik, atau mati total. Teknisi kami akan melakukan diagnosa mendalam untuk menemukan sumber masalah dan memberikan solusi perbaikan yang efektif.",
            features: [
                "Pengecekan kebocoran & kerusakan",
                "Penggantian sparepart original",
                "Perbaikan modul elektronik",
                "Garansi servis",
            ],
        },
        {
            title: "Freon Refill",
            image: "/freon_refill.jpg",
            headline: "Isi Ulang Freon Berkualitas",
            description: "Layanan penambahan atau pengisian ulang freon (refrigerant) untuk mengembalikan kinerja pendinginan AC Anda. Kami menggunakan jenis freon yang sesuai dengan spesifikasi AC (R32, R410A, R22) agar AC kembali dingin maksimal.",
            features: [
                "Cek tekanan freon eksisting",
                "Pengisian freon R32/R410A/R22",
                "Cek kebocoran instalasi pipa",
                "Optimalisasi suhu output",
            ],
        },
    ];

    const active = services[activeTab];

    return (
        <section id="services" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16 md:mb-20">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-3 block">Our Services</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">What Can We Do For You?</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
                    </div>
                </Reveal>

                {/* Service Tabs */}
                <Reveal delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {services.map((service, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`group relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-square transition-all duration-300 cursor-pointer border-2 ${activeTab === index ? 'border-primary ring-2 ring-primary/30 scale-105 shadow-xl z-10' : 'border-transparent hover:border-accent/50 hover:scale-105'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-white font-bold text-lg md:text-xl text-left drop-shadow-md">{service.title}</h4>
                                    {activeTab === index && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="w-8 h-1 bg-primary rounded-full mt-2"
                                        />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Service Detail Panel — smooth crossfade */}
                <Reveal direction="up" delay={0.2}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="flex flex-col md:flex-row md:h-[580px]">
                            {/* Detail Image — crossfade with absolute positioning */}
                            <div className="w-full md:w-1/2 relative h-[280px] md:h-full overflow-hidden flex-shrink-0">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={`img-${activeTab}`}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${active.image})` }}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none"></div>
                            </div>

                            {/* Detail Text — crossfade (no layout shift) */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 relative overflow-hidden flex-shrink-0 flex items-center min-h-[500px] md:min-h-0">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                    >
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                            {active.title}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4 leading-tight">
                                            {active.headline}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {active.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {active.features.map((feat, i) => (
                                                <motion.li
                                                    key={`${activeTab}-${i}`}
                                                    className="flex items-start gap-3 text-gray-700"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                                                >
                                                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feat}
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href="/book"
                                                className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-primary/30 active:scale-95 text-center"
                                            >
                                                Pesan Sekarang
                                            </Link>
                                            <button className="border-2 border-primary/20 text-primary hover:bg-primary/5 font-bold py-3.5 px-8 rounded-full transition-all active:scale-95">
                                                Detail Layanan
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Services;
