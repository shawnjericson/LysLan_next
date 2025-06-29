'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CacaoToChocolate() {
    const t = useTranslations('section6');
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            src: '/Images/Beantobar_IMG3.jfif',
            alt: t('imgslideshow.imgalt1'),
            title: t('imgslideshow.imgtitle1'),
        },
        {
            src: '/Images/Beantobar_IMG2.jpg',
            alt: t('imgslideshow.imgalt2'),
            title: t('imgslideshow.imgtitle2'),
        },
        {
            src: '/Images/Beantobar_IMG1.jpg',
            alt: t('imgslideshow.imgalt3'),
            title: t('imgslideshow.imgtitle3'),
        },
        {
            src: '/Images/Beantobar_IMG4.jfif',
            alt: t('imgslideshow.imgalt4'),
            title: t('imgslideshow.imgtitle4'),
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="pb-10 pt-4" aria-label={t('sectionaria')}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-6xl font-[Playfair_Display] text-[#4f2813] mb-3">
                        {t('h2')}
                    </h2>
                    <h3 className="text-lg md:text-xl font-[Inter] italic text-gray-700">
                        {t('h3')}
                    </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                    {/* Slideshow */}
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md aspect-[9/16] overflow-hidden rounded-xl shadow-lg">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={slides[currentSlide].src}
                                        alt={slides[currentSlide].alt}
                                        title={slides[currentSlide].title}
                                        fill
                                        sizes="(max-height: 768px) 100vw, 50vw"
                                        className="object-cover rounded-xl"
                                        loading="lazy"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    {/* Nội dung bên phải */}
                    <div className="flex flex-col h-full justify-between space-y-6">
                        <div className="mt-6">
                            <h4 className="text-7xl font-[Monsserat] text-gray-950 font-medium mb-2 leading-relaxed">
                                {t('h4')}
                            </h4>
                            <div className="flex items-center flex-wrap gap-4">
                                <Image
                                    src="/Images/Cacao.png"
                                    alt={t('cocoaimgalt')}
                                    width={160}
                                    height={100}
                                    loading="lazy"
                                />
                                <Link
                                    href="#"
                                    className="btn-slide-custom"
                                >
                                    {t('CTA')}
                                </Link>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <Image
                                src="/Images/MakingIMG2.jpg"
                                alt={t('grindingalt')}
                                title={t('grindingtitle')}
                                width={600}
                                height={400}
                                className="rounded-lg shadow-md object-cover w-full h-auto"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
