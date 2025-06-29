'use client';
import { useTranslations } from '@/lib/useTranslations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const LocationCard = ({
    imageSrc,
    imageAlt,
    imageTitle,
    locationName,
    address,
    openingHours,
    tagline,
}) => (
    <motion.div
        className="relative w-full max-w-4xl mx-auto mb-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
    >
        {/* Headline */}
        <div className="mb-6 text-center px-4">
            <p className="text-lg text-amber-700 italic font-[Montserrat]">{tagline}</p>
            <h3 className="text-3xl font-[Playfair_Display] font-bold text-gray-900 mt-2">
                {locationName}
            </h3>
        </div>

        {/* Image */}
        <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden rounded-3xl shadow-xl">
            <Image
                src={imageSrc}
                alt={imageAlt}
                title={imageTitle}
                fill
                className="object-cover transform scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
            />
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-gray-700 font-light text-sm px-4">
            <p className="mb-1">📍 {address}</p>
            <p>🕰️ {openingHours}</p>
        </div>
    </motion.div>
);

export default function LocationSection() {
    const t = useTranslations('Aboutus');

    return (
        <section
            aria-label={t('section3.sectionaria')}
            className="bg-white"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Heading */}
                <motion.h2
                    className="text-4xl md:text-5xl font-[Playfair_Display] text-center text-[#5c2e00] mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    {t('section3.h2')}
                </motion.h2>

                {/* Location Cards */}
                <LocationCard
                    imageSrc="/images/Legumes.jpg"
                    imageAlt={t('section3.location1.imgalt')}
                    imageTitle={t('section3.location1.imgatitle')}
                    locationName={t('section3.location1.h2')}
                    address={t('section3.location1.h3')}
                    openingHours={t('section3.location1.time')}
                    tagline={t('section3.location1.tagline')}
                />{/* Scroll-triggered quote */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    className="my-20 text-center px-6 max-w-xl mx-auto"
                >
                    <blockquote className="italic text-lg md:text-xl text-[#5a4636] font-[Montserrat]">
                        {t('section3.blockquote')}
                    </blockquote>
                </motion.div>
                <LocationCard
                    imageSrc="/images/Kokonic.jpg"
                    imageAlt={t('section3.location2.imgalt')}
                    imageTitle={t('section3.location2.imgatitle')}
                    locationName={t('section3.location2.h2')}
                    address={t('section3.location2.h3')}
                    openingHours={t('section3.location2.time')}
                    tagline={t('section3.location2.tagline')}
                />
            </div>
        </section>
    );
}
