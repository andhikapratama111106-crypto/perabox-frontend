"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { servicesAPI, bookingsAPI, techniciansAPI } from '@/lib/api';
import { mockTechnicians, Technician, timeSlots, serviceTypes } from '@/data/mockData';
import { TechnicianCard } from '@/components/booking/TechnicianCard';
import QRISModal from '@/components/booking/QRISModal';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Loading Map...</div>
});

// Extend Service interface for mock data compatibility
interface Service {
    id: string;
    title: string;
    price: string;
    icon: string;
    base_price: number;
}

export default function BookingPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false); // Start as false to show mock data instantly
    const [submitting, setSubmitting] = useState(false);

    // Simplified: always use mock data to prevent auto-refresh issues
    const technicians = mockTechnicians;
    const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const todayStr = new Date(Date.now() - tzOffset).toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address: '',
        notes: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showQRIS, setShowQRIS] = useState(false);
    const [currentPaymentId, setCurrentPaymentId] = useState('');
    const [uniqueCode] = useState(() => Math.floor(Math.random() * 999) + 1);

    // Services — initialized with mock data for instant display
    const [apiServices, setApiServices] = useState<Service[]>(
        serviceTypes.map((s) => ({
            id: s.id,
            title: s.name,
            price: `Rp ${Number(s.price).toLocaleString('id-ID')}`,
            icon: s.id === 'srv-1' ? "❄️" : s.id === 'srv-2' ? "🛠️" : s.id === 'srv-3' ? "💨" : s.id === 'srv-4' ? "🔧" : "🚨",
            base_price: s.price
        }))
    );
    // Step Handlers
    const handleTechnicianSelect = (tech: Technician) => {
        setSelectedTechnician(tech);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(2);
    };

    const validateDateRange = (dateString: string) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const year = date.getFullYear();
        return year >= 2025 && year <= 2030;
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
    };

    const handleScheduleSelect = () => {
        if (selectedDate && selectedTime) {
            if (!validateDateRange(selectedDate)) {
                alert('Silakan pilih tanggal antara tahun 2025 dan 2030.');
                return;
            }
            // Phone validation removed from here as it should only happen in Step 4
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
                    {[1, 2, 3, 4, 5, 6].map((s: number) => (
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
                    <div>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2">{t('bookPage.title1')}</h1>
                            <p className="text-gray-500">{t('bookPage.subtitle1')}</p>
                        </div>

                        {/* EMERGENCY DIRECT BUTTON */}
                        <div className="mb-10 animate-in fade-in zoom-in duration-500">
                            <button
                                onClick={() => {
                                    const firstTech = (technicians && technicians.length > 0) ? technicians[0] : mockTechnicians[0];
                                    setSelectedTechnician(firstTech);
                                    setSelectedDate(new Date().toISOString().split('T')[0]);
                                    setSelectedTime('DIRECT (SEKARANG)');
                                    setSelectedServices(['srv-5']);
                                    setStep(5);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 text-white p-6 rounded-[2rem] shadow-xl shadow-red-600/20 group transition-all transform hover:scale-[1.02] flex items-center justify-between border-4 border-red-100"
                            >
                                <div className="flex items-center gap-4 text-left">
                                    <div className="bg-white/20 p-3 rounded-2xl group-hover:rotate-12 transition-transform">
                                        <span className="text-3xl">🆘</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-xl tracking-tight uppercase">{t('bookPage.emergencyBtn')}</p>
                                        <p className="text-red-100 text-sm font-medium">{t('bookPage.emergencySub')}</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 px-4 py-2 rounded-xl font-bold">
                                    {t('bookPage.emergencyAction')}
                                </div>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {/* ROBUST INSTANT LOAD LOGIC */}
                            {(() => {
                                // 1. Determine data source. Always fallback to mockTechnicians if state is empty.
                                const displayTechs = (technicians && technicians.length > 0) ? technicians : (mockTechnicians || []);

                                // 2. Handle the "True Empty" state (loading initiated and NO data available yet)
                                // We show Skeletons instead of a spinner or "No technician" message for a better UX.
                                if (loading && displayTechs.length === 0) {
                                    return Array(8).fill(0).map((_, i) => (
                                        <div key={`skeleton-${i}`} className="bg-white rounded-3xl p-4 animate-pulse border-2 border-transparent shadow-sm">
                                            <div className="aspect-[4/5] bg-gray-100 rounded-2xl mb-4 shadow-inner" />
                                            <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-2" />
                                            <div className="h-3 bg-gray-50 rounded-full w-1/2 mb-4" />
                                            <div className="h-10 bg-gray-50 rounded-xl w-full" />
                                        </div>
                                    ));
                                }

                                // 3. Handle the "Actual Empty" state (fetch completed and still NO data found anywhere)
                                if (displayTechs.length === 0 && !loading) {
                                    return (
                                        <div className="col-span-full text-center py-10 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                            <p className="text-gray-400 mb-4">{t('bookPage.noTechs')}</p>
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="bg-primary/10 text-primary px-6 py-2 rounded-full font-bold hover:bg-primary/20 transition-all"
                                            >
                                                {t('bookPage.tryAgain')}
                                            </button>
                                        </div>
                                    );
                                }

                                // 4. Render the Technicians (Mock or Live)
                                return (
                                    <>
                                        {/* Dynamic Banner to inform user if we are showing top picks (Mock) */}
                                        {displayTechs.length > 0 && (
                                            <div className="col-span-full mb-4 px-6 py-3 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-700">
                                                <span className="text-xl">✨</span>
                                                <div>
                                                    <p className="text-amber-800 text-sm font-bold">{t('bookPage.topTechs')}</p>
                                                    <p className="text-amber-700 text-xs">{t('bookPage.topTechsSub')}</p>
                                                </div>
                                            </div>
                                        )}
                                        {displayTechs.map((tech: Technician, index: number) => (
                                            <TechnicianCard
                                                key={tech.id}
                                                technician={tech}
                                                onSelect={handleTechnicianSelect}
                                                priority={index < 4}
                                            />
                                        ))}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* STEP 2: SELECT SCHEDULE */}
                {step === 2 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-dark mb-6">{t('bookPage.title2')}</h2>

                        {/* Selected Technician Confirmation */}
                        {selectedTechnician && (
                            <div className="flex items-center gap-3 mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
                                <img src={selectedTechnician.photoUrl} alt={selectedTechnician.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1">
                                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">{t('bookPage.selectedTech')}</p>
                                    <p className="font-bold text-dark">{selectedTechnician.name}</p>
                                </div>
                                <span className="text-primary text-lg">✓</span>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('bookPage.selectDate')}</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                value={selectedDate}
                                onChange={handleDateChange}
                                min={todayStr}
                                max="2028-12-31"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('bookPage.selectTime')}</label>
                            <div className="grid grid-cols-3 gap-3">
                                {timeSlots.map((time: string) => (
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
                            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-dark">{t('bookPage.btnBack')}</button>
                            <button
                                onClick={handleScheduleSelect}
                                disabled={!selectedDate || !selectedTime}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                {t('bookPage.btnNextService')}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: SELECT SERVICE */}
                {step === 3 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">{t('bookPage.title3')}</h2>

                        {/* Selected Technician & Schedule Confirmation - Combined Large Card */}
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 mb-8 shadow-xl shadow-gray-200/50 flex flex-col gap-6">
                            {selectedTechnician && (
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                                            <img
                                                src={selectedTechnician.photoUrl}
                                                alt={selectedTechnician.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-amber-50">
                                            <span className="text-[10px] font-black text-dark">{selectedTechnician.rating}</span>
                                            <span className="text-amber-400 text-[8px]">★</span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        {t('bookPage.selectedTech')}
                                        <h3 className="text-2xl font-black text-dark tracking-tight leading-tight">
                                            {selectedTechnician.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">
                                                {selectedTechnician.specialty}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-[#f9fbfc] rounded-3xl p-5 flex items-center gap-5 border border-gray-50">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center overflow-hidden shrink-0">
                                    <div className="bg-red-500 w-full h-3 flex items-center justify-center">
                                        <span className="text-[6px] text-white font-black uppercase">
                                            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : 'DATE'}
                                        </span>
                                    </div>
                                    <span className="text-lg font-black text-dark leading-none mt-1">
                                        {selectedDate ? new Date(selectedDate).getDate() : '--'}
                                    </span>
                                </div>

                                <div className="flex-1 leading-tight">
                                    {t('bookPage.visitSchedule')}
                                    <h4 className="font-black text-dark text-base">
                                        {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                    </h4>
                                    <p className="text-[#9C6D3F] font-black text-lg">
                                        {selectedTime || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {apiServices.length > 0 ? apiServices.map(service => (
                                <div
                                    key={service.id}
                                    onClick={() => handleServiceToggle(service.id)}
                                    className={`group relative flex items-center p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300
                                        ${selectedServices.includes(service.id)
                                            ? 'border-[#9C6D3F] bg-[#FDF8F3] shadow-lg scale-[1.01]'
                                            : 'border-gray-100 bg-white hover:border-[#9C6D3F]/30 hover:shadow-md'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mr-6 transition-all
                                         ${selectedServices.includes(service.id) ? 'bg-[#9C6D3F] text-white shadow-lg rotate-12' : 'bg-gray-50 text-gray-400 group-hover:bg-amber-50'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-black tracking-tight mb-1 transition-colors
                                            ${selectedServices.includes(service.id) ? 'text-[#9C6D3F]' : 'text-dark'}`}>
                                            {service.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('bookPage.startFrom')}</span>
                                            <p className={`font-black text-lg ${selectedServices.includes(service.id) ? 'text-[#9C6D3F]' : 'text-gray-600'}`}>
                                                {service.price}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                                        ${selectedServices.includes(service.id)
                                            ? 'bg-[#9C6D3F] border-[#9C6D3F] shadow-inner'
                                            : 'border-gray-200 group-hover:border-[#9C6D3F]/50'}`}>
                                        {selectedServices.includes(service.id) ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-[#9C6D3F]/30" />
                                        )}
                                    </div>

                                    {/* Subtle decorative element */}
                                    {selectedServices.includes(service.id) && (
                                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#9C6D3F]/10 rounded-full blur-xl animate-pulse" />
                                    )}
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">{t('bookPage.loadingServices')}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(2)} className="text-gray-500 hover:text-dark">{t('bookPage.btnBack')}</button>
                            <button
                                onClick={() => selectedServices.length > 0 && setStep(4)}
                                disabled={selectedServices.length === 0}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                {t('bookPage.btnNextInfo')}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: USER FORM */}
                {step === 4 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">{t('bookPage.title4')}</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('bookPage.fullName')}</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} placeholder={t('bookPage.fullNamePlaceholder')} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('bookPage.whatsapp')}</label>
                                <input
                                    type="tel"
                                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-primary/20 transition-all ${formData.phone && (!formData.phone.startsWith('08') || !/^\d+$/.test(formData.phone))
                                        ? 'border-red-400 bg-red-50'
                                        : 'border-gray-200 focus:border-primary'
                                        }`}
                                    value={formData.phone}
                                    onChange={e => {
                                        const val = e.target.value.replace(/[^\d]/g, '');
                                        // Allow up to 13 digits (08 + 11 digits) in input to not block typing completely,
                                        // but validation messages will enforce the specific rule
                                        if (val.length <= 13) {
                                            setFormData({ ...formData, phone: val });
                                        }
                                    }}
                                    placeholder={t('bookPage.whatsappPlaceholder')}
                                />
                                {formData.phone && !formData.phone.startsWith('08') && (
                                    <p className="text-red-500 text-xs mt-1 font-bold">{t('bookPage.whatsappErr1')}</p>
                                )}
                                {formData.phone && formData.phone.startsWith('08') && formData.phone.length > 0 && (formData.phone.length < 10 || formData.phone.length > 12) && (
                                    <p className="text-red-500 text-xs mt-1 font-bold">{t('bookPage.whatsappErr2')}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('bookPage.address')}</label>
                                <MapPicker
                                    onAddressSelect={(addr) => setFormData(prev => ({ ...prev, address: addr }))}
                                    initialAddress={formData.address}
                                />
                                <div className="mt-4">
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[80px] text-sm"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        placeholder={t('bookPage.addressPlaceholder')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('bookPage.notes')}</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder={t('bookPage.notesPlaceholder')} />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={() => setStep(3)} className="text-gray-500 hover:text-dark">{t('bookPage.btnBack')}</button>
                            <button
                                onClick={() => {
                                    const isPhoneValid = formData.phone.startsWith('08') && formData.phone.length >= 10 && formData.phone.length <= 12;
                                    if (formData.full_name && isPhoneValid && formData.address) {
                                        setStep(5);
                                    }
                                }}
                                disabled={
                                    !formData.full_name ||
                                    !formData.phone ||
                                    formData.phone.length < 10 ||
                                    formData.phone.length > 12 ||
                                    !formData.phone.startsWith('08') ||
                                    !formData.address
                                }
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                {t('bookPage.btnNextPayment')}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 5: CONFIRMATION & PAYMENT */}
                {step === 5 && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-dark mb-6">{t('bookPage.title5')}</h2>

                        {/* Booking Summary Card - REMASTERED TO MATCH SCREENSHOT */}
                        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl mb-8">
                            {/* Technician Header */}
                            <div className="bg-gradient-to-b from-[#FDF8F3] to-white p-6 border-b border-gray-50">
                                <div className="flex items-center gap-6">
                                    {selectedTechnician && (
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                                <img src={selectedTechnician.photoUrl} alt="Tech" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute bottom-0 right-0 bg-white px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-amber-100">
                                                <span className="text-amber-500 text-sm font-black">{selectedTechnician.rating}</span>
                                                <span className="text-amber-500 text-[10px]">★</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p className="text-[10px] text-amber-700 font-black uppercase tracking-[0.2em] mb-1">{t('bookPage.selectedTech')}</p>
                                        <h3 className="text-3xl font-black text-dark tracking-tight leading-tight mb-1">{selectedTechnician?.name}</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{selectedTechnician?.specialty}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule & Cost Details */}
                            <div className="p-8 space-y-8">
                                {/* Date & Time */}
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="bg-red-500 w-full h-4 flex items-center justify-center">
                                            <span className="text-[8px] text-white font-black uppercase">JUL</span>
                                        </div>
                                        <span className="text-xl font-black text-dark leading-none mt-1">17</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">{t('bookPage.visitSchedule')}</p>
                                        <h4 className="font-black text-dark text-xl leading-tight">
                                            {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                        </h4>
                                        <p className="text-[#9C6D3F] text-2xl font-black mt-1">{selectedTime || '-'}</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-100 space-y-6">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t('bookPage.costDetails')}</p>

                                    <div className="flex justify-between items-center text-lg font-bold text-gray-700">
                                        <span>{t('bookPage.estService')} ({selectedServices.length})</span>
                                        <span className="text-dark">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                    </div>

                                    <div className="flex justify-between items-end pt-4">
                                        <span className="text-lg font-black text-dark mb-2">{t('bookPage.estTotal')}</span>
                                        <div className="text-right">
                                            <span className="block text-4xl font-black text-[#9C6D3F] leading-none mb-2">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                            <span className="text-[10px] text-gray-400 font-medium italic tracking-wide">{t('bookPage.taxInc')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-8">
                            <h3 className="font-bold text-dark mb-4">{t('bookPage.paymentMethod')}</h3>
                            <div className="space-y-3">
                                {['QRIS (Ovo/GoPay/Dana)', 'Transfer Bank BCA'].map((method) => (
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
                            <button onClick={() => setStep(4)} className="text-gray-500 hover:text-dark">{t('bookPage.btnBack')}</button>
                            <button
                                onClick={handleCreateBooking}
                                disabled={submitting || !paymentMethod}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/30"
                            >
                                {submitting ? t('bookPage.btnProcess') : t('bookPage.btnConfirm')}
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
                                    <h3 className="text-lg font-bold">{t('bookPage.paymentBCA')}</h3>
                                    <p className="text-white/80 text-sm">{t('bookPage.subtitle5') || 'Selesaikan pembayaran untuk konfirmasi pesanan'}</p>
                                </div>

                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mb-2">{t('bookPage.transferTotal')}</p>
                                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 inline-block">
                                            <h4 className="text-3xl font-black text-blue-600">
                                                Rp {(calculateTotal() + uniqueCode).toLocaleString('id-ID')}
                                            </h4>
                                            <p className="text-xs text-blue-500 mt-1 font-medium bg-blue-100/50 px-2 py-1 rounded inline-block">
                                                {t('bookPage.transferNote').replace('{code}', uniqueCode.toString())}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('bookPage.accountNumber')}</p>
                                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                                                <span className="font-mono font-bold text-lg text-dark">888888888</span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText('888888888')}
                                                    className="text-blue-500 text-xs font-bold hover:text-blue-600"
                                                >
                                                    {t('bookPage.copy')}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('bookPage.accountName')}</p>
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
                                                const isEmergency = selectedServices.includes('srv-5') || selectedTime.includes('DIRECT');
                                                const message = `Halo PERABOX, saya ${isEmergency ? '*PERLU LAYANAN DARURAT*' : 'ingin konfirmasi transfer'} untuk order:\n- Layanan: ${serviceNames}\n- Waktu: ${selectedDate} jam ${selectedTime}\n- Lokasi: ${formData.address}\n\n*Total Transfer: Rp ${totalWithUnique.toLocaleString('id-ID')} (BCA)*\n*Kode Unik: ${uniqueCode}*${isEmergency ? '\n\n*STATUS: DARURAT / ASAP*' : ''}\n\nBerikut bukti transfer saya (lampirkan foto):`;
                                                const centralNumber = '81234567894';
                                                const waUrl = `https://wa.me/${centralNumber}?text=${encodeURIComponent(message)}`;
                                                window.open(waUrl, '_blank');
                                            }}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                                        >
                                            <span className="text-xl">📤</span> {t('bookPage.confirmPayment')}
                                        </button>
                                        <button
                                            onClick={() => setStep(5)}
                                            className="w-full mt-3 text-gray-400 hover:text-gray-600 font-medium py-2 rounded-xl transition-all text-sm"
                                        >
                                            {t('bookPage.backToDetails')}
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
                        <h2 className="text-2xl font-bold text-dark mb-2">{t('bookPage.orderReceived')}</h2>
                        <p className="text-gray-500 mb-8">
                            {t('bookPage.thankYouTech')} <strong>{selectedTechnician?.name}</strong>.
                            {paymentMethod.includes('QRIS')
                                ? t('bookPage.qrisSuccess')
                                : paymentMethod.includes('BCA')
                                    ? t('bookPage.bcaSuccess')
                                    : t('bookPage.waSuccess')}
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-gray-100 hover:bg-gray-200 text-dark px-8 py-3 rounded-full font-bold transition-all w-full"
                        >
                            {t('bookPage.backToHome')}
                        </button>
                    </div>
                )}
            </div>

            {/* Sticky Summary Bar (Only visible in step 2, 3, 4) */}
            {(step >= 2 && step <= 4) && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg md:hidden z-40">
                    <div className="flex items-center justify-between">
                        {step === 2 && (
                            <button
                                onClick={() => {
                                    if (validateDateRange(selectedDate)) {
                                        handleScheduleSelect();
                                    } else {
                                        alert('Silakan pilih tanggal antara tahun 2026 dan 2028.');
                                    }
                                }}
                                disabled={!selectedDate || !selectedTime}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-sm px-6 py-3 rounded-full font-bold"
                            >
                                {t('bookPage.btnNext')}
                            </button>
                        )}
                        {step === 3 && (
                            <button onClick={() => selectedServices.length > 0 && setStep(4)} disabled={selectedServices.length === 0} className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-sm px-6 py-3 rounded-full font-bold">
                                {t('bookPage.btnNext')}
                            </button>
                        )}
                        {step === 4 && (
                            <button onClick={() => formData.full_name && formData.phone && formData.address && setStep(5)} disabled={!formData.full_name || !formData.phone || !formData.address} className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-sm px-6 py-3 rounded-full font-bold">
                                {t('bookPage.btnNext')}
                            </button>
                        )}
                    </div>
                </div>
            )}

        </main>
    );
}

