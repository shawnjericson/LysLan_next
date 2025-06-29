'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css'; // import CSS swiper

export default function ProductLines() {
    const t = useTranslations('section5');

    useEffect(() => {
        // Initialize Swiper for mobile only
        new Swiper('.allproducts-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 16,
            breakpoints: {
                640: { slidesPerView: 2 },
            },
        });
    }, []);

    const products = [
        { key: 'bonbon', link: '#', img: '/Images/IMG2.jpg' },
        { key: 'tablet', link: '#', img: '/Images/Tablets.jpg' },
        { key: 'dragees', link: '#', img: '/Images/Almond150g.jpg' },
        { key: 'nama', link: '#', img: '/Images/Matcha-Nama.jpg' },
    ];

    return (
        <section className="pb-10" aria-label={t('sectionaria')} id="allproducts">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-6xl font-[Playfair_Display] text-[#4f2813] mb-3">{t('h2')}</h2>
                    <h3 className="text-lg md:text-xl font-[Inter] text-gray-700">{t('h3')}</h3>
                </div>

                {/* Grid for desktop */}
                <div className="hidden lg:grid grid-cols-4 gap-6 mb-8">
                    {products.map((item) => {
                        const data = t(item.key);
                        return (
                            <div key={item.key} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
                                <Image
                                    src={item.img}
                                    alt={data.imgalt}
                                    title={data.imgtitle}
                                    width={280}
                                    height={200}
                                    className="rounded-md object-cover mb-4"
                                    loading="lazy"
                                />
                                <h4 className="text-center font-playfair text-md mb-3 text-[#5c2e00]">{data.h4}</h4>
                                <Link
                                    href={item.link}
                                    className="btn-slide-custom"
                                >
                                    {data.CTA} →
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Swiper for mobile */}
                <div className="lg:hidden allproducts-swiper px-2 mb-8 overflow-hidden max-w-full">
                    <div className="swiper-wrapper">
                        {products.map((item) => {
                            const data = t(item.key);
                            return (
                                <div className="swiper-slide" key={item.key}>
                                    <div className="bg-white rounded-xl shadow-md p-4 mx-2 flex flex-col items-center">
                                        <Image
                                            src={item.img}
                                            alt={data.imgalt}
                                            title={data.imgtitle}
                                            width={280}
                                            height={200}
                                            className="rounded-md object-cover mb-4"
                                            loading="lazy"
                                        />
                                        <h4 className="text-center font-playfair text-md mb-3 text-[#5c2e00]">{data.h4}</h4>
                                        <Link
                                            href={item.link}
                                            className="btn-slide-custom"
                                        >
                                            {data.CTA} →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="#"
                        className="btn-glow block w-full max-w-[800px] border-4 font-extrabold border-[#DE9400] text-center text-[#3e1f0e] text-2xl py-[8px] px-[18px] rounded-[8px] font-[Roboto] mx-auto whitespace-normal no-underline hover:bg-[#DE9400] hover:text-amber-50 transition"
                    >
                        {t('sectionCTA')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
    