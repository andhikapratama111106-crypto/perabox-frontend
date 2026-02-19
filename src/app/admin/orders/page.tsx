"use client";

import React, { useEffect, useState } from 'react';
import { bookingsAPI, adminAPI } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';

export default function AdminOrdersPage() {
    const {
        orders,
        lastFetched,
        fetchOrders,
        technicians,
        fetchTechnicians
    } = useAdminStore();

    const [loading, setLoading] = useState(false); // For action-specific loading (e.g., assign)
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    useEffect(() => {
        // Fetch orders when status changes
        fetchOrders({ status: filterStatus === 'all' ? undefined : filterStatus });
    }, [filterStatus, fetchOrders]);

    useEffect(() => {
        // Ensure technicians are available for assignment modal
        fetchTechnicians();
    }, [fetchTechnicians]);

    const handleAssignClick = (booking: any) => {
        setSelectedBooking(booking);
        setIsAssignModalOpen(true);
    };

    const handleAssignTechnician = async (technicianId: string) => {
        if (!selectedBooking) return;
        setLoading(true);
        try {
            await adminAPI.assignTechnician(selectedBooking.id, technicianId);
            setIsAssignModalOpen(false);
            // Refresh orders list, forcing a refetch to get updated data
            fetchOrders({ status: filterStatus === 'all' ? undefined : filterStatus }, true);
            alert("Teknisi berhasil di-assign!");
        } catch (error) {
            console.error("Failed to assign technician", error);
            alert("Gagal menetapkan teknisi");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: any = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            in_progress: 'bg-purple-100 text-purple-700',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
                {status.replace('_', ' ')}
            </span>
        );
    };

    // Only show full loading if we have absolutely no data yet for initial view
    if (!lastFetched.orders && filterStatus === 'all') {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-gray-400 font-medium text-sm">Memuat data pesanan...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
                <div className="flex gap-2">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">Layanan</th>
                                <th className="px-6 py-4">Jadwal</th>
                                <th className="px-6 py-4">Teknisi</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={7} className="text-center py-8">Loading data...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Tidak ada order ditemukan.</td></tr>
                            ) : (
                                orders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-400">#{order.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{order.customer?.full_name || 'Unknown'}</div>
                                            <div className="text-xs text-gray-500">{order.address}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{order.service?.name || 'Unknown Service'}</td>
                                        <td className="px-6 py-4">
                                            <div>{order.scheduled_date}</div>
                                            <div className="text-xs text-gray-500">{order.scheduled_time}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.technician_id ? (
                                                <span className="text-green-600 font-medium">Assigned</span>
                                            ) : (
                                                <span className="text-red-400 text-xs italic">Belum ada</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleAssignClick(order)}
                                                className="text-primary hover:text-primary-dark font-medium text-xs border border-primary/20 px-3 py-1 rounded-lg hover:bg-primary/5 transition-colors"
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ASSIGN MODAL */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-fade-in-up">
                        <h3 className="text-xl font-bold mb-4">Assign Teknisi</h3>
                        <p className="text-gray-500 text-sm mb-6">Pilih teknisi untuk Order #{selectedBooking?.id.slice(0, 8)}</p>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto mb-6">
                            {technicians.map((tech: any) => (
                                <button
                                    key={tech.id}
                                    onClick={() => handleAssignTechnician(tech.id)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                        {/* tech.avatar_url */}
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{tech.user_name}</div>
                                        <div className="text-xs text-gray-500">{tech.specializations.join(', ')}</div>
                                    </div>
                                    {tech.is_available ? (
                                        <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
                                    ) : (
                                        <span className="ml-auto text-xs text-red-500">Busy</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsAssignModalOpen(false)}
                            className="w-full py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
