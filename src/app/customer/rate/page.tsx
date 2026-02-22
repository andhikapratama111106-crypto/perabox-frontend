"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const RatePage = () => {
    const { t } = useLanguage();
    const [ratings, setRatings] = useState({
        overall: 0,
        cleanliness: 0,
        punctuality: 0,
        professionalism: 0
    });
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredStar, setHoveredStar] = useState<Record<string, number>>({});

    const handleRate = (category: string, value: number) => {
        setRatings(prev => ({ ...prev, [category]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 800);
    };

    const StarRating = ({ category, label }: { category: string; label: string }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-50 last:border-0">
            <span className="text-gray-700 font-medium mb-2 sm:mb-0">{label}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoveredStar({ ...hoveredStar, [category]: star })}
                        onMouseLeave={() => setHoveredStar({ ...hoveredStar, [category]: 0 })}
                        onClick={() => handleRate(category, star)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`w-8 h-8 ${star <= (hoveredStar[category] || (ratings as any)[category])
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-200'
                                } transition-colors duration-200`}
                        />
                    </motion.button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('rate.title')}</h1>
                <p className="text-gray-500">{t('rate.subtitle')}</p>
            </div>

            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        key="rate-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                    >
                        <div className="space-y-2 mb-8">
                            <StarRating category="overall" label={t('rate.overallExperience')} />
                            <StarRating category="cleanliness" label={t('rate.cleanliness')} />
                            <StarRating category="punctuality" label={t('rate.punctuality')} />
                            <StarRating category="professionalism" label={t('rate.professionalism')} />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-700 font-medium mb-3">
                                {t('rate.comment')}
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-32 text-sm"
                                placeholder="..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={ratings.overall === 0}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${ratings.overall > 0
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            {t('rate.submit')}
                        </motion.button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center"
                    >
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {t('rate.thankYou')}
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Redirecting you to dashboard...
                        </p>
                        <button
                            onClick={() => window.location.href = '/customer/dashboard'}
                            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            Go Back
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RatePage;
