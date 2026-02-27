"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { authAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const CustomerProfile = () => {
    const { t } = useLanguage();
    // State for user data
    const [user, setUser] = useState({
        name: '',
        role: 'Customer',
        location: 'Indonesia',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: '',
        address: {
            country: 'Indonesia',
            street: '',
            postalCode: '',
            taxId: '',
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for edit modes
    const [editMode, setEditMode] = useState({
        identity: false,
        personal: false,
        address: false
    });

    // Temporary state for form inputs (to allow canceling)
    const [formData, setFormData] = useState(user);

    const fetchUserData = useCallback(async () => {
        try {
            setLoading(true);

            // 1. Immediate fallback/initial load from localStorage if available
            const savedGoogleUser = localStorage.getItem('google_user');
            if (savedGoogleUser) {
                const googleData = JSON.parse(savedGoogleUser);
                const nameParts = (googleData.name || "").split(' ');

                const localUser = {
                    name: googleData.name || '',
                    role: 'Customer',
                    location: 'Indonesia',
                    avatar: googleData.picture || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    email: googleData.email || '',
                    phone: '',
                    bio: '',
                    address: {
                        country: 'Indonesia',
                        street: '',
                        postalCode: '',
                        taxId: '',
                    }
                };

                setUser(localUser);
                setFormData(localUser);
                setLoading(false); // Immediate render without loading spinner
            } else {
                setLoading(true);
            }

            const response = await authAPI.getCurrentUser();
            const data = response.data;

            // 2. Map backend data to local state (overwrites google_user if successful)
            const nameParts = data.full_name.split(' ');
            const mappedUser = {
                name: data.full_name,
                role: data.role.charAt(0).toUpperCase() + data.role.slice(1),
                location: 'Indonesia',
                avatar: data.avatar_url || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: data.email,
                phone: data.phone,
                bio: '',
                address: {
                    country: 'Indonesia',
                    street: '',
                    postalCode: '',
                    taxId: '',
                }
            };

            setUser(mappedUser);
            setFormData(mappedUser);
            setError('');
        } catch (err: any) {
            console.error('Failed to fetch user profile:', err);
            // If we have google_user, don't show error screen, just continue with local data
            if (!localStorage.getItem('google_user')) {
                setError('Could not load profile data');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleEdit = (section: keyof typeof editMode) => {
        setFormData(user); // Reset form data to current user data
        setEditMode({ ...editMode, [section]: true });
    };

    const handleCancel = (section: keyof typeof editMode) => {
        setEditMode({ ...editMode, [section]: false });
    };

    const handleSave = (section: keyof typeof editMode) => {
        setUser(formData);
        setEditMode({ ...editMode, [section]: false });
        // Here you would typically call an API to save the data
        console.log('Saved data:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, nestedField?: string) => {
        let { value } = e.target;

        if (nestedField) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [nestedField]: value
                }
            }));
        } else {
            if (field === 'phone') {
                value = value.replace(/[^\d]/g, '');
            }
            setFormData(prev => ({ ...prev, [field]: value }));

            // Validation
            if (field === 'phone') {
                if (value && !value.startsWith('08')) {
                    setError(t('profilePage.phoneStartError'));
                } else if (value && (value.length < 10 || value.length > 12)) {
                    setError(t('profilePage.phoneLengthError'));
                } else {
                    setError('');
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-2xl text-center">
                <p className="font-bold text-lg mb-2">{t('error')}</p>
                <p>{error}</p>
                <button
                    onClick={() => fetchUserData()}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                    {t('tryAgain')}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('myProfile')}</h1>

            {/* Top Card: Identity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        {editMode.identity ? (
                            <div className="space-y-2 max-w-md">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder={t('profilePage.fullName')}
                                />
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleChange(e, 'location')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder={t('profilePage.location')}
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                                <div className="text-sm text-gray-500 mb-1">{user.role}</div>
                                <div className="text-sm text-gray-400 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {user.location}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 self-end md:self-center">
                    {editMode.identity ? (
                        <>
                            <button onClick={() => handleSave('identity')} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">{t('save')}</button>
                            <button onClick={() => handleCancel('identity')} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">{t('cancel')}</button>
                        </>
                    ) : (
                        <button onClick={() => handleEdit('identity')} className="text-sm font-medium text-blue-500 hover:underline px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                            {t('edit')}
                        </button>
                    )}
                </div>
            </div>

            {/* Middle Card: Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">{t('profilePage.personalInfo')}</h3>
                    <div className="flex gap-2">
                        {editMode.personal ? (
                            <>
                                <button onClick={() => handleSave('personal')} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">{t('save')}</button>
                                <button onClick={() => handleCancel('personal')} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">{t('cancel')}</button>
                            </>
                        ) : (
                            <button onClick={() => handleEdit('personal')} className="text-sm font-medium text-blue-500 hover:underline px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                                {t('edit')}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.firstName')}</label>
                        {editMode.personal ? (
                            <input type="text" value={formData.firstName} onChange={(e) => handleChange(e, 'firstName')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.firstName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.lastName')}</label>
                        {editMode.personal ? (
                            <input type="text" value={formData.lastName} onChange={(e) => handleChange(e, 'lastName')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.lastName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.email')}</label>
                        {editMode.personal ? (
                            <input type="email" value={formData.email} onChange={(e) => handleChange(e, 'email')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800 break-all">{user.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.phone')}</label>
                        {editMode.personal ? (
                            <input type="tel" value={formData.phone} onChange={(e) => handleChange(e, 'phone')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.phone}</p>
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.bio')}</label>
                        {editMode.personal ? (
                            <input type="text" value={formData.bio} onChange={(e) => handleChange(e, 'bio')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.bio}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Card: Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">{t('profilePage.address')}</h3>
                    <div className="flex gap-2">
                        {editMode.address ? (
                            <>
                                <button onClick={() => handleSave('address')} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">{t('save')}</button>
                                <button onClick={() => handleCancel('address')} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">{t('cancel')}</button>
                            </>
                        ) : (
                            <button onClick={() => handleEdit('address')} className="text-sm font-medium text-blue-500 hover:underline px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                                {t('edit')}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.country')}</label>
                        {editMode.address ? (
                            <input type="text" value={formData.address.country} onChange={(e) => handleChange(e, 'address', 'country')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.address.country}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.street')}</label>
                        {editMode.address ? (
                            <textarea rows={2} value={formData.address.street} onChange={(e) => handleChange(e, 'address', 'street')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
                        ) : (
                            <p className="font-medium text-gray-800 leading-relaxed">{user.address.street}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.postalCode')}</label>
                        {editMode.address ? (
                            <input type="text" value={formData.address.postalCode} onChange={(e) => handleChange(e, 'address', 'postalCode')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.address.postalCode}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('profilePage.taxId')}</label>
                        {editMode.address ? (
                            <input type="text" value={formData.address.taxId} onChange={(e) => handleChange(e, 'address', 'taxId')} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        ) : (
                            <p className="font-medium text-gray-800">{user.address.taxId}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
