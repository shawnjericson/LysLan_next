'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslations } from '@/lib/useTranslations';
import { useState } from 'react';
import 'swiper/css';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';

export default function ProductCarousel({ boxType }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const t = useTranslations('Aboutus');

    // Tất cả sản phẩm bonbon
    const allProducts = [
        { id: 1, name: t('section5.product.productcarousel.bb1'), image: '/images/bonbon/fishsauce.jpg' },
        { id: 2, name: t('section5.product.productcarousel.bb2'), image: '/images/bonbon/lemon.jpg' },
        { id: 3, name: t('section5.product.productcarousel.bb3'), image: '/images/bonbon/pumpkin.jpg' },
        { id: 4, name: t('section5.product.productcarousel.bb4'), image: '/images/bonbon/tamarind.jpg' },
        { id: 5, name: t('section5.product.productcarousel.bb5'), image: '/images/bonbon/milkcoffee.jpg' },
        { id: 6, name: t('section5.product.productcarousel.bb6'), image: '/images/bonbon/cashew.jpg' },
        { id: 7, name: t('section5.product.productcarousel.bb7'), image: '/images/bonbon/tiramisu.jpg' },
        { id: 8, name: t('section5.product.productcarousel.bb8'), image: '/images/bonbon/pineapple.jpg' },
        { id: 9, name: t('section5.product.productcarousel.bb9'), image: '/images/bonbon/strawberry.jpg' },
        { id: 10, name: t('section5.product.productcarousel.bb10'), image: '/images/bonbon/walnut.jpg' },
        { id: 11, name: t('section5.product.productcarousel.bb11'), image: '/images/bonbon/whisky.jpg' },
        { id: 12, name: t('section5.product.productcarousel.bb12'), image: '/images/bonbon/passion.jpg' },
    ];

    // Logic filter sản phẩm dựa trên boxType
    let displayedProducts = allProducts; // Mặc định hiển thị tất cả

    if (boxType === 'box6cb1') {
        const sixItems = allProducts.slice(0, 6);
        displayedProducts = [...sixItems, ...sixItems]; // 6 vị đầu tiên
    } else if (boxType === 'box6cb2') {
        const sixItems = allProducts.slice(6, 12);
        displayedProducts = [...sixItems, ...sixItems]; // 6 vị cuối
    } else if (boxType === 'box12') {
        displayedProducts = allProducts; // Hiển thị tất cả 12 vị
    } else if (boxType === 'box24') {
        // Có thể duplicate hoặc thêm logic khác cho box 24
        displayedProducts = allProducts;
    }

    return (
        <div className="py-4 px-6 max-w-full min-h-[300px] overflow-hidden mt-10">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                slidesPerView="auto"
                centeredSlides
                spaceBetween={15}
                loop={displayedProducts.length > 3} // Chỉ loop khi có nhiều hơn 3 sản phẩm
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="mySwiper h-[300px]"
            >
                {displayedProducts.map((product, index) => (
                    <SwiperSlide
                        key={`${product.id}-${index}`}
                        className="!w-[120px] h-[200px] flex flex-col items-center justify-start transition-all duration-500"
                    >
                        <div
                            className={`w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md transition-all duration-500
                                ${index === activeIndex ? 'scale-[1.1] translate-y-2' : 'scale-95 opacity-80 blur-[1px]'}
                            `}
                            style={{ zIndex: index === activeIndex ? 10 : 1 }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={120}
                                height={120}
                                className="object-cover rounded-md"
                                loading="lazy"
                            />
                        </div>

                        {/* Always fixed text under image */}
                        <p className={`mt-4 font-[Playfair_Display] text-center text-xs text-gray-700 leading-tight max-w-[120px] transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-50'}`}>
                            {product.name}
                        </p>
                    </SwiperSlide>
                ))}
                {/* Prev button */}
                <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-white">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>

                {/* Next button */}
                <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-white">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

            </Swiper>
        </div>
    );
}