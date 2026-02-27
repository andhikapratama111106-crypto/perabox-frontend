"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Clock,
    Calendar,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    Plus,
    History,
    CreditCard
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CustomerDashboard() {
    const { t } = useLanguage();

    const stats = [
        {
            label: t('dashboardPage.totalBookings') || 'Total Bookings',
            value: '12',
            icon: <Calendar className="w-6 h-6 text-primary" />,
            color: 'bg-primary/10',
            trend: '+2 this month'
        },
        {
            label: t('dashboardPage.pendingServices') || 'Pending Services',
            value: '2',
            icon: <Clock className="w-6 h-6 text-amber-500" />,
            color: 'bg-amber-50',
            trend: 'Next: Oct 24'
        },
        {
            label: t('dashboardPage.completedTasks') || 'Completed Tasks',
            value: '10',
            icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
            color: 'bg-green-50',
            trend: '98% success'
        },
        {
            label: t('dashboardPage.unpaidInvoices') || 'Unpaid Invoices',
            value: '0',
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            color: 'bg-red-50',
            trend: 'All clear!'
        }
    ];

    const recentBookings = [
        {
            id: 'BK-7892',
            service: 'AC Cleaning Service',
            date: 'Oct 20, 2024',
            status: 'Completed',
            price: 'IDR 150.000',
            statusColor: 'text-green-600 bg-green-50'
        },
        {
            id: 'BK-8901',
            service: 'AC Repair (Leaks)',
            date: 'Oct 24, 2024',
            status: 'Scheduled',
            price: 'IDR 450.000',
            statusColor: 'text-primary bg-primary/10'
        },
        {
            id: 'BK-9012',
            service: 'AC Installation',
            date: 'Nov 02, 2024',
            status: 'Pending',
            price: 'IDR 850.000',
            statusColor: 'text-amber-600 bg-amber-50'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-dark flex items-center gap-3">
                        <LayoutDashboard className="w-8 h-8 text-primary" />
                        {t('dashboardPage.title') || 'Dashboard'}
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">
                        {t('dashboardPage.welcome') || 'Welcome back! Here is what is happening with your services.'}
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                    <Plus className="w-5 h-5" />
                    {t('dashboardPage.bookNow') || 'Book New Service'}
                </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.trend}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-bold">{stat.label}</h3>
                        <p className="text-3xl font-black text-dark mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-bold text-dark flex items-center gap-2">
                            <History className="w-5 h-5 text-primary" />
                            {t('dashboardPage.recentBookings') || 'Recent Bookings'}
                        </h2>
                        <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                            {t('viewAll') || 'View All'}
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-dark group-hover:text-primary transition-colors">{booking.service}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold">{booking.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-medium text-gray-500">{booking.date}</td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${booking.statusColor}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-bold text-dark">{booking.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Tips */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-dark px-2 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            {t('dashboardPage.quickActions') || 'Quick Actions'}
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            <button className="flex items-center gap-4 bg-[#FDF8F3] hover:bg-[#FDF8F3]/80 p-4 rounded-2xl border border-primary/10 transition-all group">
                                <div className="bg-white p-2 rounded-xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-dark">Get an Instant Quote</p>
                                    <p className="text-xs text-gray-500">Calculate estimated cost</p>
                                </div>
                            </button>
                            <button className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl border border-gray-100 transition-all group">
                                <div className="bg-white p-2 rounded-xl shadow-sm text-dark group-hover:scale-110 transition-transform">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-dark">Need Help?</p>
                                    <p className="text-xs text-gray-500">Contact our support team</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Promo Banner */}
                    <div className="bg-primary rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-2">Perabox Premium</h3>
                            <p className="text-xs text-white/80 leading-relaxed mb-4">
                                Subscribe to Perabox Premium and get 20% off on all AC services and priority scheduling.
                            </p>
                            <button className="w-full bg-white text-primary py-2 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
