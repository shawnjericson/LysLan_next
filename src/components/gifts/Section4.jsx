'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import CorporateHero from './Section4/CorporateHero';

// Lazy load non-critical sections
const WhyCorporateGifts = dynamic(() => import('./Section4/WhyCorporateGifts'), {
    loading: () => <div className="h-96 bg-white" />
});

const GiftOccasions = dynamic(() => import('./Section4/GiftOccasions'), {
    loading: () => <div className="h-96 bg-[#faf8f5]" />
});

const ProductShowcase = dynamic(() => import('./Section4/ProductShowcase'), {
    loading: () => <div className="h-96 bg-white" />
});

const CustomizationServices = dynamic(() => import('./Section4/CustomizationServices'), {
    loading: () => <div className="h-96 bg-[#2c1810]" />
});

const CorporateProcess = dynamic(() => import('./Section4/CorporateProcess'), {
    loading: () => <div className="h-96 bg-[#faf8f5]" />
});

const CorporateCTA = dynamic(() => import('./Section4/CorporateCTA'), {
    loading: () => <div className="h-96 bg-white" />
});

export default function CorporateOrderPage() {
    return (
        <>
            {/* SEO Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "Dịch vụ đặt hàng chocolate doanh nghiệp LysLan",
                        "description": "Quà tặng chocolate cao cấp cho doanh nghiệp từ 100% cacao Việt Nam. Thiết kế riêng theo thương hiệu, in logo, cá nhân hóa thông điệp.",
                        "brand": {
                            "@type": "Brand",
                            "name": "LysLan"
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "VND",
                            "availability": "https://schema.org/InStock",
                            "eligibleQuantity": {
                                "@type": "QuantitativeValue",
                                "minValue": 50,
                                "unitCode": "SET"
                            }
                        },
                        "category": "Quà tặng doanh nghiệp",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "bestRating": "5",
                            "ratingCount": "200"
                        },
                        "additionalProperty": [
                            {
                                "@type": "PropertyValue",
                                "name": "Nguyên liệu",
                                "value": "100% cacao Việt Nam"
                            },
                            {
                                "@type": "PropertyValue",
                                "name": "Tùy chỉnh",
                                "value": "Logo, thiết kế, hương vị theo yêu cầu"
                            }
                        ]
                    })
                }}
            />

            <div className="bg-white min-h-screen">
                {/* Hero Section - Critical */}
                <CorporateHero />

                {/* Why Corporate Gifts */}
                <WhyCorporateGifts />

                {/* Gift Occasions */}
                <GiftOccasions />

                {/* Product Showcase */}
                <ProductShowcase />

                {/* Customization Services */}
                <CustomizationServices />

                {/* Corporate Process */}
                <CorporateProcess />

                {/* CTA Section */}
                <CorporateCTA />
            </div>
        </>
    );
}