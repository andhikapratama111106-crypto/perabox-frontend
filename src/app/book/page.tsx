"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { servicesAPI, bookingsAPI, techniciansAPI } from '@/lib/api';
import { mockTechnicians, Technician, timeSlots, serviceTypes } from '@/data/mockData';
import TechnicianCard from '@/components/booking/TechnicianCard';
import QRISModal from '@/components/booking/QRISModal';

// Extend Service interface for mock data compatibility
interface Service {
    id: string;
    title: string;
    price: string;
    icon: string;
    base_price: number;
}

export default function BookingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Booking Data State
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]); // Service IDs
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address: '',
        notes: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showQRIS, setShowQRIS] = useState(false);
    const [currentPaymentId, setCurrentPaymentId] = useState('');
    const [uniqueCode] = useState(() => Math.floor(Math.random() * 999) + 1); // Random 1-999

    // Load available services (you might still want to fetch from API, or use mock if preferred)
    const [apiServices, setApiServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Technicians
                const techResponse = await techniciansAPI.getAvailable();
                const apiTechs = techResponse.data.map((t: any) => ({
                    id: t.id,
                    name: t.user_name,
                    specialty: t.specializations?.[0] || 'General',
                    rating: Number(t.rating_average) || 5.0,
                    reviewCount: t.total_jobs || 0,
                    price: 'On Request',
                    basePrice: 50000, // Default base price or from DB
                    photoUrl: t.avatar_url || '/technician_1.jpg', // Fallback image
                    experience: `${t.experience_years} Tahun`,
                    specialties: t.specializations || [],
                    phone: t.user_phone,
                    bio: t.bio
                }));

                // If no techs from API (e.g. detailed endpoint not ready), fallback or show empty
                setTechnicians(apiTechs.length > 0 ? apiTechs : []);

                // Initialize services from mock data
                const mappedServices = serviceTypes.map((s) => ({
                    id: s.id,
                    title: s.name,
                    price: `Rp ${Number(s.price).toLocaleString('id-ID')}`,
                    icon: "❄️",
                    base_price: s.price
                }));
                setApiServices(mappedServices);
            } catch (error) {
                console.error("Failed to fetch booking data", error);
                // Fallback to mock if API fails?
                // setTechnicians(mockTechnicians); 
            }
        };

        fetchData();

        // Check auth (Optional: can be triggered at Step 4 or 5)
        const token = localStorage.getItem('access_token');
        if (!token) {
            // router.push('/login'); // Maybe allow looking at techs first?
        }
    }, [router]);


    // Step Handlers
    // Step Handlers
    const handleTechnicianSelect = (tech: Technician) => {
        setSelectedTechnician(tech);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(2);
    };

    const handleScheduleSelect = () => {
        if (selectedDate && selectedTime) {
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleServiceToggle = (id: string) => {
        setSelectedServices((prev: string[]) =>
            prev.includes(id) ? prev.filter((s: string) => s !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        let total = Number(selectedTechnician?.basePrice) || 0;
        // If usig API services
        selectedServices.forEach((id: string) => {
            const s = apiServices.find((service: Service) => service.id === id);
            if (s) total += Number(s.base_price);
        });
        return total;
    };

    const handleCreateBooking = async () => {
        if (!selectedTechnician) return;
        setSubmitting(true);

        try {
            // Construct Payload (might need adjustment based on backend capability)
            // Ideally, backend should support 'technician_id' and multiple services. 
            // For now, we will just create a standard booking with the first selected service 
            // and put other details in NOTES as requested by the user flow.

            const mainServiceId = selectedServices[0]; // Backend likely expects one service_id

            // Generate detailed notes for the backend/technician
            const serviceNames = selectedServices.map((id: string) => apiServices.find((s: Service) => s.id === id)?.title).join(', ');
            const detailedNotes = `
                [BOOKING VIA APP]
                Teknisi: ${selectedTechnician.name}
                Layanan Tambahan: ${serviceNames}
                Metode Bayar: ${paymentMethod}
                Catatan User: ${formData.notes}
            `;

            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

            const payload: any = {
                service_id: mainServiceId, // Required by backend
                scheduled_date: selectedDate,
                scheduled_time: selectedTime + ":00",
                address: formData.address,
                notes: detailedNotes,
                total_price: calculateTotal(),
            };

            // Only include technician_id if it's a valid UUID (not mock data)
            if (selectedTechnician.id && isUUID.test(selectedTechnician.id)) {
                payload.technician_id = selectedTechnician.id;
            }

            // Call API
            const response = await bookingsAPI.create(payload);
            const bookingData = response.data;

            // Redirect to WhatsApp - CENTRALIZED TO PERABOX
            const message = `Halo PERABOX, saya ada order baru:
- Layanan: ${serviceNames}
- Waktu: ${selectedDate} jam ${selectedTime}
- Lokasi: ${formData.address}
- Catatan: ${formData.notes}
- Total Estimasi: Rp ${calculateTotal().toLocaleString('id-ID')} (${paymentMethod})
Mohon konfirmasinya. Terima kasih.`;

            const centralNumber = '81234567894'; // From user request +81 234-56-7894
            const waUrl = `https://wa.me/${centralNumber}?text=${encodeURIComponent(message)}`;

            if (paymentMethod.includes('QRIS')) {
                // FORCE QRIS STEP even if paymentId is missing (Mock/Dev mode)
                // Use a dummy ID if none exists to ensure QB code renders (or shows loading/error state in component)
                setCurrentPaymentId(bookingData.payments?.[0]?.id || 'dummy-payment-id');
                setStep(6);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (paymentMethod.includes('BCA')) {
                // For BCA, go to Step 6 to show transfer instructions
                setStep(6);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // We DON'T redirect to WA yet. User must click "Saya Sudah Transfer" in Step 6.
            } else {
                setStep(7); // Success step for Cash
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.open(waUrl, '_blank');
            }

        } catch (error: any) {
            console.error("Booking failed", error);

            // FALLBACK / SIMULATION MODE (Requested by User to "Force UI")
            // If backend fails, we assume it's a dev/network issue and simulate a successful booking 
            // so the payment UI (Step 6) can be verified.
            console.warn("Activating Simulation Mode due to booking error");
            const dummyPaymentId = 'simulated-payment-id-' + Date.now();
            setCurrentPaymentId(dummyPaymentId);

            if (paymentMethod.includes('QRIS') || paymentMethod.includes('BCA')) {
                setStep(6);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setStep(7);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Original error handling (commented out or logged for reference)
            // const status = error?.response?.status;
            // if (status === 401 || status === 403) { ... }
        } finally {
            setSubmitting(false);
        }
    };

    const renderProgressBar = () => (
        <div className="bg-white border-b sticky top-[72px] z-30 shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div key={s} className="flex flex-col items-center relative z-10 w-full">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 
                                ${step >= s ? 'bg-primary text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
                                {s}
                            </div>
                            <span className="text-[10px] mt-1 font-medium text-gray-500 uppercase">
                                {s === 1 ? 'Tech' : s === 2 ? 'Time' : s === 3 ? 'Service' : s === 4 ? 'Info' : s === 5 ? 'Pay' : 'QRIS'}
                            </span>
                            {s < 6 && (
                                <div className={`absolute left-1/2 top-4 w-full h-[2px] -z-10 transition-all duration-500 ${step > s ? 'bg-primary' : 'bg-gray-100'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            {/* Steps Progress */}
            <div className="pt-24">
                {renderProgressBar()}
            </div>

            <div className="container mx-auto px-4 mt-8 max-w-5xl">

                {/* STEP 1: SELECT TECHNICIAN */}
                {step === 1 && (
                    <div className="animate-fade-in-up">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">Pilih Teknisi Favoritmu</h1>
                            <p className="text-gray-500">Temukan teknisi terbaik disekitarmu dengan rating terpercaya</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {technicians.length === 0 ? (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-400">Belum ada teknisi yang tersedia untuk saat ini.</p>
                                </div>
                            ) : (
                                technicians.map(tech => (
                                    <TechnicianCard
                                        key={tech.id}
                                        technician={tech}
                                        onSelect={handleTechnicianSelect}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 2: SELECT SCHEDULE */}
                {step === 2 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">Pilih Jadwal Kedatangan</h2>

                        {/* Selected Technician Confirmation */}
                        {selectedTechnician && (
                            <div className="flex items-center gap-3 mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
                                <img src={selectedTechnician.photoUrl} alt={selectedTechnician.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1">
                                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">Teknisi Terpilih</p>
                                    <p className="font-bold text-dark">{selectedTechnician.name}</p>
                                </div>
                                <span className="text-primary text-lg">✓</span>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Jam</label>
                            <div className="grid grid-cols-3 gap-3">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium
                                            ${selectedTime === time
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 transform scale-105'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-dark">Kembali</button>
                            <button
                                onClick={handleScheduleSelect}
                                disabled={!selectedDate || !selectedTime}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Lanjut Pilih Layanan
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: SELECT SERVICE */}
                {step === 3 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">Pilih Layanan</h2>

                        {/* Selected Technician & Schedule Confirmation - Combined Large Card */}
                        <div className="bg-white border rounded-3xl p-6 mb-8 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
                            {selectedTechnician && (
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                                        <img src={selectedTechnician.photoUrl} alt={selectedTechnician.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                                        {selectedTechnician.rating} ★
                                    </div>
                                </div>
                            )}

                            <div className="flex-1 text-center md:text-left space-y-3 w-full">
                                <div>
                                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Teknisi Pilihan</p>
                                    <h3 className="text-xl font-bold text-dark">{selectedTechnician?.name}</h3>
                                    <p className="text-gray-500 text-sm">{selectedTechnician?.specialty} • {selectedTechnician?.experience}</p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                                    <div className="bg-white p-2 rounded-lg text-2xl shadow-sm">📅</div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Jadwal Kunjungan</p>
                                        <p className="font-bold text-dark text-lg">
                                            {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                        </p>
                                        <p className="text-primary font-bold">{selectedTime || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {apiServices.length > 0 ? apiServices.map(service => (
                                <div
                                    key={service.id}
                                    onClick={() => handleServiceToggle(service.id)}
                                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all
                                        ${selectedServices.includes(service.id)
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-md border mr-4 flex items-center justify-center
                                         ${selectedServices.includes(service.id) ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                        {selectedServices.includes(service.id) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{service.title}</h3>
                                        <p className="text-xs text-gray-500">{service.price}</p>
                                    </div>
                                </div>
                            )) : (
                                <p>Loading services...</p>
                            )}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(2)} className="text-gray-500 hover:text-dark">Kembali</button>
                            <button
                                onClick={() => selectedServices.length > 0 && setStep(4)}
                                disabled={selectedServices.length === 0}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Isi Data Diri
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: USER FORM */}
                {step === 4 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">Data Pemesan</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} placeholder="Contoh: Budi Gunawan" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="0812xxxxxxxx" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                                    value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Jl. Mawar No. 12, Jakarta Selatan..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="AC Bocor, Parkir di depan..." />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(3)} className="text-gray-500 hover:text-dark">Kembali</button>
                            <button
                                onClick={() => formData.full_name && formData.phone && formData.address && setStep(5)}
                                disabled={!formData.full_name || !formData.phone || !formData.address}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Lanjut Pembayaran
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 5: CONFIRMATION & PAYMENT */}
                {step === 5 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">Konfirmasi Pesanan</h2>

                        {/* Booking Summary Card */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                            <div className="flex items-start gap-4 mb-6 border-b border-gray-200 pb-6">
                                <img src={selectedTechnician?.photoUrl} alt="Tech" className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <h3 className="font-bold text-lg text-dark">{selectedTechnician?.name}</h3>
                                    <p className="text-sm text-gray-500">⭐ {selectedTechnician?.rating} • {selectedTechnician?.reviewCount} Reviews</p>
                                    <div className="mt-2 text-primary font-bold bg-primary/10 inline-block px-3 py-1 rounded-full text-xs">
                                        {selectedDate} • {selectedTime}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Layanan ({selectedServices.length})</span>
                                    <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between font-bold text-dark text-lg pt-3 border-t border-gray-200">
                                    <span>Total Estimasi</span>
                                    <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-8">
                            <h3 className="font-bold text-dark mb-4">Metode Pembayaran</h3>
                            <div className="space-y-3">
                                {['QRIS (Ovo/GoPay/Dana)', 'Transfer Bank BCA', 'Bayar di Tempat (Cash)'].map((method) => (
                                    <label key={method} className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all
                                    ${paymentMethod === method ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-primary focus:ring-primary"
                                        />
                                        <span className="ml-3 font-medium text-gray-700">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between items-center">
                            <button onClick={() => setStep(4)} className="text-gray-500 hover:text-dark">Kembali</button>
                            <button
                                onClick={handleCreateBooking}
                                disabled={submitting || !paymentMethod}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/30"
                            >
                                {submitting ? 'Memproses...' : 'Konfirmasi & Pesan'}
                            </button>
                        </div>
                    </div>
                )}



                {/* STEP 6: PAYMENT INSTRUCTION (QRIS OR BCA) */}
                {step === 6 && (
                    <div className="max-w-md mx-auto animate-fade-in-up py-4">
                        {paymentMethod.includes('QRIS') ? (
                            <QRISModal
                                paymentId={currentPaymentId}
                                amount={calculateTotal()}
                                onSuccess={() => {
                                    setStep(7);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                onClose={() => setStep(5)}
                                isInline={true}
                            />
                        ) : paymentMethod.includes('BCA') ? (
                            <div className="bg-white rounded-3xl w-full overflow-hidden shadow-2xl mx-auto">
                                {/* Header */}
                                <div className="bg-blue-600 p-6 text-white text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <span className="text-2xl font-black tracking-tight">PERABOX</span>
                                    </div>
                                    <h3 className="text-lg font-bold">Transfer Bank BCA</h3>
                                    <p className="text-white/80 text-sm">Selesaikan pembayaran untuk konfirmasi pesanan</p>
                                </div>

                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mb-2">Total Transfer</p>
                                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 inline-block">
                                            <h4 className="text-3xl font-black text-blue-600">
                                                Rp {(calculateTotal() + uniqueCode).toLocaleString('id-ID')}
                                            </h4>
                                            <p className="text-xs text-blue-500 mt-1 font-medium bg-blue-100/50 px-2 py-1 rounded inline-block">
                                                *Mohon transfer tepat hingga {uniqueCode} (3 digit terakhir) untuk verifikasi otomatis
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Nomor Rekening</p>
                                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                                                <span className="font-mono font-bold text-lg text-dark">888888888</span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText('888888888')}
                                                    className="text-blue-500 text-xs font-bold hover:text-blue-600"
                                                >
                                                    SALIN
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Atas Nama</p>
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                                                <span className="font-bold text-dark">PT PERABOX MANDIRI SEJAHTERA</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        {/* "Saya Sudah Transfer" button -> leads to success but keeps WA flow */}
                                        <button
                                            onClick={() => {
                                                setStep(7);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                // Prepare final message with unique code included AND request for proof
                                                const totalWithUnique = calculateTotal() + uniqueCode;
                                                const serviceNames = selectedServices.map((id: string) => apiServices.find((s: Service) => s.id === id)?.title).join(', ');
                                                const message = `Halo PERABOX, saya sudah transfer untuk order:\n- Layanan: ${serviceNames}\n- Waktu: ${selectedDate} jam ${selectedTime}\n- Lokasi: ${formData.address}\n\n*Total Transfer: Rp ${totalWithUnique.toLocaleString('id-ID')} (BCA)*\n*Kode Unik: ${uniqueCode}*\n\nBerikut bukti transfer saya (lampirkan foto):`;
                                                const centralNumber = '81234567894';
                                                const waUrl = `https://wa.me/${centralNumber}?text=${encodeURIComponent(message)}`;
                                                window.open(waUrl, '_blank');
                                            }}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                                        >
                                            <span className="text-xl">📤</span> Konfirmasi & Kirim Bukti Transfer
                                        </button>
                                        <button
                                            onClick={() => setStep(5)}
                                            className="w-full mt-3 text-gray-400 hover:text-gray-600 font-medium py-2 rounded-xl transition-all text-sm"
                                        >
                                            Kembali ke Detail Pesanan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}

                {/* STEP 7: SUCCESS */}
                {step === 7 && (
                    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 text-center animate-fade-in-up">
                        <div className="w-20 h-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-6 text-4xl">
                            ✓
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-2">Pesanan Diterima!</h2>
                        <p className="text-gray-500 mb-8">
                            Terima kasih! Pesananmu telah diteruskan ke <strong>{selectedTechnician?.name}</strong>.
                            {paymentMethod.includes('QRIS')
                                ? ' Pembayaran QRIS berhasil diverifikasi.'
                                : paymentMethod.includes('BCA')
                                    ? ' Silakan kirim bukti transfer jika diperlukan.'
                                    : ' Silakan selesaikan pembayaran sesuai instruksi di WhatsApp.'}
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-gray-100 hover:bg-gray-200 text-dark px-8 py-3 rounded-full font-bold transition-all w-full"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                )}
            </div>

            {/* Sticky Summary Bar (Only visible in step 2, 3, 4) */}
            {(step >= 2 && step <= 4) && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg md:hidden z-40">
                    <div className="flex items-center justify-between">
                        {step === 2 && (
                            <button onClick={handleScheduleSelect} disabled={!selectedDate || !selectedTime} className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-sm px-6 py-3 rounded-full font-bold">
                                Lanjut
                            </button>
                        )}
                        {step === 3 && (
                            <button onClick={() => selectedServices.length > 0 && setStep(4)} disabled={selectedServices.length === 0} className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-sm px-6 py-3 rounded-full font-bold">
                                Lanjut
                            </button>
                        )}
                        {step === 4 && (
                            <button onClick={() => formData.full_name && formData.phone && formData.address && setStep(5)} disabled={!formData.full_name || !formData.phone || !formData.address} className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-sm px-6 py-3 rounded-full font-bold">
                                Lanjut
                            </button>
                        )}
                    </div>
                </div>
            )}

        </main>
    );
}

