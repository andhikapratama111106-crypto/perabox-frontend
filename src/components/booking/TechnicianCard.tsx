import React from 'react';
import Image from 'next/image';
import { Technician } from '@/data/mockData';

interface TechnicianCardProps {
    technician: Technician;
    onSelect: (tech: Technician) => void;
    selected?: boolean;
}

export default function TechnicianCard({ technician, onSelect, selected }: TechnicianCardProps) {
    return (
        <div
            onClick={() => onSelect(technician)}
            className={`group relative bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 hover:shadow-xl
                ${selected
                    ? 'border-primary shadow-primary/20 scale-[1.02]'
                    : 'border-transparent hover:border-gray-100 shadow-sm'
                }
            `}
        >
            <div className="relative mb-4">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 relative">
                    {/* Use a standard placeholder if external image fails, but here we expect the mock URL or local asset */}
                    <img
                        src={technician.photoUrl}
                        alt={technician.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs font-bold text-dark">{technician.rating}</span>
                        <span className="text-[10px] text-gray-400">({technician.reviewCount})</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-dark text-lg leading-tight group-hover:text-primary transition-colors">
                    {technician.name}
                </h3>

                {technician.experience && (
                    <p className="text-[10px] text-primary font-bold">{technician.experience}</p>
                )}

                {technician.bio && (
                    <p className="text-[11px] text-gray-500 line-clamp-2 italic leading-relaxed">
                        "{technician.bio}"
                    </p>
                )}

                <div className="flex flex-wrap gap-1 pt-1">
                    {technician.specialties.slice(0, 2).map((spec, index) => (
                        <span key={index} className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded-md">
                            {spec}
                        </span>
                    ))}
                    {technician.specialties.length > 2 && (
                        <span className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded-md">
                            +{technician.specialties.length - 2}
                        </span>
                    )}
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Mulai dari</span>
                        <span className="font-bold text-primary">
                            Rp{technician.basePrice.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <button className="bg-primary/10 text-primary p-2 rounded-full transform group-hover:bg-primary group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
