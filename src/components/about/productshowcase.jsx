'use client';
import { useState, useEffect } from 'react';
import ProductIntro from './productintro';
import ProductCarousel from './productcarousel';

export default function ProductShowcase({ boxType }) {
    const [showCarousel, setShowCarousel] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowCarousel(true);
        }, 4000); // 2.5s để show carousel sau intro
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div className="relative h-[300px] overflow-hidden">
                {!showCarousel ? <ProductIntro boxType={boxType} /> : <ProductCarousel boxType={boxType} />}
            </div>
        </>
    );
}
