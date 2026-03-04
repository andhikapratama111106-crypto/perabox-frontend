import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog & Tips AC | PERABOX',
    description: 'Tips merawat AC, panduan servis rutin, dan artikel edukatif tentang AC dari teknisi profesional PERABOX.',
    keywords: ['tips AC', 'cara merawat AC', 'blog homecare', 'panduan AC', 'servis AC mandiri'],
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Blog & Tips AC | PERABOX',
        description: 'Tips dan panduan perawatan AC dari teknisi berpengalaman.',
        url: 'https://perabox.vercel.app/blog',
        type: 'website',
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
