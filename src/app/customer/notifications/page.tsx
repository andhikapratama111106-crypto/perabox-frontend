"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationsPage = () => {
    const { t } = useLanguage();
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Booking Confirmed',
            message: 'Your AC Cleaning service for March 5th is confirmed.',
            time: '2 hours ago',
            read: false,
            type: 'success'
        },
        {
            id: 2,
            title: 'Payment Received',
            message: 'We have received your payment for order #PB-9921.',
            time: '5 hours ago',
            read: true,
            type: 'info'
        },
        {
            id: 3,
            title: 'Technician on the way',
            message: 'Technician Budi is heading to your location.',
            time: 'Yesterday',
            read: true,
            type: 'warning'
        }
    ]);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{t('sidebar.notification')}</h1>
                <button
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {notifications.length > 0 ? (
                        notifications.map((n) => (
                            <motion.div
                                key={n.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className={`p-5 rounded-2xl border transition-all flex gap-4 ${n.read ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#9C6D3F]/5 border-[#9C6D3F]/20 shadow-md translate-x-1'
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.read ? 'bg-gray-200' : 'bg-primary animate-pulse'
                                    }`} />

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-bold ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</h3>
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">{n.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">{n.message}</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {!n.read && (
                                        <button
                                            onClick={() => markAsRead(n.id)}
                                            className="p-2 hover:bg-white rounded-full transition-colors text-primary"
                                            title="Mark as read"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(n.id)}
                                        className="p-2 hover:bg-red-50 rounded-full transition-colors text-gray-300 hover:text-red-500"
                                        title="Delete"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </div>
                            <p className="text-gray-400 font-medium">No new notifications</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NotificationsPage;
