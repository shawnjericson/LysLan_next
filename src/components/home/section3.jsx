'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function FlagshipSection() {
    const t = useTranslations('section3');

    const items = [
        {
            img: '/Images/SB3.jpg',
            alt: t('bb1.imgalt'),
            title: t('bb1.imgtitle'),
            h4: t('bb1.bbh4'),
            p: t('bb1.bbp'),
            cta: t('bb1.bbCTA')
        },
        {
            img: '/Images/FS2.jpg',
            alt: t('bb2.imgalt'),
            title: t('bb2.imgtitle'),
            h4: t('bb2.bbh4'),
            p: t('bb2.bbp'),
            cta: t('bb2.bbCTA')
        },
        {
            img: '/Images/WK1.jpg',
            alt: t('bb3.imgalt'),
            title: t('bb3.imgtitle'),
            h4: t('bb3.bbh4'),
            p: t('bb3.bbp'),
            cta: t('bb3.bbCTA')
        }
    ];

    return (
        <section id="flagship-slider" className="pb-10 px-4 mt-10" aria-label={t('sectionaria')}>
            <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-5xl font-bold font-[Playfair_Display] mb-2 uppercase">{t('flagshiph2')}</h2>
                <h3 className="text-3xl font-[Playfair_Display] text-[#3e1f0e]">{t('flagshiph3')}</h3>
                <h4 className="italic text-[#3e1f0e] font-[Playfair_Display] mt-2">{t('flagshiph4')}</h4>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items.map((item, index) => (
                    <div key={index} className="shadow-lg rounded-lg overflow-hidden bg-white hover:scale-[1.05] transition-transform duration-500 hover:brightness-102">
                        <Image
                            src={item.img}
                            alt={item.alt}
                            title={item.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-60"
                            loading="lazy"
                        />
                        <div className="p-4 flex flex-col justify-between h-[220px]">
                            <h4 className="text-2xl font-semibold mb-2 font-[Playfair_Display]">{item.h4}</h4>
                            <p className="text-sm text-gray-600">{item.p}</p>
                            <div className="text-center mt-4">
                                <Link href="#"
                                    className="btn-slide-custom">
                                    {item.cta}
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Swiper */}
            <div className="block lg:hidden mt-8">
                <Swiper
                    modules={[Navigation, EffectCoverflow]}
                    navigation
                    grabCursor
                    centeredSlides
                    loop={false}
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false
                    }}
                    slidesPerView="auto"
                    className="flagship-swiper"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="max-w-sm">
                            <div className="shadow-md bg-white rounded-lg overflow-hidden">
                                <Image
                                    src={item.img}
                                    alt={item.alt}
                                    title={item.title}
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-60"
                                    loading="lazy"
                                />
                                <div className="p-4 h-[220px] flex flex-col justify-between">
                                    <h4 className="text-2xl font-[Playfair_Display] font-semibold">{item.h4}</h4>
                                    <p className="text-sm text-gray-600">{item.p}</p>
                                    <div className="text-center mt-4">
                                        <a href="#" className="btn-slide-custom">{item.cta}</a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
                <h4 className="text-2xl mb-4 font-[Playfair_Display]">{t('sectionCTA')}</h4>
                <Link
                    href="#"
                    className="btn-glow block w-full max-w-[800px] border-4 font-extrabold border-[#DE9400] text-center text-[#3e1f0e] text-4xl py-[8px] px-[18px] rounded-[8px] font-[Roboto] mx-auto whitespace-normal no-underline hover:bg-[#DE9400] hover:text-amber-50 transition">
                    {t('CTAbutton')} <i className="bi bi-chevron-right"></i>
                </Link>
            </div>
        </section>
    );
}
