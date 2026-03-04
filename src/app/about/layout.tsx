import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tentang Kami | PERABOX',
    description: 'PERABOX — platform homecare terpercaya di Indonesia. 10.000+ pelanggan puas, 120+ teknisi bersertifikat, rating Google 4.7/5.',
    keywords: ['tentang PERABOX', 'homecare Indonesia', 'teknisi AC', 'perawatan rumah'],
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'Tentang PERABOX | Platform Homecare Terpercaya',
        description: '10.000+ pelanggan puas. Teknisi bersertifikat di seluruh Jabodetabek.',
        url: 'https://perabox.vercel.app/about',
        type: 'website',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
