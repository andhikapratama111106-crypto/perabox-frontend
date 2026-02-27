import { create } from 'zustand';
import { bookingsAPI, adminAPI } from '@/lib/api';
import { mockTechnicians } from '@/data/mockData';

// Map mock data to admin API format for consistent fallback
const mockTechsAsAdmin = mockTechnicians.map((t) => ({
    id: t.id,
    user_name: t.name,
    user_email: `${t.id}@perabox.id`,
    user_phone: t.phone,
    avatar_url: t.photoUrl,
    rating_average: t.rating,
    total_jobs: t.reviewCount,
    specializations: t.specialties,
    experience_years: parseInt(t.experience || '3'),
    bio: t.bio || '',
    is_available: true,
    has_signed_contract: true,
}));

interface AdminState {
    stats: {
        totalOrders: number;
        pendingOrders: number;
        activeTechnicians: number;
        revenue: number;
    };
    recentBookings: any[];
    technicians: any[];
    orders: any[];
    isLoading: boolean;
    lastFetched: {
        dashboard: number | null;
        technicians: number | null;
        orders: number | null;
    };

    // Actions
    fetchDashboardData: (force?: boolean) => Promise<void>;
    fetchTechnicians: (force?: boolean) => Promise<void>;
    fetchOrders: (params?: any, force?: boolean) => Promise<void>;

    // Optimistic Updates
    updateTechnicianAvailability: (id: string, isAvailable: boolean) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
    stats: {
        totalOrders: 0,
        pendingOrders: 0,
        activeTechnicians: mockTechsAsAdmin.length,
        revenue: 0,
    },
    recentBookings: [],
    technicians: mockTechsAsAdmin, // Initialize with mock data so page renders instantly
    orders: [],
    isLoading: false,
    lastFetched: {
        dashboard: null,
        technicians: null,
        orders: null,
    },

    fetchDashboardData: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        // Cache for 1 minute unless forced
        if (!force && lastFetched.dashboard && now - lastFetched.dashboard < 60000) {
            return;
        }

        set({ isLoading: true });
        try {
            const [bookingsRes, techniciansRes] = await Promise.all([
                bookingsAPI.getAll(),
                adminAPI.getTechnicians()
            ]);

            const bookings = bookingsRes.data || [];
            const technicians = techniciansRes.data || [];

            const totalOrders = bookings.length;
            const pendingOrders = bookings.filter((b: any) => b.status === 'pending').length;
            const activeTechnicians = technicians.filter((t: any) => t.is_available).length;
            const revenue = bookings
                .filter((b: any) => b.status === 'completed')
                .reduce((acc: number, curr: any) => acc + Number(curr.total_price), 0);

            set({
                stats: { totalOrders, pendingOrders, activeTechnicians, revenue },
                recentBookings: bookings.slice(0, 5),
                lastFetched: { ...get().lastFetched, dashboard: now }
            });
        } catch (error) {
            console.error("Store: Failed to fetch dashboard data", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTechnicians: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched.technicians && now - lastFetched.technicians < 60000) {
            return;
        }

        set({ isLoading: true });
        try {
            const response = await adminAPI.getTechnicians();
            const apiTechs = response.data || [];
            // Only replace data if API returned actual results
            if (apiTechs.length > 0) {
                set({
                    technicians: apiTechs,
                    lastFetched: { ...get().lastFetched, technicians: now }
                });
            } else {
                // API returned empty — keep existing mock data, just mark as fetched
                set({ lastFetched: { ...get().lastFetched, technicians: now } });
            }
        } catch (error) {
            console.error("Store: Failed to fetch technicians", error);
            // Keep existing mock data on error — don't clear the state
        } finally {
            set({ isLoading: false });
        }
    },

    fetchOrders: async (params = {}, force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        // Only cache if no specific filters are applied
        const isDefaultFetch = Object.keys(params).length === 0 || (Object.keys(params).length === 1 && params.status === 'all');

        if (!force && isDefaultFetch && lastFetched.orders && now - lastFetched.orders < 60000) {
            return;
        }

        set({ isLoading: true });
        try {
            const response = await bookingsAPI.getAll(params);
            const newOrders = response.data || [];

            // Only update orders list in store if it's the default view to avoid flickering
            if (isDefaultFetch) {
                set({
                    orders: newOrders,
                    lastFetched: { ...get().lastFetched, orders: now }
                });
            } else {
                // If it's a filtered view, we just return it or update a temporary state (not standard in this store)
                // For simplicity, we'll update the orders list but won't mark it as the main cached order set
                set({ orders: newOrders });
            }
        } catch (error) {
            console.error("Store: Failed to fetch orders", error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateTechnicianAvailability: (id: string, isAvailable: boolean) => {
        set((state) => ({
            technicians: state.technicians.map((t) =>
                t.id === id ? { ...t, is_available: isAvailable } : t
            ),
            stats: {
                ...state.stats,
                activeTechnicians: state.stats.activeTechnicians + (isAvailable ? 1 : -1)
            }
        }));
    }
}));
