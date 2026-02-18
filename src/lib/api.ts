import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perabox-backend.vercel.app';
console.log("[Perabox Debug] API_URL:", API_URL);

export const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data: any) => api.post('/auth/register', data),
    login: (data: any) => api.post('/auth/login', data),
    getCurrentUser: () => api.get('/auth/me'),
};

// Services API
export const servicesAPI = {
    getCategories: () => api.get('/services/categories'),
    getServices: (categoryId?: string) =>
        api.get('/services', { params: { category_id: categoryId } }),
    getService: (id: string) => api.get(`/services/${id}`),
};

// Bookings API
export const bookingsAPI = {
    create: (data: any) => api.post('/bookings', data),
    getAll: (params?: any) => api.get('/bookings', { params }),
    getById: (id: string) => api.get(`/bookings/${id}`),
    updateStatus: (id: string, status: string) =>
        api.patch(`/bookings/${id}/status`, { new_status: status }),
};

export const adminAPI = {
    // Users
    getUsers: (params?: any) => api.get('/users', { params }),
    updateUserStatus: (id: string, isActive: boolean) => api.patch(`/users/${id}/status`, null, { params: { is_active: isActive } }),

    // Technicians
    getTechnicians: () => api.get('/technicians'),
    updateTechnicianAvailability: (id: string, isAvailable: boolean) => api.patch(`/technicians/${id}`, { is_available: isAvailable }),
    updateTechnician: (id: string, data: any) => api.patch(`/technicians/${id}`, data),

    // Admin Booking Actions
    assignTechnician: (bookingId: string, technicianId: string) => api.patch(`/bookings/${bookingId}/assign`, { technician_id: technicianId }),
};

export const techniciansAPI = {
    getAvailable: () => api.get('/technicians/available'),
};

export const paymentAPI = {
    getQRIS: (paymentId: string) => api.get(`/payments/${paymentId}/qris`),
    verify: (paymentId: string) => api.post(`/payments/${paymentId}/verify`),
};

export default api;
