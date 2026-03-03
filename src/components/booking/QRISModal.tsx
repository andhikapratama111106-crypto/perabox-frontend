"use client";

import { useState, useEffect } from 'react';
import { paymentAPI } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

interface QRISModalProps {
    paymentId: string;
    amount: number;
    onSuccess: () => void;
    onClose: () => void;
    isInline?: boolean;
}

export default function QRISModal({ paymentId, amount, onSuccess, onClose, isInline = false }: QRISModalProps) {
    const { t, currencyCode, currencySymbol } = useLanguage();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(currencyCode, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const [qrisData, setQrisData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

    useEffect(() => {
        const fetchQRIS = async () => {
            try {
                const response = await paymentAPI.getQRIS(paymentId);
                setQrisData(response.data);
            } catch (error) {
                console.error("Failed to fetch QRIS", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQRIS();

        const timer = setInterval(() => {
            setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Auto-polling for payment status every 10 seconds
        const pollInterval = setInterval(async () => {
            if (verifying || timeLeft <= 0) return;
            try {
                const response = await paymentAPI.verify(paymentId);
                if (response.data.status === 'paid') {
                    onSuccess();
                }
            } catch (error) {
                // Silently fail polling to not disturb user
                console.error("Polling failed", error);
            }
        }, 10000);

        return () => {
            clearInterval(timer);
            clearInterval(pollInterval);
        };
    }, [paymentId, verifying, timeLeft, onSuccess]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVerify = async () => {
        setVerifying(true);
        try {
            const response = await paymentAPI.verify(paymentId);
            // Check status from response
            if (response.data.status === 'paid') {
                onSuccess();
            } else {
                alert(t('bookPage.qris.notDetected') || "Pembayaran belum terdeteksi. Silakan coba lagi setelah membayar.");
            }
        } catch (error) {
            console.error("Verification failed", error);
            alert(t('bookPage.qris.error') || "Kesalahan verifikasi. Silakan coba lagi.");
        } finally {
            setVerifying(false);
        }
    };

    const content = (
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-2xl font-black tracking-tight">PERABOX</span>
                </div>
                <h3 className="text-lg font-bold">{t('bookPage.qris.title') || 'Pembayaran QRIS'}</h3>
                <p className="text-white/80 text-sm">{t('bookPage.qris.subtitle') || 'Scan kode untuk selesaikan pesanan'}</p>
            </div>

            <div className="p-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500">{t('bookPage.qris.loading') || 'Menyiapkan QR Code...'}</p>
                    </div>
                ) : (
                    <>
                        {/* Amount */}
                        <div className="text-center mb-6">
                            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">{t('bookPage.qris.total') || 'Total Pembayaran'}</p>
                            <h4 className="text-3xl font-black text-dark">{currencySymbol}{formatPrice(amount)}</h4>
                        </div>

                        {/* QR Code */}
                        <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 flex justify-center mb-6">
                            <div className="bg-white p-2 rounded-xl shadow-inner">
                                <img
                                    src={qrisData?.qr_url || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ExampleQRISCode'}
                                    alt="QRIS Code"
                                    className="w-64 h-64 object-contain"
                                />
                                {!qrisData?.qr_url && (
                                    <p className="text-center text-xs text-gray-400 mt-2">{t('bookPage.qris.qrCodeSimulated') || 'QR Code Simulasi'}</p>
                                )}
                            </div>
                        </div>

                        {/* Timer & Instructions */}
                        <div className="flex items-center justify-between mb-8 bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">⏳</div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t('bookPage.qris.finishIn') || 'Selesaikan dalam'}</p>
                                    <p className={`text-lg font-mono font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-primary'}`}>
                                        {formatTime(timeLeft)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{t('bookPage.qris.paymentId') || 'ID Pembayaran'}</p>
                                <p className="text-xs font-mono text-gray-600">{paymentId.split('-')[0].toUpperCase()}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleVerify}
                                disabled={verifying || timeLeft === 0}
                                className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2
                                    ${verifying
                                        ? 'bg-primary/70 text-white cursor-not-allowed'
                                        : 'bg-primary hover:bg-primary/90 text-white shadow-primary/30'
                                    }
                                    ${timeLeft === 0 ? 'bg-gray-300 cursor-not-allowed' : ''}
                                `}
                            >
                                {verifying ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>{t('bookPage.qris.verifying') || 'Memverifikasi...'}</span>
                                    </>
                                ) : (t('bookPage.qris.btnPaid') || 'Saya Sudah Bayar')}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full text-gray-400 hover:text-gray-600 font-medium py-2 rounded-xl transition-all text-sm"
                            >
                                {timeLeft === 0 ? (t('bookPage.btnBack') || 'Kembali') : (t('bookPage.qris.btnBack') || 'Kembali ke Detail Pesanan')}
                            </button>
                        </div>

                        <p className="mt-6 text-[10px] text-center text-gray-400">
                            {t('bookPage.qris.instruction') || 'Kode QR dapat dipindai menggunakan GoPay, OVO, Dana, LinkAja, BCA Mobile & aplikasi perbankan lainnya.'}
                        </p>
                    </>
                )}
            </div>
        </div>
    );

    if (isInline) return content;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            {content}
        </div>
    );
}
