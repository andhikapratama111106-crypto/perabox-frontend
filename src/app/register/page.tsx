"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'customer' // Default role
    });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [touched, setTouched] = useState({
        full_name: false,
        email: false,
        phone: false,
        password: false
    });
    const [isSuccess, setIsSuccess] = useState(false);

    // Client-side validation
    const errors = useMemo(() => {
        const errs = { full_name: '', email: '', phone: '', password: '' };

        if (!formData.full_name) {
            errs.full_name = 'Full name is required';
        }

        if (!formData.email) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errs.email = 'Invalid email format';
        }

        if (!formData.phone) {
            errs.phone = 'Phone number is required';
        }

        if (!formData.password) {
            errs.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errs.password = 'Password must be at least 8 characters';
        }

        return errs;
    }, [formData]);

    const isFormValid = !errors.full_name && !errors.email && !errors.phone && !errors.password;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            full_name: true,
            email: true,
            phone: true,
            password: true
        });

        if (!isFormValid) return;

        setLoading(true);
        setServerError('');

        try {
            const response = await authAPI.register(formData);

            // Auto-login on success (backend returns tokens)
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            setIsSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err: any) {
            console.error(err);
            const detail = err.response?.data?.detail;
            setServerError(typeof detail === 'string' ? detail : 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-secondary flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center py-10 px-6">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="register-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: 'circOut' }}
                            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden"
                        >

                            {/* Left: Branding & Info */}
                            <div className="hidden lg:flex flex-col justify-between p-16 bg-primary text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                                <div className="relative z-10">
                                    <Link href="/" className="inline-block mb-12">
                                        <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl">
                                            <img src="/perabox_icon.png" alt="Logo" className="h-12 w-auto object-contain" />
                                        </div>
                                    </Link>
                                    <h2 className="text-4xl font-extrabold leading-tight mb-6">
                                        Join the Perabox <br />
                                        <span className="text-accent italic">Family today.</span>
                                    </h2>
                                    <p className="text-primary-foreground/80 text-lg max-w-sm">
                                        Experience the best home maintenance service with just a few clicks.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Register Form */}
                            <div className="p-8 md:p-16 lg:p-20">
                                <div className="mb-10 text-center lg:text-left">
                                    <h1 className="text-3xl font-extrabold text-dark mb-3">Create Account</h1>
                                    <p className="text-gray-500 font-medium">Sign up to get started.</p>
                                </div>

                                {serverError && (
                                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {serverError}
                                    </div>
                                )}

                                <form onSubmit={handleRegister} className="space-y-4">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="full_name" className="block text-sm font-bold text-dark ml-1">Full Name</label>
                                        <input
                                            id="full_name"
                                            name="full_name"
                                            type="text"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('full_name')}
                                            className={`w-full px-6 py-4 rounded-[1.25rem] border ${touched.full_name && errors.full_name ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-primary'} outline-none transition-all font-medium text-dark`}
                                            placeholder="John Doe"
                                            required
                                        />
                                        {touched.full_name && errors.full_name && <p className="text-xs text-red-500 font-bold ml-1">{errors.full_name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-bold text-dark ml-1">Email Address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('email')}
                                            className={`w-full px-6 py-4 rounded-[1.25rem] border ${touched.email && errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-primary'} outline-none transition-all font-medium text-dark`}
                                            placeholder="name@example.com"
                                            required
                                        />
                                        {touched.email && errors.email && <p className="text-xs text-red-500 font-bold ml-1">{errors.email}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="block text-sm font-bold text-dark ml-1">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('phone')}
                                            className={`w-full px-6 py-4 rounded-[1.25rem] border ${touched.phone && errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-primary'} outline-none transition-all font-medium text-dark`}
                                            placeholder="08123456789"
                                            required
                                        />
                                        {touched.phone && errors.phone && <p className="text-xs text-red-500 font-bold ml-1">{errors.phone}</p>}
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-bold text-dark ml-1">Password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur('password')}
                                            className={`w-full px-6 py-4 rounded-[1.25rem] border ${touched.password && errors.password ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-primary'} outline-none transition-all font-medium text-dark`}
                                            placeholder="••••••••"
                                            required
                                        />
                                        {touched.password && errors.password && <p className="text-xs text-red-500 font-bold ml-1">{errors.password}</p>}
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading || (Object.values(touched).some(t => t) && !isFormValid)}
                                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-extrabold py-4 px-6 rounded-2xl transition-all shadow-xl mt-4"
                                    >
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </motion.button>
                                </form>

                                <div className="mt-8 text-center text-sm">
                                    <span className="text-gray-500 font-medium">Already have an account?</span>{' '}
                                    <Link href="/login" className="text-primary font-extrabold hover:underline">Log in</Link>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success-message"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center p-20"
                        >
                            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-extrabold text-dark mb-4">Welcome aboard!</h2>
                            <p className="text-xl text-gray-500 font-medium">Setting up your experience...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Minimal Footer for Auth Pages */}
            <div className="py-8 px-6 text-center">
                <p className="text-[10px] text-gray-400">
                    © 2024 PERABOX. All rights reserved.
                </p>
            </div>
        </main>
    );
}
