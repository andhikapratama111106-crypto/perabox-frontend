"use client";

import React, { useState } from 'react';

const PaymentsPage = () => {
    // Mock Data for Payments
    const [payments] = useState([
        { id: 'PAY-001', user: 'Andhikapratama', amount: 350000, date: '2023-10-25', status: 'Success', method: 'QRIS' },
        { id: 'PAY-002', user: 'Irma Santoso', amount: 150000, date: '2023-10-26', status: 'Pending', method: 'Bank Transfer' },
        { id: 'PAY-003', user: 'Siti Aminah', amount: 75000, date: '2023-10-27', status: 'Failed', method: 'E-Wallet' },
        { id: 'PAY-004', user: 'Rudi Hartono', amount: 500000, date: '2023-10-28', status: 'Success', method: 'QRIS' },
        { id: 'PAY-005', user: 'Dewi Lestari', amount: 200000, date: '2023-10-29', status: 'Success', method: 'Credit Card' },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Failed': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
                    <p className="text-gray-500 text-sm">Manage and track all transaction history</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    Export Report
                </button>
            </header>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{payment.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {payment.user.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-700">{payment.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{payment.date}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                                            {payment.method === 'QRIS' && '📱'}
                                            {payment.method === 'Bank Transfer' && '🏦'}
                                            {payment.method === 'Credit Card' && '💳'}
                                            {payment.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        Rp {payment.amount.toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${payment.status === 'Success' ? 'bg-green-500' :
                                                payment.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></span>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                    <span className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">5</span> results</span>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 border border-gray-200 rounded-md bg-white text-gray-400 text-sm disabled:opacity-50">Previous</button>
                        <button disabled className="px-3 py-1 border border-gray-200 rounded-md bg-white text-gray-400 text-sm disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;
