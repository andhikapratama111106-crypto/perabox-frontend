import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../styles/globals.css';
import '../styles/animations.css';


import ChatBot from '../components/ChatBot';
import { LanguageProvider } from '../context/LanguageContext';

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
    title: {
        default: 'PERABOX - Layanan Homecare Terpercaya',
        template: '%s | PERABOX'
    },
    description: 'Platform layanan perbaikan dan perawatan rumah terpercaya di Indonesia. AC Cleaning, AC Repair, dan layanan profesional lainnya.',
    keywords: ['homecare', 'perbaikan AC', 'perawatan rumah', 'teknisi profesional', 'Perabox', 'Indonesia'],
    authors: [{ name: 'PERABOX Team' }],
    creator: 'PERABOX',
    publisher: 'PERABOX',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://perabox.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'PERABOX - Layanan Homecare Terpercaya',
        description: 'Solusi profesional untuk perawatan rumah Anda. Teknisi bersertifikat dan harga transparan.',
        url: 'https://perabox.vercel.app',
        siteName: 'PERABOX',
        images: [
            {
                url: '/perabox_icon.png',
                width: 800,
                height: 600,
                alt: 'PERABOX Logo',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PERABOX - Layanan Homecare Terpercaya',
        description: 'Solusi profesional untuk perawatan rumah Anda',
        images: ['/perabox_icon.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
        other: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                url: '/favicon.ico',
            },
        ],
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
                {/* SEO: Structured Data for Local Business */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "HomeAndConstructionBusiness",
                            "name": "PERABOX",
                            "image": "https://perabox.vercel.app/perabox_icon.png",
                            "@id": "https://perabox.vercel.app",
                            "url": "https://perabox.vercel.app",
                            "telephone": "+628123456789",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Jl. Kemerdekaan No. 123",
                                "addressLocality": "Jakarta",
                                "postalCode": "12345",
                                "addressCountry": "ID"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": -6.2088,
                                "longitude": 106.8456
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday"
                                ],
                                "opens": "00:00",
                                "closes": "23:59"
                            },
                            "sameAs": [
                                "https://facebook.com/perabox",
                                "https://instagram.com/perabox"
                            ],
                            "priceRange": "$$"
                        })
                    }}
                />
            </head>
            <body className="font-sans antialiased bg-secondary text-dark">
                <LanguageProvider>
                    <div className="scroll-blur-content">
                        {children}
                    </div>
                    <ChatBot />
                </LanguageProvider>
            </body>
        </html>
    );
}
