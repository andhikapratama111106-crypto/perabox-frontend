"use client";

import React from 'react';

type OrderStatus = 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

interface LiveTrackerProps {
    status: OrderStatus;
}

const LiveTracker = ({ status }: LiveTrackerProps) => {
    // Define the sequence of valid active statuses
    const stages = [
        { id: 'pending', label: 'Menunggu Konfirmasi', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'confirmed', label: 'Dikonfirmasi', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'assigned', label: 'Teknisi Ditugaskan', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'in_progress', label: 'Sedang Dikerjakan', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { id: 'completed', label: 'Selesai', icon: 'M5 13l4 4L19 7' }
    ];

    if (status === 'cancelled') {
        return (
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-red-800">Pesanan Dibatalkan</h4>
                    <p className="text-sm text-red-600 mt-0.5">Silakan hubungi customer service jika Anda merasa ini adalah sebuah kesalahan.</p>
                </div>
            </div>
        );
    }

    const currentStageIndex = stages.findIndex(s => s.id === status);
    // Fallback if status is unknown, assume pending
    const activeIndex = currentStageIndex === -1 ? 0 : currentStageIndex;

    return (
        <div className="relative">
            {/* The Background Line */}
            <div className="absolute top-5 left-6 right-6 h-1 bg-gray-200 rounded-full hidden sm:block"></div>

            {/* The Active Line */}
            <div
                className="absolute top-5 left-6 h-1 bg-primary rounded-full hidden sm:block transition-all duration-1000 ease-out"
                style={{ width: `calc(${activeIndex === 0 ? 0 : (activeIndex / (stages.length - 1)) * 100}% - 24px)` }}
            ></div>

            {/* Stages array map */}
            <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-6 sm:gap-0">
                {stages.map((stage, index) => {
                    const isCompleted = index < activeIndex;
                    const isActive = index === activeIndex;
                    const isUpcoming = index > activeIndex;

                    return (
                        <div key={stage.id} className="flex sm:flex-col items-center gap-4 sm:gap-2 relative sm:w-1/5">

                            {/* Mobile connection line (vertical) */}
                            {index !== stages.length - 1 && (
                                <div className={`absolute left-5 top-10 w-0.5 h-full -mb-4 sm:hidden 
                                    ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}>
                                </div>
                            )}

                            {/* Icon Circle */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500
                                ${isCompleted ? 'bg-primary text-white shadow-sm' :
                                    isActive ? 'bg-primary ring-4 ring-primary/20 text-white shadow-md' :
                                        'bg-white border-2 border-gray-200 text-gray-400'}`}>

                                {isCompleted ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2 : 1.5} d={stage.icon} />
                                        {/* For in_progress (index 3), add the center dot to the cog */}
                                        {stage.id === 'in_progress' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2 : 1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                                    </svg>
                                )}
                            </div>

                            {/* Label */}
                            <div className="sm:text-center mt-1 sm:mt-2">
                                <p className={`text-sm font-bold transition-colors ${isActive ? 'text-primary' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {stage.label}
                                </p>
                                {/* Only show dot pulse on active stage */}
                                {isActive && (
                                    <span className="hidden sm:inline-block w-1.5 h-1.5 mt-1 bg-primary rounded-full animate-ping"></span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LiveTracker;
