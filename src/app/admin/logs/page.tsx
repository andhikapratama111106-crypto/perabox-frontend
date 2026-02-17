"use client";

import React, { useState } from 'react';

const LogsPage = () => {
    // Mock Data for System Logs
    const [logs] = useState([
        { id: 1, type: 'info', message: 'User Andhikapratama logged in successfully', timestamp: '2023-10-29 10:30:15', ip: '192.168.1.1' },
        { id: 2, type: 'warning', message: 'Failed login attempt for admin@perabox.com', timestamp: '2023-10-29 09:15:22', ip: '10.0.0.5' },
        { id: 3, type: 'success', message: 'Payment verified for Order #ORD-8821', timestamp: '2023-10-28 14:45:00', ip: 'System' },
        { id: 4, type: 'error', message: 'Database connection timeout - Retrying...', timestamp: '2023-10-28 03:00:00', ip: 'Server' },
        { id: 5, type: 'info', message: 'New user registration: Siti Aminah', timestamp: '2023-10-27 18:20:11', ip: '172.16.0.23' },
        { id: 6, type: 'info', message: 'System backup completed', timestamp: '2023-10-27 00:00:00', ip: 'System' },
    ]);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'info': return { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'ℹ️', border: 'border-blue-100' };
            case 'warning': return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: '⚠️', border: 'border-yellow-100' };
            case 'error': return { bg: 'bg-red-50', text: 'text-red-700', icon: '❌', border: 'border-red-100' };
            case 'success': return { bg: 'bg-green-50', text: 'text-green-700', icon: '✅', border: 'border-green-100' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-700', icon: '📝', border: 'border-gray-100' };
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">System Logs</h1>
                    <p className="text-gray-500 text-sm">Monitor system activities and security events</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>All Levels</option>
                        <option>Info</option>
                        <option>Warning</option>
                        <option>Error</option>
                    </select>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {logs.map((log) => {
                        const style = getTypeStyles(log.type);
                        return (
                            <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-lg ${style.bg} border ${style.border}`}>
                                    {style.icon}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-medium text-gray-900">{log.message}</p>
                                        <span className="text-xs text-gray-400 font-mono flex-shrink-0 ml-4">{log.timestamp}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
                                            {log.type}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            {log.ip}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-center">
                    <button className="text-sm text-primary font-medium hover:underline">View Older Logs</button>
                </div>
            </div>
        </div>
    );
};

export default LogsPage;
