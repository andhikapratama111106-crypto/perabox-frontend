"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        serviceType: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const serviceOptions = [
        "AC Cleaning",
        "AC Installation",
        "AC Repair",
        "Freon Refill",
        "Lainnya",
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
                        Feedback
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Pendapat Anda sangat berarti bagi kami untuk terus meningkatkan kualitas layanan.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 max-w-2xl">
                {submitted ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-dark mb-3">Terima Kasih!</h2>
                        <p className="text-gray-600 text-lg mb-2">Feedback Anda telah kami terima.</p>
                        <p className="text-gray-500 mb-8">Kami akan menggunakan masukan Anda untuk meningkatkan layanan kami.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/" className="bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                                Kembali ke Beranda
                            </Link>
                            <button
                                onClick={() => { setSubmitted(false); setRating(0); setFormData({ name: '', email: '', serviceType: '', message: '' }); }}
                                className="bg-white border-2 border-dark text-dark hover:bg-dark hover:text-white px-8 py-3 rounded-full text-sm font-medium transition-colors"
                            >
                                Kirim Feedback Lagi
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-dark mb-2">Berikan Penilaian Anda</h2>
                        <p className="text-gray-500 mb-8">Bagaimana pengalaman Anda menggunakan layanan PERABOX?</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Star Rating */}
                            <div>
                                <label className="block text-sm font-medium text-dark mb-3">Rating Keseluruhan</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <svg
                                                className={`w-10 h-10 ${star <= (hoverRating || rating)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-200'
                                                    } transition-colors`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                    {rating > 0 && (
                                        <span className="text-sm text-gray-500 ml-2 self-center">
                                            {rating === 1 && "Kurang"}
                                            {rating === 2 && "Cukup"}
                                            {rating === 3 && "Baik"}
                                            {rating === 4 && "Sangat Baik"}
                                            {rating === 5 && "Luar Biasa!"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-dark mb-1.5">Nama</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        placeholder="Nama Anda (opsional)"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        placeholder="Email (opsional)"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark mb-1.5">Layanan yang Digunakan</label>
                                <select
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
                                >
                                    <option value="">Pilih layanan</option>
                                    {serviceOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark mb-1.5">Komentar / Saran</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                                    placeholder="Ceritakan pengalaman Anda atau berikan saran untuk kami..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                            >
                                Kirim Feedback
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
}
