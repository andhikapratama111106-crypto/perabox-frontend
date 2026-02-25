"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQPage() {
    const { t } = useLanguage();

    const faqs = t('faqPage.faqs') as unknown as { question: string; answer: string }[] | null;

    const fallbackFaqs = [
        {
            question: "What is PERABOX?",
            answer: "PERABOX is a homecare platform that connects users with trained technicians for AC and home maintenance services quickly, safely, and transparently."
        },
        {
            question: "What services does PERABOX offer?",
            answer: "We currently provide AC Cleaning, AC Installation, AC Repair, and Freon Refill. More services coming soon."
        },
        {
            question: "How do I book a service?",
            answer: "Click 'Let's Start' on the homepage, choose your service, set a schedule, and a technician will come to your location."
        },
        {
            question: "How much does PERABOX cost?",
            answer: "Prices vary by service type and AC condition. We guarantee transparent pricing with no hidden fees."
        },
        {
            question: "Are PERABOX technicians certified?",
            answer: "Yes. All our technicians go through a strict selection process and receive regular training."
        },
        {
            question: "How long does the service take?",
            answer: "AC Cleaning usually takes 45-60 minutes per unit. Installation takes 2-4 hours. Repair time depends on damage level."
        },
        {
            question: "Is there a service guarantee?",
            answer: "Yes. If a problem occurs after service, a technician will return for a free re-check."
        },
        {
            question: "Which areas does PERABOX serve?",
            answer: "We currently serve the Jabodetabek area and surroundings, expanding continuously."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept QRIS, bank transfer, and cash directly to the technician after work is completed."
        },
        {
            question: "Can I cancel my order?",
            answer: "You can cancel before the technician departs at no cost. Contact our customer service via WhatsApp."
        },
    ];

    const displayFaqs = Array.isArray(faqs) && faqs.length > 0 ? faqs : fallbackFaqs;

    return (
        <main className="min-h-screen bg-light">
            {/* Header */}
            <div className="bg-dark text-white py-20">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('faqPage.backToHome') || 'Back to Home'}
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                        {t('faqPage.pageTitle') || 'Frequently Asked Questions'}
                    </h1>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        {t('faqPage.pageSubtitle') || 'Find answers to common questions about PERABOX services.'}
                    </p>
                </div>
            </div>

            {/* FAQ List */}
            <div className="container mx-auto px-6 py-16 max-w-3xl">
                <div className="space-y-4">
                    {displayFaqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 md:p-8 hover:bg-gray-50 transition-colors list-none">
                                <h3 className="font-bold text-dark text-lg pr-4">{faq.question}</h3>
                                <svg className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-6 md:px-8 md:pb-8">
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16 bg-secondary rounded-2xl p-10">
                    <p className="text-gray-600 mb-2">{t('faqPage.ctaQuestion') || 'Still have questions?'}</p>
                    <p className="text-dark font-bold text-lg mb-6">{t('faqPage.ctaBody') || 'Contact us, we are ready to help!'}</p>
                    <Link href="/contact" className="inline-block bg-dark hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                        {t('faqPage.ctaButton') || 'Contact Us'}
                    </Link>
                </div>
            </div>
        </main>
    );
}
