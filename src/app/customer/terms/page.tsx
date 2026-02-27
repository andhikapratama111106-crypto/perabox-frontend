"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, FileCheck, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TermsPage = () => {
    const { t } = useLanguage();

    const sections = [
        {
            title: t('termsPage.usageTerms'),
            icon: <FileText className="w-5 h-5" />,
            content: "Welcome to PERABOX. By using our services, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern PERABOX's relationship with you in relation to this website and our services."
        },
        {
            title: t('termsPage.serviceAgreement'),
            icon: <FileCheck className="w-5 h-5" />,
            content: "We provide professional AC services including cleaning, repair, and installation. Our technicians are trained to provide high-quality services. Completion times may vary based on the complexity of the task and on-site conditions."
        },
        {
            title: t('termsPage.privacyPolicy'),
            icon: <Shield className="w-5 h-5" />,
            content: "Your privacy is important to us. We collect personal information only when necessary to provide our services. We do not share your personal data with third parties except as required by law or to facilitate your service booking."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('termsPage.title')}</h1>
                <p className="text-gray-500">{t('termsPage.subtitle')}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-gray-800 uppercase tracking-tight">Perabox Service Policy</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{t('termsPage.lastUpdated')}: Oct 2023</span>
                    </div>
                </div>

                <div className="p-8 space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-4"
                        >
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <span className="p-1.5 bg-gray-100 rounded-md text-gray-600">
                                    {section.icon}
                                </span>
                                {section.title}
                            </h2>
                            <div className="pl-12">
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {section.content}
                                </p>
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 italic">
                                    Note: This is a simplified version of our terms. For the full legal document, please contact our legal department.
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <div className="p-8 bg-gray-50 text-center">
                    <p className="text-xs text-gray-400 italic">
                        © 2023 PERABOX Indonesia. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
