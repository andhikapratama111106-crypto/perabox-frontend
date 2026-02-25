"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        google?: any;
    }
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Load Google Identity Services script
    useEffect(() => {
        const scriptId = 'google-gsi-script';
        if (document.getElementById(scriptId)) return;
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }, []);

    const errors = useMemo(() => {
        const errs = { email: '', password: '' };
        if (!email) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errs.email = 'Invalid email format';
        }
        if (!password) {
            errs.password = 'Password is required';
        } else if (password.length < 8) {
            errs.password = 'Password must be at least 8 characters';
        }
        return errs;
    }, [email, password]);

    const isFormValid = !errors.email && !errors.password;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        if (!isFormValid) return;
        setLoading(true);
        setServerError('');
        try {
            const response = await authAPI.login({ email, password });
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            try {
                const userRes = await authAPI.getCurrentUser();
                const user = userRes.data;
                setIsSuccess(true);
                router.push(user.role === 'admin' ? '/admin' : '/customer/profile');
            } catch {
                setIsSuccess(true);
                router.push('/');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const detail = err.response?.data?.detail;
            setServerError(typeof detail === 'string' ? detail : 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = useCallback(() => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            setServerError('Google login is not configured. Please contact support.');
            return;
        }
        if (!window.google?.accounts?.oauth2) {
            setServerError('Google Sign-In is not ready yet. Please try again in a moment.');
            return;
        }
        setGoogleLoading(true);
        setServerError('');

        // Use oauth2 token client → opens proper Google account picker popup
        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'openid email profile',
            prompt: 'select_account',
            callback: async (tokenResponse: any) => {
                if (tokenResponse.error) {
                    setServerError('Google login was cancelled or failed.');
                    setGoogleLoading(false);
                    return;
                }
                try {
                    // Try backend first
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://perabox-backend.vercel.app';
                    const res = await fetch(`${apiUrl}/api/v1/auth/google`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ access_token: tokenResponse.access_token }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        localStorage.setItem('access_token', data.access_token);
                        if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token);
                        setIsSuccess(true);
                        router.push(data.role === 'admin' ? '/admin' : '/customer/profile');
                    } else {
                        // Fallback: get user info from Google directly
                        const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                        });
                        const userInfo = await userRes.json();
                        localStorage.setItem('google_user', JSON.stringify({
                            name: userInfo.name,
                            email: userInfo.email,
                            picture: userInfo.picture,
                        }));
                        // Store access token so Navbar treats user as logged in
                        localStorage.setItem('access_token', tokenResponse.access_token);
                        setIsSuccess(true);
                        router.push('/customer/profile');
                    }
                } catch {
                    setServerError('Google login failed. Please try again.');
                    setGoogleLoading(false);
                }
            },
            error_callback: () => {
                setServerError('Google login was cancelled.');
                setGoogleLoading(false);
            },
        });

        client.requestAccessToken();
    }, [router]);

    return (
        <main className="min-h-screen bg-secondary flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center py-10 px-6">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: 'circOut' }}
                            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            {/* Left: Branding */}
                            <div className="hidden lg:flex flex-col justify-between p-16 bg-primary text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                                <div className="relative z-10">
                                    <Link href="/" className="inline-block mb-12">
                                        <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex items-center justify-center">
                                            <Image src="/perabox_icon.png" alt="PERABOX Logo" width={160} height={90} className="h-12 w-auto" />
                                        </div>
                                    </Link>
                                    <h2 className="text-4xl font-extrabold leading-tight mb-6">
                                        The best way to manage <br />
                                        your <span className="text-accent italic">home maintenance.</span>
                                    </h2>
                                    <p className="text-white/80 text-lg max-w-sm">
                                        Join thousands of satisfied homeowners who trust Perabox for their homecare needs.
                                    </p>
                                </div>
                                <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-[2rem] border border-white/20">
                                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://i.pravatar.cc/100?img=47" alt="Customer" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">&quot;Best service in town! Very professional.&quot;</p>
                                        <p className="text-xs text-white/60">Anindya Putri, Customer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Login Form */}
                            <div className="p-8 md:p-16 lg:p-20">
                                <div className="mb-10 text-center lg:text-left">
                                    <h1 className="text-3xl font-extrabold text-dark mb-3">Welcome Home!</h1>
                                    <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
                                </div>

                                {serverError && (
                                    <div role="alert" aria-live="polite" className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm flex items-center gap-3">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">{serverError}</span>
                                    </div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-bold text-dark ml-1">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                                            autoComplete="email"
                                            className={`w-full px-6 py-4 rounded-[1.25rem] border ${touched.email && errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'} outline-none transition-all font-medium text-dark`}
                                            placeholder="name@example.com"
                                            required
                                        />
                                        {touched.email && errors.email && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center ml-1">
                                            <label htmlFor="password" className="block text-sm font-bold text-dark">Password</label>
                                            <Link href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                                                autoComplete="current-password"
                                                className={`w-full px-6 py-4 pr-14 rounded-[1.25rem] border ${touched.password && errors.password ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'} outline-none transition-all font-medium text-dark`}
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1" tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                )}
                                            </button>
                                            {touched.password && errors.password && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.password}</p>}
                                        </div>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold py-4 px-6 rounded-2xl transition-all shadow-xl hover:shadow-2xl"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Signing in...
                                            </span>
                                        ) : 'Sign in'}
                                    </motion.button>
                                </form>

                                <div className="mt-10">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold">Or continue with</span></div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        disabled={googleLoading}
                                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-100 text-dark font-bold py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98]"
                                    >
                                        {googleLoading ? (
                                            <svg className="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        ) : (
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        )}
                                        {googleLoading ? 'Connecting...' : 'Login with Google'}
                                    </button>
                                </div>

                                <div className="mt-10 text-center text-sm">
                                    <span className="text-gray-500 font-medium">Don&apos;t have an account yet?</span>{' '}
                                    <Link href="/register" className="text-primary font-extrabold hover:underline">Create account</Link>
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
                            <h2 className="text-4xl font-extrabold text-dark mb-4">Welcome back!</h2>
                            <p className="text-xl text-gray-500 font-medium">Authenticating your account...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="py-8 px-6 text-center">
                <p className="text-[10px] text-gray-400">© 2024 PERABOX. All rights reserved.</p>
            </div>
        </main>
    );
}
