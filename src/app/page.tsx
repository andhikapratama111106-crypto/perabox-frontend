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
        <main className="min-h-screen">
            <Hero />

            {/* Gradient: white → secondary (features bg is white, about bg is secondary) */}
            <div className="h-20 bg-gradient-to-b from-white to-secondary -mt-1" />
            <Features />

            {/* Gradient: white → secondary */}
            <div className="h-20 bg-gradient-to-b from-white to-secondary -mt-1" />
            <About />

            <BrandSlider />

            {/* Gradient: secondary → white */}
            <div className="h-20 bg-gradient-to-b from-secondary to-white -mt-1" />
            <Services />

            {/* Gradient: white → secondary */}
            <div className="h-20 bg-gradient-to-b from-white to-secondary -mt-1" />
            <WhyChooseUs />

            <Discover />
            <Testimonials />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialServiceId={selectedServiceId}
            />
        </main>
    );
}
