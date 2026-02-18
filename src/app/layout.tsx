import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../styles/globals.css';
import '../styles/animations.css';


import ChatBot from '../components/ChatBot';

/* ───────── Font Subsets ───────── */
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true,
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
    preload: true,
});

/* ───────── Metadata ───────── */
export const metadata: Metadata = {
    title: 'PERABOX - Layanan Homecare Terpercaya',
    description:
        'Platform layanan perbaikan dan perawatan rumah terpercaya di Indonesia. AC Cleaning, AC Repair, dan layanan profesional lainnya.',
    openGraph: {
        title: 'PERABOX - Layanan Homecare Terpercaya',
        description: 'Solusi profesional untuk perawatan rumah Anda',
        type: 'website',
    },
};


/* ───────── Root Layout ───────── */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
            <head>
                {/* Performance: Preconnect to font origin */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
            </head>
            <body className="font-sans antialiased bg-secondary text-dark">
                <div className="scroll-blur-content">
                    {children}
                </div>
                <ChatBot />
            </body>
        </html>
    );
}
