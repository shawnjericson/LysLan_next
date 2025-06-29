'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import clsx from 'clsx';

export default function HeroBanner() {
    const t = useTranslations('FAQs');
    const imgRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (imgRef.current) observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section aria-label={t('banner.arialabel')} className="relative w-full">
            {/* Container chính với tỷ lệ 1600:600 */}
            <div className="relative w-full aspect-[10/3] overflow-hidden">
                {/* Background Image */}
                <Image
                    ref={imgRef}
                    src="/Images/FAQs.jpg"
                    alt={t('banner.alt')}
                    title={t('banner.title')}
                    fill
                    className={clsx(
                        "object-cover transition-all duration-1000 ease-out",
                        isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"
                    )}
                    loading="lazy"
                    sizes="100vw"
                />

                {/* Overlay để làm nổi bật text */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content ở giữa */}
                <div className={clsx(
                    "absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 delay-300",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                <span className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-[Playfair_Display] mb-4 drop-shadow-lg uppercase">{t('banner.title')}</span>
                </div>
            </div>
            <div className="bg-[#fff8f5] flex flex-col items-center justify-center text-center h-60">
                <h1 className="text-gray-600 text-xl md:text-2xl lg:text-3xl font-bold font-[Playfair_Display] mb-4 mt-2 drop-shadow-lg uppercase">
                    {t('banner.h1')}
                </h1>
                <p className="text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed drop-shadow-md font-light mb-2 uppercase font-[Monserrat]">
                    {t('banner.p')}
                </p>
            </div>
        </section>
    );
}