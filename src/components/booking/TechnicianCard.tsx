import React from 'react';
import Image from 'next/image';
import { Technician } from '@/data/mockData';

interface TechnicianCardProps {
    technician: Technician;
    onSelect: (tech: Technician) => void;
    selected?: boolean;
    priority?: boolean;
}

export const TechnicianCard: React.FC<TechnicianCardProps> = ({ technician, onSelect, selected, priority = false }) => {
    return (
        <div
            onClick={() => onSelect(technician)}
            className={`group relative bg-white rounded-[2rem] p-4 cursor-pointer transition-all duration-500 border-2 overflow-hidden
                ${selected
                    ? 'border-[#9C6D3F] shadow-2xl scale-[1.02] bg-[#FDF8F3]'
                    : 'border-transparent hover:border-[#9C6D3F]/20 shadow-sm hover:shadow-xl'
                }
            `}
        >
            <div className="relative mb-5">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 relative shadow-inner">
                    <Image
                        src={technician.photoUrl}
                        alt={technician.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={priority}
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-gray-100">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-sm font-black text-dark">{technician.rating}</span>
                        <span className="text-[10px] text-gray-400 font-bold">({technician.reviewCount})</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 px-1 pb-2">
                <div>
                    <h3 className={`font-black text-xl leading-tight transition-colors duration-300
                        ${selected || 'group-hover:text-[#9C6D3F]'} text-dark`}>
                        {technician.name}
                    </h3>
                    {technician.experience && (
                        <p className="text-[10px] text-[#9C6D3F] font-black uppercase tracking-widest mt-1 opacity-80">
                            {technician.experience} Experience
                        </p>
                    )}
                </div>

                {technician.bio && (
                    <p className="text-[11px] text-gray-500 line-clamp-2 italic leading-relaxed opacity-70">
                        &quot;{technician.bio}&quot;
                    </p>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {technician.specialties.slice(0, 2).map((spec, index) => (
                        <span key={index} className="text-[9px] font-bold px-2 py-1 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 uppercase tracking-tighter">
                            {spec}
                        </span>
                    ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Mulai dari</span>
                        <span className={`font-black text-lg transition-colors ${selected ? 'text-[#9C6D3F]' : 'text-dark'}`}>
                            Rp{technician.basePrice.toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${selected
                            ? 'bg-[#9C6D3F] text-white shadow-lg'
                            : 'bg-gray-50 text-gray-400 group-hover:bg-[#9C6D3F] group-hover:text-white group-hover:shadow-md'
                        }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Decorative Selection Circle */}
            {selected && (
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#9C6D3F]/5 rounded-full blur-2xl" />
            )}
        </div>
    );
}
export default TechnicianCard;
