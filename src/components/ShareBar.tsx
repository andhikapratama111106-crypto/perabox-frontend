'use client';

import { useState } from 'react';

interface ShareBarProps {
    title?: string;
    url?: string;
}

export default function ShareBar({ title = 'Artikel PERABOX', url }: ShareBarProps) {
    const [copied, setCopied] = useState(false);

    const pageUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(title);

    const handleNativeShare = async (e: React.MouseEvent) => {
        if (navigator.share) {
            e.preventDefault();
            try {
                await navigator.share({
                    title: title,
                    url: pageUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    };

    const shareLinks = [
        {
            id: 'whatsapp',
            label: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            className: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
        },
        {
            id: 'facebook',
            label: 'Facebook',
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            className: 'bg-[#1877F2] hover:bg-[#166fe5] text-white',
        },
        {
            id: 'instagram',
            label: 'Instagram',
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            href: `https://www.instagram.com/`,
            onClick: handleNativeShare,
            className: 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white',
        },
        {
            id: 'tiktok',
            label: 'TikTok',
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.58-1.01V15a6.5 6.5 0 0 1-12.91 1.75 6.5 6.5 0 0 1 8.98-6.52V14a2.5 2.5 0 0 0-4.93 1 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.26-1.5c.01-5.32-.02-10.64.03-15.96h-.01z" />
                </svg>
            ),
            href: `https://www.tiktok.com/`,
            onClick: handleNativeShare,
            className: 'bg-black hover:bg-gray-800 text-white',
        },
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const el = document.createElement('textarea');
            el.value = pageUrl;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Bagikan Artikel Ini</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {shareLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        onClick={link.onClick}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Bagikan ke ${link.label}`}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm ${link.className}`}
                    >
                        {link.icon}
                        <span className="hidden sm:inline">{link.label}</span>
                    </a>
                ))}

                {/* Copy Link */}
                <button
                    onClick={handleCopy}
                    aria-label="Salin tautan"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm border-2 ${copied
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                        }`}
                >
                    {copied ? (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="hidden sm:inline">Tersalin!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="hidden sm:inline">Salin Link</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
