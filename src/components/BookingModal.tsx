"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { bookingsAPI, servicesAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialServiceId?: string;
}

const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialServiceId }) => {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusRef = useRef<HTMLSelectElement>(null);

    const [services, setServices] = useState<any[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || '');
    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [bookingSummary, setBookingSummary] = useState<{
        service: string;
        date: string;
        time: string;
    } | null>(null);

    // Validation states
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (isOpen) {
            fetchServices();
            if (initialServiceId) setSelectedServiceId(initialServiceId);
            // Focus trap: focus the first input
            setTimeout(() => firstFocusRef.current?.focus(), 100);
        }
    }, [isOpen, initialServiceId]);

    // ESC key handler
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    const fetchServices = async () => {
        try {
            const response = await servicesAPI.getServices();
            setServices(response.data);
            if (!selectedServiceId && response.data.length > 0) {
                setSelectedServiceId(response.data[0].id);
            }
        } catch (err) {
            console.error('Failed to fetch services', err);
        }
    };

    const selectedService = services.find(s => s.id === selectedServiceId);
    const estimatedPrice = selectedService ? Number(selectedService.base_price) : 0;

    const validateField = (field: string, value: string) => {
        switch (field) {
            case 'fullName': return value.trim().length >= 3;
            case 'contact': return value.startsWith('08') && value.length >= 10;
            case 'date': return !!value;
            case 'time': return !!value;
            case 'address': return value.trim().length >= 10;
            case 'selectedServiceId': return !!value;
            default: return true;
        }
    };

    const isFormValid = () => {
        return validateField('fullName', fullName)
            && validateField('contact', contact)
            && validateField('date', date)
            && validateField('time', time)
            && validateField('address', address)
            && validateField('selectedServiceId', selectedServiceId);
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all touched
        setTouched({
            fullName: true, contact: true, date: true,
            time: true, address: true, selectedServiceId: true,
        });

        if (!isFormValid()) return;

        setLoading(true);
        setError('');

        try {
            const bookingData = {
                service_id: selectedServiceId,
                scheduled_date: date,
                scheduled_time: time,
                address,
                notes: `Nama: ${fullName}\nKontak: ${contact}\n${notes ? 'Catatan: ' + notes : ''}`,
            };
            await bookingsAPI.create(bookingData);

            setBookingSummary({
                service: selectedService?.name || 'Layanan',
                date: new Date(date).toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                }),
                time: time,
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Gagal membuat booking. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSuccess(false);
        setBookingSummary(null);
        setFullName('');
        setContact('');
        setDate('');
        setTime('');
        setAddress('');
        setNotes('');
        setError('');
        setTouched({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-dark/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            role="dialog"
            aria-modal="true"
            aria-label="Booking Modal"
        >
            <div
                ref={modalRef}
                className="bg-white w-full h-full md:h-auto md:rounded-3xl md:max-w-[640px] md:max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-dark transition-all"
                    aria-label="Tutup modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 md:p-8">
                    {/* Header */}
                    {!success && (
                        <div className="mb-6 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-dark mb-2">
                                Booking Layanan
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Isi formulir di bawah untuk menjadwalkan kunjungan teknisi.
                            </p>
                        </div>
                    )}

                    {success && bookingSummary ? (
                        /* ===== SCREEN B: Konfirmasi Berhasil ===== */
                        <div className="text-center py-8 flex flex-col items-center">
                            {/* Success Icon */}
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50 animate-bounce-slow">
                                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-dark mb-2">
                                Booking Berhasil!
                            </h2>
                            <p className="text-gray-500 text-sm mb-8">
                                Pesanan Anda telah kami terima dan sedang diproses.
                            </p>

                            {/* Order Summary Card */}
                            <div className="bg-gray-50 rounded-2xl p-6 w-full max-w-sm mb-8 text-left border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                                    Ringkasan Pesanan
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Layanan</span>
                                        <span className="text-sm font-semibold text-dark text-right">{bookingSummary.service}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Waktu</span>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-dark">{bookingSummary.date}</div>
                                            <div className="text-sm text-gray-500">{bookingSummary.time}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 w-full max-w-sm">
                                <button
                                    onClick={() => router.push('/profile')}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                                >
                                    Lihat Pesanan
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-dark font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]"
                                >
                                    Kembali ke Beranda
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ===== SCREEN A: Booking Form ===== */
                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Service Select */}
                            <div>
                                <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                    Layanan
                                </label>
                                <div className="relative">
                                    <select
                                        ref={firstFocusRef}
                                        value={selectedServiceId}
                                        onChange={(e) => setSelectedServiceId(e.target.value)}
                                        onBlur={() => handleBlur('selectedServiceId')}
                                        className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none ${touched.selectedServiceId && !validateField('selectedServiceId', selectedServiceId) ? 'border-red-300' : 'border-gray-100'}`}
                                        required
                                    >
                                        <option value="" disabled>Pilih Layanan...</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.name} - Rp {Number(s.base_price).toLocaleString()}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    onBlur={() => handleBlur('fullName')}
                                    placeholder="Nama Anda"
                                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium ${touched.fullName && !validateField('fullName', fullName) ? 'border-red-300' : 'border-gray-100'}`}
                                    required
                                />
                            </div>

                            {/* Phone / WA */}
                            <div>
                                <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                    Nomor WhatsApp / HP
                                </label>
                                <input
                                    type="tel"
                                    value={contact}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setContact(val);
                                    }}
                                    onBlur={() => handleBlur('contact')}
                                    placeholder="Contoh: 0812..."
                                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium ${touched.contact && (!contact.startsWith('08') || contact.length < 10) ? 'border-red-300' : 'border-gray-100'}`}
                                    required
                                />
                                {touched.contact && !contact.startsWith('08') && contact.length > 0 && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">Nomor harus dimulai dengan 08</p>
                                )}
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        onBlur={() => handleBlur('date')}
                                        min="2026-01-01"
                                        className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium ${touched.date && !validateField('date', date) ? 'border-red-300' : 'border-gray-100'}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                        Jam
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            onBlur={() => handleBlur('time')}
                                            className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none ${touched.time && !validateField('time', time) ? 'border-red-300' : 'border-gray-100'}`}
                                            required
                                        >
                                            <option value="" disabled>Pilih Jam</option>
                                            {TIME_SLOTS.map(slot => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                    Alamat Lengkap
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onBlur={() => handleBlur('address')}
                                    placeholder="Jalan, Nomor Rumah, RT/RW, Kelurahan..."
                                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium h-24 resize-none ${touched.address && !validateField('address', address) ? 'border-red-300' : 'border-gray-100'}`}
                                    required
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-bold text-dark mb-1.5 ml-1">
                                    Catatan Tambahan <span className="text-gray-400 font-normal">(Opsional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Contoh: AC di lantai 2, sebelah kiri..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                />
                            </div>

                            {/* Total Price Bar */}
                            {estimatedPrice > 0 && (
                                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                    <span className="text-sm font-bold text-gray-600">Estimasi Biaya</span>
                                    <span className="text-xl font-bold text-primary">Rp {estimatedPrice.toLocaleString()}</span>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-dark font-bold py-3.5 rounded-xl transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-[2] bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Konfirmasi Booking'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
