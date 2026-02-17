"use client";

import React from 'react';
import { AnimatedHero } from '@/components/Hero/AnimatedHero';
import { AnimatedNavbar } from '@/components/Navbar/AnimatedNavbar';
import { Reveal } from '@/components/Reveal/Reveal';
import { BtnPrimary } from '@/components/Button/Button';
import { ServiceCard } from '@/components/ServiceCard/ServiceCard';
import { ParallaxImage } from '@/components/ParallaxImage/ParallaxImage';

/**
 * Dev Playground – Halaman demo untuk menguji semua komponen animasi.
 * Akses: http://localhost:3000/animations
 */
export default function AnimationsPlayground() {
    return (
        <div className="min-h-screen bg-secondary">
            {/* Animated Navbar */}
            <AnimatedNavbar
                links={[
                    { name: 'BERANDA', href: '/' },
                    { name: 'TENTANG', href: '#about' },
                    { name: 'LAYANAN', href: '#services' },
                    { name: 'KONTAK', href: '#contact' },
                ]}
            />

            {/* Animated Hero */}
            <AnimatedHero
                headlineLines={['Layanan Perawatan', 'Rumah Terpercaya']}
                subtitle="Platform profesional untuk perbaikan dan perawatan AC, elektronik, dan peralatan rumah tangga Anda. Tersedia di seluruh Indonesia."
                ctaLabel="Mulai Sekarang"
                ctaOnClick={() => alert('CTA clicked!')}
                secondaryLabel="Pelajari Lebih Lanjut"
                secondaryOnClick={() => alert('Secondary CTA clicked!')}
            />

            {/* Reveal Section */}
            <section id="about" className="py-20 container mx-auto px-6">
                <Reveal direction="up">
                    <h2 className="text-3xl font-bold text-dark font-heading text-center mb-4">
                        Tentang Kami
                    </h2>
                </Reveal>
                <Reveal direction="up" delay={0.15}>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto leading-relaxed mb-12">
                        PERABOX menyediakan layanan homecare profesional dengan teknisi berpengalaman dan
                        harga transparan. Kami hadir untuk memudahkan perawatan rumah Anda.
                    </p>
                </Reveal>

                {/* Parallax Image */}
                <Reveal direction="none" delay={0.25}>
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1200"
                        alt="Teknisi PERABOX"
                        multiplier={0.15}
                        clamp={[-50, 50]}
                        containerClassName="h-80 rounded-2xl"
                        className="rounded-2xl"
                    />
                </Reveal>
            </section>

            {/* Service Cards Grid */}
            <section id="services" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <Reveal direction="up">
                        <h2 className="text-3xl font-bold text-dark font-heading text-center mb-12">
                            Layanan Kami
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard
                            title="AC Cleaning"
                            description="Pembersihan AC menyeluruh untuk performa optimal dan udara lebih segar di rumah Anda."
                            imageSrc="https://images.unsplash.com/photo-1631545806609-8f27e8e1d29d?auto=format&fit=crop&q=80&w=600"
                            imageAlt="Teknisi membersihkan unit AC"
                            icon="❄️"
                            staggerIndex={0}
                            onAction={() => alert('AC Cleaning')}
                        />
                        <ServiceCard
                            title="AC Repair"
                            description="Perbaikan AC cepat dan handal oleh teknisi bersertifikat dengan garansi layanan."
                            imageSrc="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600"
                            imageAlt="Teknisi memperbaiki AC"
                            icon="🔧"
                            staggerIndex={1}
                            onAction={() => alert('AC Repair')}
                        />
                        <ServiceCard
                            title="AC Installation"
                            description="Pemasangan AC baru dengan presisi tinggi dan pengaturan optimal untuk kenyamanan maksimal."
                            imageSrc="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600"
                            imageAlt="Pemasangan unit AC baru"
                            icon="⚙️"
                            staggerIndex={2}
                            onAction={() => alert('AC Installation')}
                        />
                    </div>
                </div>
            </section>

            {/* Buttons Showcase */}
            <section className="py-20 container mx-auto px-6">
                <Reveal direction="up">
                    <h2 className="text-3xl font-bold text-dark font-heading text-center mb-12">
                        Button Microinteractions
                    </h2>
                </Reveal>

                <div className="flex flex-wrap gap-6 justify-center items-center">
                    <Reveal direction="left" delay={0}>
                        <BtnPrimary variant="primary" size="lg">
                            Primary Button
                        </BtnPrimary>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <BtnPrimary variant="outline" size="lg">
                            Outline Button
                        </BtnPrimary>
                    </Reveal>
                    <Reveal direction="right" delay={0.2}>
                        <BtnPrimary variant="ghost" size="lg">
                            Ghost Button
                        </BtnPrimary>
                    </Reveal>
                </div>

                <div className="flex flex-wrap gap-6 justify-center items-center mt-8">
                    <BtnPrimary size="sm">Small</BtnPrimary>
                    <BtnPrimary size="md">Medium</BtnPrimary>
                    <BtnPrimary size="lg">Large</BtnPrimary>
                    <BtnPrimary disabled>Disabled</BtnPrimary>
                </div>
            </section>

            {/* Reveal Directions */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-6">
                    <Reveal direction="up">
                        <h2 className="text-3xl font-bold text-dark font-heading text-center mb-12">
                            Reveal Directions
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <Reveal direction="left">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-2">← Slide dari Kiri</h3>
                                <p className="text-gray-500 text-sm">Elemen ini muncul dengan animasi dari kiri saat di-scroll ke viewport.</p>
                            </div>
                        </Reveal>
                        <Reveal direction="right">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-2">Slide dari Kanan →</h3>
                                <p className="text-gray-500 text-sm">Elemen ini muncul dengan animasi dari kanan saat di-scroll ke viewport.</p>
                            </div>
                        </Reveal>
                        <Reveal direction="up" delay={0.1}>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-2">↑ Slide dari Bawah</h3>
                                <p className="text-gray-500 text-sm">Default direction. Paling sering digunakan untuk konten utama.</p>
                            </div>
                        </Reveal>
                        <Reveal direction="down" delay={0.1}>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-2">↓ Slide dari Atas</h3>
                                <p className="text-gray-500 text-sm">Cocok untuk dropdown, notifikasi, atau elemen yang datang dari atas.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-gray-400 text-sm">
                <p>Animation System Demo — PERABOX © 2026</p>
            </footer>
        </div>
    );
}
