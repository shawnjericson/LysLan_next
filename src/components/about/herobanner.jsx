'use client';
import { useTranslations } from '@/lib/useTranslations';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function HeroBanner() {
    const t = useTranslations('Aboutus');

    return (
        <motion.div
            className="relative pb-5"
            aria-label={t('herobanner.sectionaria')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="relative flex items-center justify-center h-60 md:h-screen w-full">
                {/* Hình ảnh nền */}
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/Images/About_Us_Banner.jpg"
                        alt={t('herobanner.imgalt')}
                        title={t('herobanner.imgtitle')}
                        width={1440}
                        height={1080}
                        priority={true}
                    />
                </div>
                {/* Chữ h2 với hiệu ứng động trong phần nền */}
                <motion.h2
                    className={clsx(
                        'text-white font-serif text-sm md:text-7xl text-left absolute right-0 top-1/2 transform -translate-y-1/2 z-10 tracking-wider',
                        'md:px-8 md:max-w-lg transition-opacity duration-1000 opacity-100 uppercase font-[Roboto] text-shadow-md text-shadow-black' ,
                        'overflow-hidden' // Đảm bảo không bị tràn ra ngoài
                    )}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    id="Bannercontent"
                >
                    {t('herobanner.h2')}
                </motion.h2>
            </div>
        </motion.div>
    );
}
