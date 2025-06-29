'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import clsx from 'clsx';

export default function HeroBanner() {
    const t = useTranslations('section2');
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
        <section aria-label={t('sectionaria')} className="relative mt-10">
            <div className="w-full justify-center items-center flex">
                <Image
                    ref={imgRef}
                    src="/Images/Hero Banner.jpg"
                    alt={t('imgalt')}
                    title={t('imgtitle')}
                    width={1024}
                    height={800}
                    loading="lazy"
                    className={clsx(
                        'max-w-5/6 h-auto',
                        'rounded-2xl border-[3px] border-[#f0e6de]',
                        'shadow-[0_8px_24px_rgba(0,0,0,0.15)]',
                        'ring-1 ring-[#d4bba4]/40',
                        'hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-transform duration-500',
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    )}
                />
            </div>
        </section>
    );
}
