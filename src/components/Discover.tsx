"use client";

import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal/Reveal';

const Discover = () => {
    const router = useRouter();
    const articles = [
        {
            title: "Peralatan Perawatan AC: Wajib Dimiliki untuk Menjaga AC Tetap Optimal",
            date: "November 22, 2023",
            image: "/article_handyman.png",
            slug: "/blog/peralatan-perawatan-ac",
            position: "center"
        },
        {
            title: "Tahukah Anda? AC Anda \"Menangis\" Saat Terlalu Terbebani",
            date: "August 20, 2023",
            image: "/article_ac_broken.png",
            slug: "/blog/ac-menangis",
            position: "top"
        },
        {
            title: "Cara Memperbaiki AC yang Rusak: Langkah Mudah yang Bisa Anda Coba di Rumah",
            date: "August 8, 2023",
            image: "/article_ac_unit.png",
            slug: "/blog/cara-memperbaiki-ac",
            position: "bottom"
        }
    ];

    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <Reveal direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Let&apos;s Discover</h2>
                        <p className="text-gray-500 text-sm">Explore newest and most updated informations here!</p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {articles.map((article, index) => (
                        <Reveal key={index} direction="up" delay={index * 0.15} staggerIndex={index} staggerDelay={100}>
                            <div
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer block"
                                onClick={() => article.slug !== "#" && router.push(article.slug)}
                            >
                                <div className="h-48 bg-cover" style={{ backgroundImage: `url(${article.image})`, backgroundPosition: article.position || 'center' }}></div>
                                <div className="p-6">
                                    <h3 className="font-bold text-dark mb-2 line-clamp-2 min-h-[3rem]">{article.title}</h3>
                                    <p className="text-xs text-gray-400">{article.date}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal direction="up" delay={0.4}>
                    <div className="text-center">
                        <button
                            onClick={() => router.push('/blog')}
                            className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors"
                        >
                            Visit All
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Discover;
