"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SupportPage = () => {
    const { t } = useLanguage();
    const [message, setMessage] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Simulate API call
        setTimeout(() => {
            setIsSent(true);
            setMessage('');
        }, 800);
    };

    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6 text-blue-500" />,
            title: t('supportPage.emailSupport'),
            value: 'support@perabox.com',
            link: 'mailto:support@perabox.com'
        },
        {
            icon: <Phone className="w-6 h-6 text-green-500" />,
            title: t('supportPage.phoneSupport'),
            value: '+62 812-3456-7890',
            link: 'tel:+6281234567890'
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
            title: t('supportPage.liveChat'),
            value: 'Start Chat',
            link: '#'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('supportPage.title')}</h1>
                <p className="text-gray-500">{t('supportPage.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                    <motion.a
                        key={index}
                        href={method.link}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md"
                    >
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-primary">
                            {method.icon}
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">{method.title}</h3>
                        <p className="text-sm text-gray-500">{method.value}</p>
                    </motion.a>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Send className="w-5 h-5 text-primary" />
                        {t('supportPage.contactUs')}
                    </h2>

                    {isSent ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-100 rounded-xl p-6 text-center"
                        >
                            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-green-800 mb-2">{t('supportPage.successMessage')}</h3>
                            <button
                                onClick={() => setIsSent(false)}
                                className="text-green-600 font-medium hover:underline text-sm"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('supportPage.message')}
                                </label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-48 text-sm"
                                    placeholder="How can we help you today?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                {t('supportPage.sendMessage')}
                            </button>
                        </form>
                    )}
                </div>

                {/* FAQ Preview */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-500" />
                        {t('supportPage.faq')}
                    </h2>

                    <div className="space-y-4 flex-grow">
                        {[1, 2, 3, 4].map((i) => (
                            <button
                                key={i}
                                className="w-full p-4 rounded-xl border border-gray-50 hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-between group"
                            >
                                <span className="text-sm font-medium text-gray-700 text-left">
                                    {i === 1 ? 'How do I track my booking?' :
                                        i === 2 ? 'What is the refund policy?' :
                                            i === 3 ? 'How can I change my address?' :
                                                'Are there any service warranties?'}
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </button>
                        ))}
                    </div>

                    <button className="mt-8 text-primary font-bold text-sm hover:underline flex items-center gap-2 text-center mx-auto">
                        View All FAQ
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
