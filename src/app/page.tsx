"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OurCompany from "@/components/OurCompany";
import BrandSlider from "@/components/BrandSlider";
import About from "@/components/About";
import { Services } from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Discover from "@/components/Discover";
import Testimonials from "@/components/Testimonials";
import BookingModal from "@/components/BookingModal";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

    const handleBookNow = (serviceId?: string) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }
        setSelectedServiceId(serviceId);
        setIsBookingModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <Hero />

            {/* Gradient: Hero (secondary) → Features (white) */}
            <div className="h-64 bg-gradient-to-b from-secondary to-white -mt-1 relative z-10" />
            <Features />

            {/* Gradient: Features (white) → About (secondary) */}
            <div className="h-64 bg-gradient-to-b from-white to-secondary -mt-1 relative z-10" />
            <About />

            {/* BrandSlider sits over secondary/secondary-white blend */}
            <BrandSlider />

            {/* Gradient: BrandSlider/About (secondary) → Services (#FAF8F2) */}
            <div className="h-64 bg-gradient-to-b from-secondary to-[#FAF8F2] -mt-1 relative z-10" />
            <Services />

            {/* Gradient: Services (#FAF8F2) → WhyChooseUs (white) */}
            <div className="h-64 bg-gradient-to-b from-[#FAF8F2] to-white -mt-1 relative z-10" />

            <WhyChooseUs />

            {/* Gradient: WhyChooseUs (white) → Discover (secondary) */}
            <div className="h-64 bg-gradient-to-b from-white to-secondary -mt-1 relative z-10" />
            <Discover />

            {/* Gradient: Discover (secondary) → Testimonials (white) */}
            <div className="h-64 bg-gradient-to-b from-secondary to-white -mt-1 relative z-10" />
            <Testimonials />

            {/* Final Gradient: Testimonials (white) → Footer (secondary) */}
            <div className="h-64 bg-gradient-to-b from-white to-secondary -mt-1 relative z-10" />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialServiceId={selectedServiceId}
            />
        </main>
    );
}
