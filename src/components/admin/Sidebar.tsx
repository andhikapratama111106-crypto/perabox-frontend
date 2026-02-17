"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Orders', href: '/admin/orders', icon: '📝' },
        { name: 'Technicians', href: '/admin/technicians', icon: '👷' },
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Payments', href: '/admin/payments', icon: '💰' },
        { name: 'Logs', href: '/admin/logs', icon: '📋' },
    ];

    return (
        <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 z-50 overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                <Link href="/admin">
                    <span className="text-2xl font-bold text-primary">PERABOX</span>
                    <span className="text-xs ml-2 px-2 py-1 bg-gray-100 rounded-full text-gray-500">Admin</span>
                </Link>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                                }
                            `}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                <button
                    onClick={() => {
                        localStorage.removeItem('access_token');
                        window.location.href = '/login';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                >
                    <span className="text-xl">🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
