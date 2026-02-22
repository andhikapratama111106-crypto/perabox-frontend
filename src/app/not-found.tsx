"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-secondary flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-6 py-24">
                <div className="text-center max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-9xl font-extrabold text-primary animate-pulse">404</h1>
                        <div className="mt-4 w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-dark mb-6"
                    >
                        Ups! Halaman tidak ditemukan.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 text-lg mb-12"
                    >
                        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                        Mari kembali ke jalur yang benar.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href="/"
                            className="inline-block bg-primary hover:bg-primary/90 text-white font-extrabold px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                        >
                            Kembali ke Beranda
                        </Link>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
