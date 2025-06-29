'use client';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import { useState, useEffect } from 'react';

export default function ProductIntro({ boxType }) {
    const t = useTranslations('Aboutus');
    const [mainVisible, setMainVisible] = useState(false);
    const [secondPairVisible, setSecondPairVisible] = useState(false);
    const [thirdPairVisible, setThirdPairVisible] = useState(false);

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
    let displayedProducts = allProducts.slice(0, 5); // Mặc định 5 sản phẩm cho animation

    if (boxType === 'box6cb1') {
        displayedProducts = allProducts.slice(0, 5); // 5 sản phẩm đầu tiên cho animation
    } else if (boxType === 'box6cb2') {
        displayedProducts = allProducts.slice(6, 11); // 5 sản phẩm từ nhóm thứ 2
    } else if (boxType === 'box12') {
        displayedProducts = allProducts.slice(0, 5); // Vẫn chỉ hiển thị 5 cho animation
    } else if (boxType === 'box24') {
        displayedProducts = allProducts.slice(0, 5); // Vẫn chỉ hiển thị 5 cho animation
    }

    useEffect(() => {
        const mainTimeout = setTimeout(() => setMainVisible(true), 500);
        const secondTimeout = setTimeout(() => setSecondPairVisible(true), 1500);
        const thirdTimeout = setTimeout(() => setThirdPairVisible(true), 2500);

        return () => {
            clearTimeout(mainTimeout);
            clearTimeout(secondTimeout);
            clearTimeout(thirdTimeout);
        };
    }, []);

    const getProductStyle = (index) => {
        if (index === 0) {
            return {
                left: '50%',
                transform: mainVisible
                    ? 'translateX(-50%) scale(1.1) translateY(20px)'
                    : 'translateX(-50%) scale(0)',
                opacity: mainVisible ? 1 : 0,
                zIndex: 20,
            };
        }

        if (index === 1) {
            return {
                left: '50%',
                transform: secondPairVisible
                    ? `translateX(-200px) translateY(15px)`
                    : 'translateX(-50%)',
                opacity: secondPairVisible ? 1 : 0,
                zIndex: 15,
            };
        }

        if (index === 2) {
            return {
                left: '50%',
                transform: secondPairVisible
                    ? `translateX(80px) translateY(15px)`
                    : 'translateX(-50%)',
                opacity: secondPairVisible ? 1 : 0,
                zIndex: 15,
            };
        }

        if (index === 3) {
            return {
                left: '50%',
                transform: thirdPairVisible
                    ? `translateX(-335px)`
                    : 'translateX(-50%)',
                opacity: thirdPairVisible ? 1 : 0,
                zIndex: 10,
            };
        }

        if (index === 4) {
            return {
                left: '50%',
                transform: thirdPairVisible
                    ? `translateX(215px)`
                    : 'translateX(-50%)',
                opacity: thirdPairVisible ? 1 : 0,
                zIndex: 10,
            };
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[200px] relative overflow-hidden">
            {displayedProducts.map((product, index) => (
                <div
                    key={product.id}
                    className="transition-all duration-1000 ease-out absolute w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md bg-white"
                    style={getProductStyle(index)}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}