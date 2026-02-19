"use client";

import React, { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';

export default function AdminTechniciansPage() {
    const {
        technicians,
        lastFetched,
        fetchTechnicians,
        updateTechnicianAvailability
    } = useAdminStore();

    const [selectedTech, setSelectedTech] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form State for key background check fields
    const [formData, setFormData] = useState({
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        date_of_birth: '',
        parent_name: '',
        has_signed_contract: false,
        bio: '',
        specializations: [] as string[],
        experience_years: 0,
        avatar_url: ''
    });

    useEffect(() => {
        fetchTechnicians();
    }, [fetchTechnicians]);

    const handleEditClick = (tech: any) => {
        setSelectedTech(tech);
        setFormData({
            address: tech.address || '',
            emergency_contact_name: tech.emergency_contact_name || '',
            emergency_contact_phone: tech.emergency_contact_phone || '',
            date_of_birth: tech.date_of_birth || '',
            parent_name: tech.parent_name || '',
            has_signed_contract: tech.has_signed_contract || false,
            bio: tech.bio || '',
            specializations: tech.specializations || [],
            experience_years: tech.experience_years || 0,
            avatar_url: tech.avatar_url || ''
        });
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedTech) return;
        try {
            await adminAPI.updateTechnician(selectedTech.id, formData);
            setIsEditModalOpen(false);
            fetchTechnicians(true); // Force refresh store
        } catch (error) {
            console.error("Failed to update technician", error);
            alert("Failed to update technician");
        }
    };

    const toggleAvailability = async (id: string, currentStatus: boolean) => {
        try {
            // Optimistic update in store
            updateTechnicianAvailability(id, !currentStatus);
            await adminAPI.updateTechnicianAvailability(id, !currentStatus);
        } catch (error) {
            console.error("Failed to toggle availability", error);
            // Revert in store on error
            updateTechnicianAvailability(id, currentStatus);
            alert("Gagal merubah status ketersediaan");
        }
    };

    if (!lastFetched.technicians) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-gray-400 font-medium text-sm">Memuat data teknisi...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Technician Management</h1>
                    <p className="text-gray-400 text-sm mt-0.5">{technicians.length} teknisi terdaftar</p>
                </div>
                {/* 
                 <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md">
                    + Tambah Teknisi
                </button>
                */}
            </div>

            {/* Technician Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {technicians.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-400">
                        Tidak ada teknisi yang ditemukan.
                    </div>
                ) : technicians.map((tech: any) => (
                    <div
                        key={tech.id}
                        className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${tech.is_available ? 'border-gray-100' : 'border-red-100 opacity-75'
                            }`}
                    >
                        {/* Photo */}
                        <div className="relative">
                            <div className="w-full h-52 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                                {tech.avatar_url ? (
                                    <img
                                        src={tech.avatar_url}
                                        alt={tech.user_name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">👤</div>
                                )}
                            </div>
                            {/* Rating Badge */}
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 shadow-sm">
                                <span className="text-amber-500 text-sm">★</span>
                                <span className="text-sm font-bold text-gray-800">{Number(tech.rating_average).toFixed(1)}</span>
                                <span className="text-[10px] text-gray-400">({tech.total_jobs} Jobs)</span>
                            </div>
                            {/* Availability Badge */}
                            <div className={`absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${tech.is_available
                                ? 'bg-emerald-500/90 text-white'
                                : 'bg-red-500/90 text-white'
                                }`}>
                                {tech.is_available ? 'Available' : 'Unavailable'}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-lg">{tech.user_name}</h3>
                            <p className="text-xs text-gray-500 mb-2">{tech.user_email}</p>

                            {tech.bio && (
                                <p className="text-[10px] text-gray-400 line-clamp-2 italic mb-2">"{tech.bio}"</p>
                            )}

                            {/* Specialties */}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {tech.specializations?.map((spec: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[11px] font-medium rounded-lg border border-gray-100"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            {/* Background Check Indicator */}
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${tech.has_signed_contract ? 'bg-green-500' : 'bg-orange-500'}`} />
                                <span className="text-xs text-gray-500">
                                    {tech.has_signed_contract ? 'Kontrak Bermaterai' : 'Belum Tanda Tangan'}
                                </span>
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="border-t border-gray-50 px-4 py-3 bg-gray-50/50 flex items-center justify-between">
                            {/* Toggle */}
                            <label className="relative inline-flex items-center cursor-pointer gap-2">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={tech.is_available}
                                    onChange={() => toggleAvailability(tech.id, tech.is_available)}
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                <span className="text-xs text-gray-500 font-medium">
                                    {tech.is_available ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </label>

                            {/* Actions */}
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleEditClick(tech)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                    title="Edit Detail"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && selectedTech && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                            <h2 className="text-lg font-bold text-gray-800">Edit Data Teknisi: {selectedTech.user_name}</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-700">
                                ℹ️ Data ini bersifat rahasia dan hanya untuk keperluan administrasi internal.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-800 border-b pb-2">Kontak Darurat</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.parent_name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, parent_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kerabat</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.emergency_contact_name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Kerabat</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.emergency_contact_phone}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-800 border-b pb-2">Data Pribadi</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.date_of_birth}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date_of_birth: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                        <textarea
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none h-24"
                                            value={formData.address}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, address: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="font-bold text-gray-800">Profil Publik</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Deskripsi</label>
                                        <textarea
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none h-20"
                                            value={formData.bio}
                                            placeholder="Deskripsi singkat teknisi..."
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, bio: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman (Tahun)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.experience_years}
                                            onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.avatar_url}
                                            placeholder="/technician_x.jpg"
                                            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi (Pisahkan dengan koma)</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={formData.specializations.join(', ')}
                                            onChange={(e) => setFormData({ ...formData, specializations: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-primary rounded focus:ring-primary"
                                        checked={formData.has_signed_contract}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, has_signed_contract: e.target.checked })}
                                    />
                                    <div>
                                        <span className="font-bold text-gray-800 block">Kontrak Bermaterai</span>
                                        <span className="text-xs text-gray-500">Centang jika teknisi sudah menandatangani kontrak kerja resmi.</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-8 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
