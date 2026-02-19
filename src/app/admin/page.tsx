"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { bookingsAPI, adminAPI } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';

// Types
interface PaymentData {
    date: string;
    amount: number;
    label: string;
}

type TimeFrame = '1D' | '1W' | '1M';

// Generate mock payment data for the chart (since we need demo data)
function generateMockPayments(): PaymentData[] {
    const payments: PaymentData[] = [];
    const now = new Date();

    // Generate last 30 days of data
    for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Random revenue between 150k - 2M with some variation
        const baseAmount = 300000 + Math.random() * 1500000;
        // Weekends tend to have higher revenue
        const dayOfWeek = date.getDay();
        const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.4 : 1;
        const amount = Math.round(baseAmount * weekendMultiplier);

        payments.push({
            date: date.toISOString().split('T')[0],
            amount,
            label: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }),
        });
    }
    return payments;
}

// Also generate hourly data for "1 Day" view
function generateHourlyData(): PaymentData[] {
    const data: PaymentData[] = [];
    const now = new Date();

    for (let h = 0; h <= now.getHours(); h++) {
        const amount = h < 7 ? 0 : Math.round(50000 + Math.random() * 400000);
        data.push({
            date: `${h}:00`,
            amount,
            label: `${h.toString().padStart(2, '0')}:00`,
        });
    }
    return data;
}

