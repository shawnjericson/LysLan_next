'use client';
import { useTranslations } from '@/lib/useTranslations';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TeamSection() {
    const t = useTranslations('Aboutus');

    const teamMembers = [
        {
            id: 1,
            name: t('section4.members.founder.name'),
            position: t('section4.members.founder.position'),
            image: '/images/CEO&Founder.jpg',
            alt: 'Đoàn Nhược Lan',
        },
        {
            id: 2,
            name: t('section4.members.coo.name'),
            position: t('section4.members.coo.position'),
            image: '/images/Chief Operating Director.jpg',
            alt: 'SERGE PERRIN MERINOS',
        },
        {
            id: 3,
            name: t('section4.members.rd_director.name'),
            position: t('section4.members.rd_director.position'),
            image: '/images/R&D and Production Director.jpg',
            alt: 'OLGA PETUKHOVA',
        },
        {
            id: 4,
            name: t('section4.members.factory_supervisor1.name'),
            position: t('section4.members.factory_supervisor1.position'),
            image: '/images/Factory Supervisor.jpg',
            alt: 'ĐOÀN THIỆN BẢO',
        },
        {
            id: 5,
            name: t('section4.members.production_manager.name'),
            position: t('section4.members.production_manager.position'),
            image: '/images/Production manager.jpg',
            alt: 'NGUYỄN NHẬT NAM',
        },
        {
            id: 6,
            name: t('section4.members.artisan1.name'),
            position: t('section4.members.artisan1.position'),
            image: '/images/Mr-Danh.jpg',
            alt: 'Mr Danh',
        },
        {
            id: 7,
            name: t('section4.members.artisan2.name'),
            position: t('section4.members.artisan2.position'),
            image: '/images/Ms-Nương.jpg',
            alt: 'Ms Nương',
        },
        {
            id: 8,
            name: t('section4.members.artisan3.name'),
            position: t('section4.members.artisan3.position'),
            image: '/images/Ms-Phương.jpg',
            alt: 'Ms Phương',
        },
    ];

    const TeamCard = ({ member }) => (
        <div className="relative group w-full h-[460px] rounded-3xl overflow-hidden shadow-xl bg-white">
            <Image
                src={member.image}
                alt={member.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay fade */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 backdrop-blur-sm">
                <h4 className="text-lg md:text-xl tracking-wide uppercase font-[Playfair_Display] drop-shadow">
                    {member.name}
                </h4>
                <p className="text-sm text-gray-200">{member.position}</p>
            </div>
        </div>
    );

    return (
        <section
            aria-label={t('section4.section_aria')}
            className="bg-[#fffaf4] py-20"
        >
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl text-center font-[Playfair_Display] font-bold text-[#8b542e] mb-6">
                    {t('section4.title')}
                </h2>
                <p className="text-lg text-center text-gray-600 font-[Playfair_Display] italic max-w-3xl mx-auto mb-12">
                    {t('section4.subtitle')}
                </p>
                <div className="relative w-full">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                        effect="coverflow"
                        centeredSlides
                        slidesPerView="auto"
                        spaceBetween={30}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 120,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: '.swiper-pagination-custom',
                        }}
                        className="team-swiper"
                    >
                        {teamMembers.map((member) => (
                            <SwiperSlide
                                key={member.id}
                                className="!w-[260px] md:!w-[300px] lg:!w-[360px] swiper-slide-custom"
                            >
                                <TeamCard member={member} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation buttons */}
                    <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>

                    <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="mt-6 ml-30 flex justify-center">
                        <div className="swiper-pagination-custom mt-10"></div>
                    </div>
                </div>
            </div>


        </section>
    );
}