import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hubungi Kami | PERABOX',
    description: 'Hubungi PERABOX via WhatsApp, Email, atau Telepon. Tim kami tersedia 7 hari seminggu, 07:00–22:00 WIB.',
    keywords: ['kontak PERABOX', 'WhatsApp PERABOX', 'customer service homecare'],
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Hubungi Kami | PERABOX',
        description: 'Chat WhatsApp sekarang atau kirim pesan. Respons dalam 1×24 jam.',
        url: 'https://perabox.vercel.app/contact',
        type: 'website',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
