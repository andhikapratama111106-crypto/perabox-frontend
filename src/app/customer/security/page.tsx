"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SecurityPage = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        // Mock success
        setStatus({ type: 'success', message: 'Password updated successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h1>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 max-w-2xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#FDF8F3] text-[#9C6D3F] rounded-2xl flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Ubah Kata Sandi</h2>
                        <p className="text-sm text-gray-500">Pastikan akun Anda tetap aman dengan mengganti kata sandi secara berkala.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Kata Sandi Saat Ini</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#9C6D3F]/30 focus:ring-4 focus:ring-[#9C6D3F]/5 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Kata Sandi Baru</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#9C6D3F]/30 focus:ring-4 focus:ring-[#9C6D3F]/5 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Konfirmasi Kata Sandi</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#9C6D3F]/30 focus:ring-4 focus:ring-[#9C6D3F]/5 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {status.message && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            <span className="text-lg">{status.type === 'error' ? '⚠️' : '✅'}</span>
                            <p className="text-sm font-bold">{status.message}</p>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-10 py-4 bg-[#9C6D3F] hover:bg-[#8B5E3C] text-white font-bold rounded-2xl shadow-lg shadow-[#9C6D3F]/20 transition-all active:scale-[0.98]"
                        >
                            Perbarui Kata Sandi
                        </button>
                    </div>
                </form>
            </div>

            {/* Other Security Options (Placeholders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#9C6D3F]/20 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.39.234 3.468.657m-3.42 16.142A10.04 10.04 0 0112 21c-2.77 0-5.46-.547-7.925-1.54M12 11V3m0 20V13m-3-2a3 3 0 116 0 3 3 0 01-6 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-[#9C6D3F] transition-colors">Dua Faktor (2FA)</h3>
                            <p className="text-xs text-gray-500">Nonaktif</p>
                        </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-[#9C6D3F] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#9C6D3F]/20 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-[#9C6D3F] transition-colors">Perangkat Terdaftar</h3>
                            <p className="text-xs text-gray-500">1 Perangkat Aktif</p>
                        </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-[#9C6D3F] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
