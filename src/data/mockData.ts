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
        bio: 'Spesialis sistem pendingin udara dengan sertifikasi BNSP. Mengutamakan ketepatan dan efisiensi dalam setiap pengerjaan.'
    },
    {
        id: 'tech-002',
        name: 'Ahmad Rizki',
        photoUrl: '/technician_7.jpg',
        rating: 4.8,
        reviewCount: 95,
        specialties: ['Service AC', 'Bongkar Pasang'],
        basePrice: 150000,
        phone: '6281234567891',
        experience: '10 Tahun',
        bio: 'Ahli dalam pengerjaan bongkar pasang unit AC untuk hunian maupun gedung perkantoran dengan standar profesional.'
    },
    {
        id: 'tech-003',
        name: 'Dedi Kurniawan',
        photoUrl: '/technician_6.jpg',
        rating: 4.7,
        reviewCount: 64,
        specialties: ['Cuci AC', 'Isi Freon'],
        basePrice: 85000,
        phone: '6281234567892',
        experience: '5 Tahun',
        bio: 'Menguasai teknik perawatan rutin unit AC agar tetap hemat energi dan memberikan kesejukan maksimal.'
    },
    {
        id: 'tech-004',
        name: 'Sari Wulandari',
        photoUrl: '/technician_1.jpg',
        rating: 5.0,
        reviewCount: 42,
        specialties: ['Cuci AC', 'Deep Cleaning'],
        basePrice: 75000,
        phone: '6281234567893',
        experience: '6 Tahun',
        bio: 'Sangat teliti dalam pembersihan menyeluruh unit AC untuk memastikan udara yang dihasilkan bersih dan sehat.'
    },
    {
        id: 'tech-005',
        name: 'Lestari Putri',
        photoUrl: '/technician_2.jpg',
        rating: 4.8,
        reviewCount: 110,
        specialties: ['Service AC', 'Instalasi'],
        basePrice: 150000,
        phone: '6281234567894',
        experience: '7 Tahun',
        bio: 'Berpengalaman luas dalam menangani berbagai kendala teknis pada unit AC tipe split maupun inverter.'
    },
    {
        id: 'tech-006',
        name: 'Dewi Anggraini',
        photoUrl: '/technician_4.jpg',
        rating: 4.9,
        reviewCount: 88,
        specialties: ['Cuci AC', 'Maintenance'],
        basePrice: 80000,
        phone: '6281234567895',
        experience: '4 Tahun',
        bio: 'Fokus pada perawatan preventif untuk memperpanjang usia pakai unit AC Anda dengan pengerjaan yang rapi.'
    },
    {
        id: 'tech-007',
        name: 'Siti Aminah',
        photoUrl: '/technician_5.jpg',
        rating: 4.6,
        reviewCount: 56,
        specialties: ['Cuci AC', 'Service Rutin'],
        basePrice: 85000,
        phone: '6281234567896',
        experience: '5 Tahun',
        bio: 'Spesialis perawatan rutin AC yang menjamin setiap sudut unit dibersihkan dengan sempurna dan bebas kuman.'
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
        bio: 'Memastikan tekanan freon AC Anda selalu optimal untuk pendinginan yang efisien dan hemat listrik.'
    },
    {
        id: 'tech-009',
        name: 'Bambang Subiakto',
        photoUrl: '/technician_9.jpg',
        rating: 4.9,
        reviewCount: 88,
        specialties: ['Service AC', 'Perbaikan'],
        basePrice: 100000,
        phone: '628123456789c',
        experience: '6 Tahun',
        bio: 'Teknisi handal untuk mendiagnosa dan memperbaiki kerusakan modul elektronik pada unit AC modern.'
    },
    {
        id: 'tech-010',
        name: 'Hadi Prayitno',
        photoUrl: '/technician_10.jpg',
        rating: 4.7,
        reviewCount: 54,
        specialties: ['Service AC', 'Bongkar Pasang'],
        basePrice: 150000,
        phone: '628123456789d',
        experience: '9 Tahun',
        bio: 'Ahli dalam instalasi unit AC baru dengan penataan pipa yang estetik dan performa yang terjamin.'
    },
    {
        id: 'tech-011',
        name: 'Rian Hidayat',
        photoUrl: '/technician_11.jpg',
        rating: 4.8,
        reviewCount: 38,
        specialties: ['Service AC', 'Cuci AC'],
        basePrice: 120000,
        phone: '628123456789e',
        experience: '12 Tahun',
        bio: 'Senior teknisi AC yang mengutamakan kepuasan pelanggan melalui pengerjaan yang jujur dan transparan.'
    },
    {
        id: 'tech-012',
        name: 'Budi Santoso',
        photoUrl: '/technician_12.jpg',
        rating: 4.9,
        reviewCount: 65,
        specialties: ['Service AC', 'Isi Freon'],
        basePrice: 80000,
        phone: '628123456789f',
        experience: '3 Tahun',
        bio: 'Teknisi berdedikasi tinggi yang selalu siap memberikan solusi tepat untuk masalah AC yang kurang dingin.'
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
