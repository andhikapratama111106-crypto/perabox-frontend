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
        photoUrl: '/technician_1.jpg',
        rating: 4.9,
        reviewCount: 128,
        specialties: ['Service AC', 'Cuci AC'],
        basePrice: 75000,
        phone: '6281234567890',
        bio: 'Berpengalaman lebih dari 5 tahun dalam menangani berbagai jenis kerusakan AC. Cepat, rapi, dan jujur.'
    },
    {
        id: 'tech-002',
        name: 'Ahmad Rizki',
        photoUrl: '/technician_2.jpg',
        rating: 4.8,
        reviewCount: 95,
        specialties: ['Bongkar Pasang', 'Service Besar'],
        basePrice: 150000,
        phone: '6281234567891',
        bio: 'Spesialis bongkar pasang AC dengan pengerjaan yang presisi untuk semua merk AC.'
    },
    {
        id: 'tech-003',
        name: 'Dedi Kurniawan',
        photoUrl: '/technician_3.jpg',
        rating: 4.7,
        reviewCount: 64,
        specialties: ['Cuci AC', 'Freon Refill'],
        basePrice: 85000,
        phone: '6281234567892',
        bio: 'Ahli dalam perawatan rutin AC dan pengisian freon. Mengutamakan kepuasan pelanggan.'
    },
    {
        id: 'tech-004',
        name: 'Sari Wulandari',
        photoUrl: '/technician_4.jpg',
        rating: 5.0,
        reviewCount: 42,
        specialties: ['Cuci AC', 'Perbaikan Ringan'],
        basePrice: 75000,
        phone: '6281234567893',
        bio: 'Teknisi ramah dan teliti dalam pengerjaan pembersihan unit AC agar tetap dingin maksimal.'
    },
    {
        id: 'tech-005',
        name: 'Lestari Putri',
        photoUrl: '/technician_5.jpg',
        rating: 4.8,
        reviewCount: 110,
        specialties: ['Bongkar Pasang', 'Instalasi'],
        basePrice: 150000,
        phone: '6281234567894',
        bio: 'Multi-skill teknisi dengan jam terbang tinggi. Solusi lengkap untuk urusan rumah Anda.'
    },
    {
        id: 'tech-006',
        name: 'Dewi Anggraini',
        photoUrl: '/technician_6.jpg',
        rating: 4.9,
        reviewCount: 88,
        specialties: ['Cleaning & Maintenance'],
        basePrice: 80000,
        phone: '6281234567895',
        bio: 'Ahli instalasi dan perbaikan sistem kelistrikan bangunan. Aman dan bersertifikat.'
    },
    {
        id: 'tech-007',
        name: 'Siti Aminah',
        photoUrl: '/technician_7.jpg',
        rating: 4.6,
        reviewCount: 56,
        specialties: ['Service AC', 'Isi Freon'],
        basePrice: 85000,
        phone: '6281234567896',
        bio: 'Cekatan dalam memberikan layanan pembersihan rumah secara menyeluruh.'
    },
    {
        id: 'tech-008',
        name: 'Andi Wijaya',
        photoUrl: '/technician_8.jpg',
        rating: 4.8,
        reviewCount: 72,
        specialties: ['Service AC', 'Cuci AC'],
        basePrice: 75000,
        phone: '628123456789b',
        experience: '4 Tahun',
        bio: 'Siap membantu Anda mencuci AC agar performa unit kembali seperti baru dengan pengerjaan bersih.'
    },
    {
        id: 'tech-009',
        name: 'Rudi Tabuti',
        photoUrl: '/technician_9.jpg',
        rating: 4.9,
        reviewCount: 88,
        specialties: ['Service AC', 'Isi Freon'],
        basePrice: 100000,
        phone: '628123456789c',
        experience: '6 Tahun',
        bio: 'Memberikan garansi pengerjaan untuk setiap perbaikan AC. Handal dan terpercaya.'
    },
    {
        id: 'tech-010',
        name: 'Deni Setiawan',
        photoUrl: '/technician_10.jpg',
        rating: 4.7,
        reviewCount: 54,
        specialties: ['Service AC', 'Bongkar Pasang'],
        basePrice: 150000,
        phone: '628123456789d',
        experience: '5 Tahun',
        bio: 'Berpengalaman dalam instalasi unit AC baru baik split maupun central.'
    },
    {
        id: 'tech-011',
        name: 'Indah Permata',
        photoUrl: '/technician_11.jpg',
        rating: 4.8,
        reviewCount: 38,
        specialties: ['Service AC', 'Listrik'],
        basePrice: 120000,
        phone: '628123456789e',
        experience: '3 Tahun',
        bio: 'Mengerjakan perbaikan AC dan instalasi listrik dengan standar keamanan tinggi.'
    },
    {
        id: 'tech-012',
        name: 'Citra Kirana',
        photoUrl: '/technician_12.jpg',
        rating: 4.9,
        reviewCount: 65,
        specialties: ['Kebersihan', 'Plambing'],
        basePrice: 80000,
        phone: '628123456789f',
        experience: '4 Tahun',
        bio: 'Layanan homecare terpercaya untuk kebersihan dan perbaikan pipa air bocor.'
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
