'use client';
import { useTranslations } from '@/lib/useTranslations';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Section1() {
    const t = useTranslations('Aboutus');
    const [isExpanded, setIsExpanded] = useState(false); // Quản lý trạng thái mở rộng
    const [content, setContent] = useState(t('section1.p1')); // Quản lý nội dung hiển thị

    // Hàm để hiển thị nội dung "Xem thêm"
    const showMore = () => {
        if (isExpanded) {
            setIsExpanded(false);
            setContent(t('section1.p1')); // reset nội dung về ban đầu
        } else {
            setIsExpanded(true);
            setContent(`
                ${t('section1.p1')}
                ${t('section1.p2')}
                ${t('section1.p3')}
                ${t('section1.p4')}
            `); // hiển thị tất cả nội dung
        }
    };

    return (
        <motion.section
            aria-label={t('section1.sectionaria')}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="py-16"
        >
            <div className="container mx-auto px-6">
                {/* Tiêu đề phần */}
                <div className="pb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Playfair_Display] text-[#5c2e00] text-center tracking-wide leading-snug">
                        {t('section1.h2')}
                    </h2>
                </div>

                <div className="flex flex-col sm:flex-row items-start justify-between gap-10">
                    {/* Hình ảnh và nội dung */}
                    <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/Images/aboutus1_feature.jpg"
                            alt={t('section1.imgalt')}
                            title={t('section1.imgtitle')}
                            loading="lazy"
                            width={600}
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    <div className="w-full sm:w-1/2">
                        <h3 className="text-2xl sm:text-3xl font-[Playfair_Display] font-semibold text-gray-700 mb-6">
                            {t('section1.h3')}
                        </h3>

                        {/* Nội dung chính với cách xuống dòng rõ ràng */}
                        <div className="text-lg sm:text-xl text-gray-600 font-[Montserrat] leading-relaxed mb-4">
                            {content.split('\n').map((text, index) => (
                                <p key={index} className="mb-4">{text}</p>
                            ))}
                            {!isExpanded && <span className="text-gray-400">...</span>}
                        </div>

                        {/* Nút để mở rộng */}
                        <button
                            onClick={showMore}
                            className="mt-6 font-[Montserrat] px-8 py-3 text-lg text-white bg-gradient-to-r from-[#4E2C2A] to-[#F1C27D] rounded-xl shadow-md hover:from-[#3e201f] hover:to-[#F1A800] transition-all duration-300 ease-in-out focus:outline-none"
                        >
                            {isExpanded ? t('section1.CTAafter') : t('section1.CTA')}
                        </button>

                        <div className="mt-8">
                            <Image
                                src="/Images/LYSLAN_Bonbon2.jpg"
                                alt={t('section1.imgalt2')}
                                title={t('section1.imgtitle2')}
                                loading="lazy"
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}