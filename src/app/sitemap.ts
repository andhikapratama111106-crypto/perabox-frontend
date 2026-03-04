import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://perabox.vercel.app';
    const now = new Date();

    return [
        // Core pages — highest priority
        { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

        // Info pages
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },

        // Blog articles
        { url: `${baseUrl}/blog/peralatan-perawatan-ac`, lastModified: new Date('2023-11-22'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/ac-menangis`, lastModified: new Date('2023-08-20'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/cara-memperbaiki-ac`, lastModified: new Date('2023-08-08'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/servis-rutin-ac`, lastModified: new Date('2023-07-15'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/ac-inverter-vs-non-inverter`, lastModified: new Date('2023-07-02'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/panduan-pk-ac`, lastModified: new Date('2023-06-20'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/bahaya-freon-bocor`, lastModified: new Date('2023-06-05'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/ac-berbau`, lastModified: new Date('2023-05-18'), changeFrequency: 'yearly', priority: 0.6 },
        { url: `${baseUrl}/blog/tips-merawat-ac`, lastModified: new Date('2023-05-01'), changeFrequency: 'yearly', priority: 0.6 },

        // Auth & legal
        { url: `${baseUrl}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
        { url: `${baseUrl}/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
        { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];
}
