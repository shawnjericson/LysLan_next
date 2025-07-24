'use client';
import Image from 'next/image';
import { useTranslations } from '@/lib/useTranslations';
import { useState, useEffect } from 'react';

export default function ProductIntro({ boxType, onComplete }) {
    const t = useTranslations('Aboutus');
    const [mainVisible, setMainVisible] = useState(false);
    const [secondPairVisible, setSecondPairVisible] = useState(false);
    const [thirdPairVisible, setThirdPairVisible] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

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
        displayedProducts = allProducts.slice(0, 5);
    } else if (boxType === 'box6cb2') {
        displayedProducts = allProducts.slice(6, 11);
    } else if (boxType === 'box12') {
        displayedProducts = allProducts.slice(0, 5);
    } else if (boxType === 'box24') {
        displayedProducts = allProducts.slice(0, 5);
    }

    useEffect(() => {
        const sequence = async () => {
            // Phase 1: Main product appears
            await new Promise(resolve => {
                setTimeout(() => {
                    setMainVisible(true);
                    resolve();
                }, 300);
            });

            // Phase 2: Second pair appears
            await new Promise(resolve => {
                setTimeout(() => {
                    setSecondPairVisible(true);
                    resolve();
                }, 800);
            });

            // Phase 3: Third pair appears
            await new Promise(resolve => {
                setTimeout(() => {
                    setThirdPairVisible(true);
                    resolve();
                }, 800);
            });

            // Phase 4: Hold position briefly
            await new Promise(resolve => {
                setTimeout(() => {
                    setAnimationComplete(true);
                    resolve();
                }, 800);
            });
        };

        sequence();
    }, []);

    // Notify parent when animation is complete
    useEffect(() => {
        if (animationComplete && onComplete) {
            onComplete();
        }
    }, [animationComplete, onComplete]);

    const getProductStyle = (index) => {
        const baseStyle = {
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            backgroundColor: 'white',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        };

        if (index === 0) {
            return {
                ...baseStyle,
                left: '50%',
                top: '50%',
                transform: mainVisible
                    ? 'translateX(-50%) translateY(-50%) scale(1.15)'
                    : 'translateX(-50%) translateY(-50%) scale(0)',
                opacity: mainVisible ? 1 : 0,
                zIndex: 25,
                filter: animationComplete ? 'brightness(1.1) saturate(1.1)' : 'none',
            };
        }

        if (index === 1) {
            return {
                ...baseStyle,
                left: '50%',
                top: '50%',
                transform: secondPairVisible
                    ? `translateX(-220px) translateY(-40px) scale(0.95)`
                    : 'translateX(-50%) translateY(-50%) scale(0)',
                opacity: secondPairVisible ? 0.9 : 0,
                zIndex: 20,
            };
        }

        if (index === 2) {
            return {
                ...baseStyle,
                left: '50%',
                top: '50%',
                transform: secondPairVisible
                    ? `translateX(100px) translateY(-40px) scale(0.95)`
                    : 'translateX(-50%) translateY(-50%) scale(0)',
                opacity: secondPairVisible ? 0.9 : 0,
                zIndex: 20,
            };
        }

        if (index === 3) {
            return {
                ...baseStyle,
                left: '50%',
                top: '50%',
                transform: thirdPairVisible
                    ? `translateX(-360px) translateY(-50px) scale(0.85)`
                    : 'translateX(-50%) translateY(-50%) scale(0)',
                opacity: thirdPairVisible ? 0.8 : 0,
                zIndex: 15,
            };
        }

        if (index === 4) {
            return {
                ...baseStyle,
                left: '50%',
                top: '50%',
                transform: thirdPairVisible
                    ? `translateX(240px) translateY(-50px) scale(0.85)`
                    : 'translateX(-50%) translateY(-50%) scale(0)',
                opacity: thirdPairVisible ? 0.8 : 0,
                zIndex: 15,
            };
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[300px] relative overflow-hidden">
            {/* Background glow effect */}
            <div
                className={`absolute inset-0 bg-gradient-radial from-amber-100/30 via-transparent to-transparent transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Floating particles */}
            {animationComplete && (
                <>
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-amber-300 rounded-full animate-pulse"
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${2 + Math.random()}s`,
                            }}
                        />
                    ))}
                </>
            )}

            {/* Product Images */}
            {displayedProducts.map((product, index) => (
                <div
                    key={product.id}
                    style={getProductStyle(index)}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="120px"
                        priority={index === 0}
                    />

                    {/* Product name overlay for main product */}
                    {index === 0 && animationComplete && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-white text-xs font-medium text-center truncate">
                                {product.name}
                            </p>
                        </div>
                    )}
                </div>
            ))}

            {/* Center highlight ring */}
            {animationComplete && (
                <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-amber-300/50 rounded-full animate-pulse"
                    style={{ zIndex: 5 }}
                />
            )}
        </div>
    );
}