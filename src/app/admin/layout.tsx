"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';
import { authAPI } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.replace('/login');
                return;
            }

            try {
                // Verify token and check role
                const userRes = await authAPI.getCurrentUser();
                const user = userRes.data;

                // Check for admin privileges
                if (user.role === 'admin' || user.is_superuser) {
                    setIsLoading(false);
                    // Warm up the store in background
                    useAdminStore.getState().fetchDashboardData();
                    useAdminStore.getState().fetchTechnicians();
                    useAdminStore.getState().fetchOrders();
                } else {
                    // Redirect non-admin users to home
                    router.replace('/');
                }
            } catch (error) {
                console.error("Auth check failed", error);
                // Clear invalid token
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
