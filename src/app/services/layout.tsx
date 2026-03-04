import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Layanan AC & Homecare | PERABOX',
    description: 'Cuci AC mulai Rp 85.000, Pasang AC, Perbaikan AC, dan Isi Freon. Teknisi bersertifikat, garansi 30 hari. Pesan sekarang!',
    keywords: ['cuci AC', 'pasang AC', 'servis AC', 'perbaikan AC', 'isi freon', 'homecare Jakarta'],
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'Layanan AC & Homecare Profesional | PERABOX',
        description: 'Cuci AC mulai Rp 85.000. Teknisi bersertifikat, garansi 30 hari, respons cepat.',
        url: 'https://perabox.vercel.app/services',
        type: 'website',
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
