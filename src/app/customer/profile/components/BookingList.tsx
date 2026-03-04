"use client";

import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '@/lib/api';
import LiveTracker from './LiveTracker';
import ReviewModal from './ReviewModal';

interface BookingListProps {
    type: 'active' | 'history';
}

const BookingList = ({ type }: BookingListProps) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (loading) setLoading(true);
                const res = await bookingsAPI.getAll();
                let allBookings = res.data || [];

                if (type === 'active') {
                    allBookings = allBookings.filter((b: any) => !['completed', 'cancelled'].includes(b.status.toLowerCase()));
                } else {
                    allBookings = allBookings.filter((b: any) => ['completed', 'cancelled'].includes(b.status.toLowerCase()));
                }

                allBookings.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setBookings(allBookings);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

        // Real-time polling for active bookings every 15 seconds
        let pollInterval: any;
        if (type === 'active') {
            pollInterval = setInterval(fetchBookings, 15000);
        }

        return () => {
            if (pollInterval) clearInterval(pollInterval);
        };
    }, [type]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {type === 'active' ? 'Belum Ada Pesanan Aktif' : 'Belum Ada Riwayat Pesanan'}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    {type === 'active'
                        ? 'Saat ini Anda tidak memiliki pesanan layanan yang sedang berjalan.'
                        : 'Anda belum memiliki riwayat pesanan yang telah selesai.'}
                </p>
                {type === 'active' && (
                    <button
                        onClick={() => window.location.href = '/#services'}
                        className="mt-6 px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        Pesan Layanan Sekarang
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    {/* Header Card */}
                    <div className="border-b border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    ORDER #{booking.id.substring(0, 8)}
                                </span>
                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wide
                                    ${booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            booking.status === 'pending' || booking.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                    {booking.status.replace('_', ' ')}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Pembelian Layanan {booking.service_name || 'PERABOX'}</h3>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-xs text-gray-400 font-medium mb-1">Tanggal Pesanan</p>
                            <p className="text-sm font-bold text-gray-800">
                                {new Date(booking.scheduled_date).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })} • {booking.scheduled_time}
                            </p>
                        </div>
                    </div>

                    {/* Body Card */}
                    <div className="p-5 sm:p-6">
                        {type === 'active' && (
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-800 mb-4">Status Pemesanan Live</h4>
                                <LiveTracker status={booking.status} />
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-1">Lokasi Pengerjaan</p>
                                    <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        {booking.address}
                                        {booking.notes && <span className="block mt-2 text-xs text-gray-500 border-t border-gray-200 pt-2 pb-1">Catatan: {booking.notes}</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-64 flex flex-col justify-between">
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-4">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Total Biaya</p>
                                    <p className="text-xl font-bold text-primary">
                                        Rp {(booking.total_price || 0).toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Estimasi Harga Awal
                                    </p>
                                </div>

                                {type === 'history' && booking.status === 'completed' && (
                                    <button
                                        className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors shadow-sm"
                                        onClick={() => {
                                            setSelectedBooking({ id: booking.id, name: booking.service_name });
                                            setIsReviewOpen(true);
                                        }}
                                    >
                                        Beri Ulasan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {selectedBooking && (
                <ReviewModal
                    isOpen={isReviewOpen}
                    onClose={() => {
                        setIsReviewOpen(false);
                        setSelectedBooking(null);
                    }}
                    bookingId={selectedBooking.id}
                    serviceName={selectedBooking.name}
                    onSubmit={(rating, review) => {
                        console.log(`Rating: ${rating}, Review: ${review} for booking ${selectedBooking.id}`);
                        // Placeholder for submitting review API call
                    }}
                />
            )}
        </div>
    );
};

export default BookingList;
