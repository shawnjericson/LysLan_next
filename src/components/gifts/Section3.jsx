'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import PartnershipHero from './Section3/PartnershipHero';

// Lazy load non-critical sections
const WhoWeSeek = dynamic(() => import('./Section3/WhoWeSeek'), {
    loading: () => <div className="h-96 bg-white" />
});

const PartnerBenefits = dynamic(() => import('./Section3/PartnerBenefits'), {
    loading: () => <div className="h-96 bg-[#faf8f5]" />
});

const WhyLysLan = dynamic(() => import('./Section3/WhyLysLan'), {
    loading: () => <div className="h-96 bg-white" />
});

const PartnershipModels = dynamic(() => import('./Section3/PartnershipModels'), {
    loading: () => <div className="h-96 bg-[#2c1810]" />
});

const PartnershipCTA = dynamic(() => import('./Section3/PartnershipCTA'), {
    loading: () => <div className="h-96 bg-[#faf8f5]" />
});

export default function PartnershipPage() {
    return (
        <>
            {/* SEO Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "LysLan",
                        "description": "Chocolate thủ công cao cấp 100% cacao Việt Nam",
                        "url": "https://lyslan.com",
                        "logo": "https://lyslan.com/logo.png",
                        "makesOffer": {
                            "@type": "Offer",
                            "name": "Đăng ký đại lý phân phối chocolate LysLan",
                            "description": "Trở thành đối tác phân phối chocolate thủ công cao cấp LysLan với nhiều hình thức hợp tác linh hoạt",
                            "eligibleRegion": {
                                "@type": "Country",
                                "name": "VN"
                            },
                            "businessFunction": "http://purl.org/goodrelations/v1#Sell",
                            "itemOffered": {
                                "@type": "Product",
                                "name": "Chocolate thủ công LysLan",
                                "brand": {
                                    "@type": "Brand",
                                    "name": "LysLan"
                                },
                                "description": "Chocolate thủ công cao cấp 100% cacao Việt Nam"
                            }
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Hình thức hợp tác đại lý",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "name": "Ký gửi trưng bày",
                                    "description": "Cung cấp sản phẩm trưng bày tại không gian của đối tác"
                                },
                                {
                                    "@type": "Offer",
                                    "name": "Hợp tác bán lẻ",
                                    "description": "Bán lẻ theo đơn đặt hàng cho cửa hàng, boutique"
                                },
                                {
                                    "@type": "Offer",
                                    "name": "Sản phẩm độc quyền",
                                    "description": "Tạo sản phẩm chocolate độc quyền cho không gian riêng"
                                }
                            ]
                        }
                    })
                }}
            />

            <div className="bg-white min-h-screen">
                {/* Hero Section - Critical */}
                <PartnershipHero />

                {/* Who We Seek */}
                <WhoWeSeek />

                {/* Partner Benefits */}
                <PartnerBenefits />

                {/* Why LysLan */}
                <WhyLysLan />

                {/* Partnership Models */}
                <PartnershipModels />

                {/* CTA Section */}
                <PartnershipCTA />
            </div>
        </>
    );
}