// ======= IncomeChart Component =======
function IncomeChart({ data, timeFrame }: { data: PaymentData[]; timeFrame: TimeFrame }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [animationProgress, setAnimationProgress] = useState(0);

    useEffect(() => {
        setAnimationProgress(0);
        const timer = setTimeout(() => setAnimationProgress(1), 50);
        return () => clearTimeout(timer);
    }, [data, timeFrame]);

    const maxAmount = Math.max(...data.map(d => d.amount), 1);
    const chartHeight = 220;
    const chartWidth = 700;
    const barGap = 3;
    const barWidth = Math.max(4, (chartWidth - barGap * data.length) / data.length);

    // Y-axis labels
    const yLabels = useMemo(() => {
        const step = maxAmount / 4;
        return Array.from({ length: 5 }, (_, i) => Math.round(step * (4 - i)));
    }, [maxAmount]);

    const formatCurrency = (val: number) => {
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
        return val.toString();
    };

    // Total revenue for the period
    const totalRevenue = data.reduce((sum, d) => sum + d.amount, 0);
    const avgRevenue = Math.round(totalRevenue / (data.length || 1));

    return (
        <div className="w-full">
            {/* Summary Row */}
            <div className="flex items-end gap-8 mb-6">
                <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Pendapatan</p>
                    <p className="text-3xl font-extrabold text-gray-800">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Rata-rata / {timeFrame === '1D' ? 'jam' : 'hari'}</p>
                    <p className="text-lg font-bold text-gray-500">Rp {avgRevenue.toLocaleString('id-ID')}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="relative overflow-x-auto">
                <div className="flex" style={{ minWidth: data.length > 15 ? `${data.length * (barWidth + barGap) + 60}px` : '100%' }}>
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between pr-3 text-right shrink-0" style={{ height: `${chartHeight}px` }}>
                        {yLabels.map((label, i) => (
                            <span key={i} className="text-[10px] text-gray-300 font-medium leading-none">
                                {formatCurrency(label)}
                            </span>
                        ))}
                    </div>

                    {/* Bars */}
                    <div className="flex-1 relative" style={{ height: `${chartHeight}px` }}>
                        {/* Horizontal grid lines */}
                        {[0, 1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className="absolute w-full border-t border-gray-100"
                                style={{ top: `${(i / 4) * 100}%` }}
                            />
                        ))}

                        {/* Bar container */}
                        <div className="flex items-end h-full gap-[2px] relative z-10">
                            {data.map((d, i) => {
                                const barHeight = (d.amount / maxAmount) * chartHeight * animationProgress;
                                const isHovered = hoveredIndex === i;
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center justify-end relative group cursor-pointer"
                                        style={{ width: `${barWidth}px`, height: '100%' }}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        {/* Tooltip */}
                                        {isHovered && (
                                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
                                                <div>Rp {d.amount.toLocaleString('id-ID')}</div>
                                                <div className="text-gray-400 font-normal">{d.label}</div>
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                                            </div>
                                        )}
                                        <div
                                            className="w-full rounded-t-md transition-all duration-700 ease-out"
                                            style={{
                                                height: `${barHeight}px`,
                                                background: isHovered
                                                    ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                                                    : d.amount > avgRevenue
                                                        ? 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)'
                                                        : 'linear-gradient(180deg, #93c5fd 0%, #60a5fa 100%)',
                                                opacity: isHovered ? 1 : 0.85,
                                                transform: isHovered ? 'scaleY(1.02)' : 'scaleY(1)',
                                                transformOrigin: 'bottom',
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* X-axis labels */}
                <div className="flex mt-2" style={{ paddingLeft: '40px' }}>
                    <div className="flex-1 flex" style={{ gap: `${barGap}px` }}>
                        {data.map((d, i) => {
                            // Show labels only for every Nth bar to avoid clutter
                            const showLabel = timeFrame === '1D'
                                ? i % 3 === 0
                                : timeFrame === '1W'
                                    ? true
                                    : i % 4 === 0 || i === data.length - 1;
                            return (
                                <div key={i} className="text-center" style={{ width: `${barWidth}px` }}>
                                    {showLabel && (
                                        <span className="text-[9px] text-gray-400 font-medium">
                                            {timeFrame === '1D' ? d.label : d.label.split(' ').slice(1).join(' ')}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ======= Main Dashboard Component =======
export default function AdminDashboard() {
    const {
        stats,
        recentBookings,
        lastFetched,
        fetchDashboardData
    } = useAdminStore();

    const [timeFrame, setTimeFrame] = useState<TimeFrame>('1W');

    // Generate mock data for chart
    const allDailyData = useMemo(() => generateMockPayments(), []);
    const hourlyData = useMemo(() => generateHourlyData(), []);

    const chartData = useMemo(() => {
        switch (timeFrame) {
            case '1D':
                return hourlyData;
            case '1W':
                return allDailyData.slice(-7);
            case '1M':
                return allDailyData;
            default:
                return allDailyData.slice(-7);
        }
    }, [timeFrame, allDailyData, hourlyData]);

    useEffect(() => {
        // Trigger background refresh
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Only show full loading if we have absolutely no data yet
    if (!lastFetched.dashboard) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-gray-400 font-medium text-sm">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    const cards = [
        { title: 'Total Order', value: stats.totalOrders, icon: '📦', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
        { title: 'Order Pending', value: stats.pendingOrders, icon: '⏳', color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
        { title: 'Teknisi Aktif', value: stats.activeTechnicians, icon: '✅', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
        { title: 'Revenue (Completed)', value: `Rp ${stats.revenue.toLocaleString('id-ID')}`, icon: '💰', color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
    ];

    const timeFrameOptions: { key: TimeFrame; label: string }[] = [
        { key: '1D', label: '1 Hari' },
        { key: '1W', label: '1 Minggu' },
        { key: '1M', label: '1 Bulan' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500">Selamat datang kembali, Admin!</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`bg-white p-5 rounded-2xl border ${card.border} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${card.color}`}>
                                {card.icon}
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{card.title}</h3>
                        <p className="text-2xl font-extrabold text-gray-800 mt-1">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Income Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="text-2xl">📊</span> Grafik Pendapatan
                        </h2>
                        <p className="text-gray-400 text-sm mt-0.5">Pendapatan dari pembayaran yang berhasil</p>
                    </div>

                    {/* Timeframe Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 gap-1 self-start sm:self-auto">
                        {timeFrameOptions.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setTimeFrame(opt.key)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${timeFrame === opt.key
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <IncomeChart data={chartData} timeFrame={timeFrame} />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span> Aktivitas Terkini
                </h2>
                {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center text-lg">
                                        {booking.status === 'completed' ? '✅' : '📦'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{booking.customer?.full_name || 'Pelanggan'}</p>
                                        <p className="text-xs text-gray-500">{booking.service?.name || 'Service'} • #{booking.id.slice(0, 8)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-tight">{booking.status.replace('_', ' ')}</p>
                                    <p className="text-[10px] text-gray-400">
                                        {new Date(booking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        Belum ada aktivitas terbaru yang dicatat log.
                    </div>
                )}
            </div>
        </div>
    );
}
