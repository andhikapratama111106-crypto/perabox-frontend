"use client";

import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/Reveal/Reveal';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const Discover = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const articles = [
        {
            title: t('discover.article1Title'),
            date: t('discover.article1Date'),
            image: "/article_handyman.png",
            slug: "/blog/peralatan-perawatan-ac",
        },
        {
            title: t('discover.article2Title'),
            date: t('discover.article2Date'),
            image: "/article_ac_broken.png",
            slug: "/blog/ac-menangis",
        },
        {
            title: t('discover.article3Title'),
            date: t('discover.article3Date'),
            image: "/article_ac_unit.png",
            slug: "/blog/cara-memperbaiki-ac",
        }
    ];

    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <Reveal direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">{t('discover.sectionTitle')}</h2>
                        <p className="text-gray-500 text-sm">{t('discover.description')}</p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {articles.map((article, index) => (
                        <Reveal key={index} direction="up" delay={index * 0.15}>
                            <div
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer block group"
                                onClick={() => article.slug !== "#" && router.push(article.slug)}
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-dark mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">{article.title}</h3>
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
                            {t('discover.buttonText')}
                        </button>
                    </div>
                </Reveal>
            </div >
        </section >
    );
};

export default Discover;
