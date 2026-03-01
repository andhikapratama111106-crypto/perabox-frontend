export interface Technician {
    id: string;
    name: string;
    photoUrl: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    basePrice: number;
    phone: string; // for WA
    experience?: string;
    specialty?: string;
    bio?: string;
}

export const mockTechnicians: Technician[] = [
    {
        id: 'tech-001',
        name: 'Irma Santoso',
        photoUrl: '/technician_3.jpg',
        rating: 4.9,
        reviewCount: 128,
        specialties: ['Service AC', 'Cuci AC'],
        basePrice: 75000,
        phone: '6281234567890',
        experience: '8 Tahun',
        bio: 'Spesialis sistem pendingin udara dengan sertifikasi BNSP. Mengutamakan ketepatan dan efisiensi.'
    },
    {
        id: 'tech-002',
        name: 'Ahmad Rizki',
        photoUrl: '/technician_7.jpg',
        rating: 4.8,
        reviewCount: 95,
        specialties: ['Bongkar Pasang', 'Service Besar'],
        basePrice: 150000,
        phone: '6281234567891',
        experience: '10 Tahun',
        bio: 'Ahli dalam bongkar pasang unit AC untuk hunian maupun gedung perkantoran.'
    },
    {
        id: 'tech-003',
        name: 'Dedi Kurniawan',
        photoUrl: '/technician_6.jpg',
        rating: 4.7,
        reviewCount: 64,
        specialties: ['Cuci AC', 'Freon Refill'],
        basePrice: 85000,
        phone: '6281234567892',
        experience: '5 Tahun',
        bio: 'Menguasai teknik perawatan unit AC agar hemat energi dan tetap dingin maksimal.'
    },
    {
        id: 'tech-004',
        name: 'Sari Wulandari',
        photoUrl: '/technician_1.jpg',
        rating: 5.0,
        reviewCount: 42,
        specialties: ['Layanan Pembersihan', 'Deep Cleaning'],
        basePrice: 75000,
        phone: '6281234567893',
        experience: '6 Tahun',
        bio: 'Sangat teliti dalam pengerjaan pembersihan interior dan perawatan homecare.'
    },
    {
        id: 'tech-005',
        name: 'Lestari Putri',
        photoUrl: '/technician_2.jpg',
        rating: 4.8,
        reviewCount: 110,
        specialties: ['Listrik', 'Instalasi'],
        basePrice: 150000,
        phone: '6281234567894',
        experience: '7 Tahun',
        bio: 'Teknisi multi-skill yang handal dalam perbaikan sistem kelistrikan dan pipa air.'
    },
    {
        id: 'tech-006',
        name: 'Dewi Anggraini',
        photoUrl: '/technician_4.jpg',
        rating: 4.9,
        reviewCount: 88,
        specialties: ['Cleaning Service', 'Maintenance'],
        basePrice: 80000,
        phone: '6281234567895',
        experience: '4 Tahun',
        bio: 'Berpengalaman dalam mengelola kebersihan unit apartemen dan rumah tinggal.'
    },
    {
        id: 'tech-007',
        name: 'Siti Aminah',
        photoUrl: '/technician_5.jpg',
        rating: 4.6,
        reviewCount: 56,
        specialties: ['Sanitasi', 'Homecare'],
        basePrice: 85000,
        phone: '6281234567896',
        experience: '5 Tahun',
        bio: 'Spesialis sanitasi dan pembersihan sudut-sudut sulit di area dapur dan kamar mandi.'
    },
    {
        id: 'tech-008',
        name: 'Andi Wijaya',
        photoUrl: '/technician_8.jpg',
        rating: 4.8,
        reviewCount: 72,
        specialties: ['Service AC', 'Isi Freon'],
        basePrice: 75000,
        phone: '628123456789b',
        experience: '4 Tahun',
        bio: 'Fokus pada hasil pengerjaan yang bersih tanpa meninggalkan bekas kotoran.'
    },
    {
        id: 'tech-009',
        name: 'Rudi Tabuti',
        photoUrl: '/technician_9.jpg',
        rating: 4.9,
        reviewCount: 88,
        specialties: ['Teknisi Listrik', 'CCTV'],
        basePrice: 100000,
        phone: '628123456789c',
        experience: '6 Tahun',
        bio: 'Ahli dalam perbaikan arus pendek dan instalasi perangkat keamanan rumah.'
    },
    {
        id: 'tech-010',
        name: 'Deni Setiawan',
        photoUrl: '/technician_10.jpg',
        rating: 4.7,
        reviewCount: 54,
        specialties: ['Plambing', 'Pompa Air'],
        basePrice: 150000,
        phone: '628123456789d',
        experience: '9 Tahun',
        bio: 'Solusi cepat untuk masalah bocoran pipa dan perbaikan pompa air yang mati total.'
    },
    {
        id: 'tech-011',
        name: 'Indah Permata',
        photoUrl: '/technician_11.jpg',
        rating: 4.8,
        reviewCount: 38,
        specialties: ['Cat Dinding', 'Handyman'],
        basePrice: 120000,
        phone: '628123456789e',
        experience: '12 Tahun',
        bio: 'Senior handyman yang menguasai berbagai pekerjaan sipil ringan untuk rumah Anda.'
    },
    {
        id: 'tech-012',
        name: 'Citra Kirana',
        photoUrl: '/technician_12.jpg',
        rating: 4.9,
        reviewCount: 65,
        specialties: ['Home Security', 'Smart Home'],
        basePrice: 80000,
        phone: '628123456789f',
        experience: '3 Tahun',
        bio: 'Membantu modernisasi hunian Anda dengan instalasi perangkat smart home terkini.'
    }
];

export const timeSlots = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00"
];

export const serviceTypes = [
    { id: 'srv-1', name: 'AC Cleaning', price: 80000 },
    { id: 'srv-2', name: 'AC Installation', price: 300000 },
    { id: 'srv-3', name: 'Freon Refill', price: 200000 },
    { id: 'srv-4', name: 'AC Repair', price: 150000 },
    { id: 'srv-5', name: 'Emergency Call (Direct)', price: 250000 },
];
