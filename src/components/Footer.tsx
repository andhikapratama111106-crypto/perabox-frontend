
"use client";

import Link from 'next/link';
import { Reveal } from '@/components/Reveal/Reveal';

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://instagram.com/perabox',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com/perabox',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://youtube.com/@perabox',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
            </svg>
        ),
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/81234567894',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
        ),
    },
];

const Footer = () => {
    return (
        <footer className="bg-secondary pt-20 pb-10">
            <div className="container mx-auto px-6">

                {/* Bottom CTA Banner with Family Photo */}
                <Reveal direction="up">
                    <div className="relative rounded-3xl overflow-hidden mb-20 shadow-2xl min-h-[280px] md:min-h-[320px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: "url('/family_photo.jpg')"
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-900/20"></div>

                        <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row justify-between items-start md:items-end h-full">
                            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-xl leading-tight">
                                Simple. Smooth. Secure.
                            </h2>

                        </div>
                    </div>
                </Reveal>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 px-4">
                    <div className="lg:col-span-2">
                        <p className="text-sm text-gray-500 mb-6">Stay In touch</p>

                        {/* Social Media Icons */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow us on ${social.name}`}
                                    title={social.name}
                                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-md"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-dark text-xs uppercase tracking-wider mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Articles</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-dark text-xs uppercase tracking-wider mb-6">Join Us</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link href="#" className="hover:text-primary transition-colors">Vendor Partner</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-dark text-xs uppercase tracking-wider mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
                        </ul>
                    </div>
                </div>

                {/* FAQ Section (Coursera-style reference) */}
                <div className="border-t border-gray-100 pt-16 mb-16">
                    <h3 className="text-xl font-bold text-dark mb-8">Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                        <div>
                            <h4 className="font-bold text-sm text-dark mb-2">Apa itu PERABOX?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Platform homecare yang menghubungkan pengguna dengan teknisi terlatih untuk layanan AC dan rumah tangga.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-dark mb-2">Bagaimana cara memesan?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Klik 'Let&apos;s Start', pilih layanan, tentukan jadwal, dan teknisi kami akan datang ke lokasi Anda.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-dark mb-2">Apakah ada garansi?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Ya, setiap layanan memiliki garansi. Jika ada masalah, kami akan lakukan pengecekan ulang gratis.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-dark mb-2">Metode pembayaran?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Kami menerima QRIS, transfer bank, dan pembayaran tunai langsung kepada teknisi.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-dark mb-2">Area layanan?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Saat ini melayani area Jabodetabek dan sekitarnya, terus memperluas ke kota-kota lain.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-dark mb-2">Pembatalan pesanan?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">Bisa dibatalkan via WhatsApp customer service sebelum teknisi berangkat ke lokasi.</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Link href="/faq" className="text-primary text-xs font-bold hover:underline">
                            See all FAQs →
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 mt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] text-gray-400 order-2 md:order-1 text-center md:text-left">
                            © 2024 PERABOX. All rights reserved. (v1.1)
                        </p>

                        <div className="flex flex-col md:flex-row items-center gap-6 order-1 md:order-2">
                            <div className="flex gap-6 text-[10px] text-gray-400">
                                <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
                                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
