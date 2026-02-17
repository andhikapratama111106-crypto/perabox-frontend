"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OurCompany from "@/components/OurCompany";
import BrandSlider from "@/components/BrandSlider";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Discover from "@/components/Discover";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
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
            <Navbar />
            <Hero />
            <Features />
            <About />
            <BrandSlider />
            <Services />
            <WhyChooseUs />
            <Discover />
            <Testimonials />
            <Footer />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialServiceId={selectedServiceId}
            />
        </main>
    );
}
