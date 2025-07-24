'use client';
import { useTranslations } from '@/lib/useTranslations';
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import ServicePreview from './ServicePreview';

export default function ServiceGrid() {
    const [hoveredService, setHoveredService] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const t = useTranslations('service');

    const handleHover = (serviceKey) => {
        setHoveredService(serviceKey);
    };

    const handleLeave = () => {
        setHoveredService(null);
    };

    const handleViewMore = (serviceKey) => {
        setSelectedService(serviceKey);
        // Smooth scroll to detail section
        setTimeout(() => {
            document.getElementById('service-detail')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const handleCloseDetail = () => {
        setSelectedService(null);
    };

    const services = [
        { key: "S1", image: "/Images/GSI1.jpg" },
        { key: "S2", image: "/Images/GSI2.jpg" },
        { key: "S3", image: "/Images/GSI3.jpg" },
        { key: "S4", image: "/Images/GSI5.jpg" }
    ];

    return (
        <div className="w-full mb-4">
            {/* Services Section */}
            <div className="relative">
                {/* Background Blur Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent pointer-events-none" />
                
                {/* Service Cards */}
                <div className="relative flex gap-1 h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.key}
                            serviceKey={service.key}
                            image={service.image}
                            isHovered={hoveredService}
                            onHover={handleHover}
                            onLeave={handleLeave}
                            onViewMore={handleViewMore}
                        />
                    ))}
                </div>

                {/* Subtle Guide Text */}
                <div className="hidden md:block text-center mt-8">
                    <p className="text-sm text-gray-500 font-light">
                        {t('instruction')}
                    </p>
                </div>
            </div>

            {/* Service Detail Section */}
            {selectedService && (
                <div id="service-detail" className="mt-16 px-4">
                    <ServicePreview
                        title={t(`${selectedService}.title`)}
                        subtitle={t(`${selectedService}.h2`)}
                        description={t(`${selectedService}.description`)}
                        serviceKey={selectedService}
                        onClose={handleCloseDetail}
                    />
                </div>
            )}
        </div>
    );
}