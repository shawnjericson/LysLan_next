'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './Section2/HeroSection';

// Lazy load các sections không critical
const ProcessSection = dynamic(() => import('./Section2/ProcessSection'), {
    loading: () => <div className="h-96 bg-[#faf8f5]" />
});
const ProductLines = dynamic(() => import('./Section2/ProductLines'), {
    loading: () => <div className="h-96 bg-white" />
});
const ClientTypes = dynamic(() => import('./Section2/ClientTypes'), {
    loading: () => <div className="h-96 bg-[#2c1810]" />
});
const WhyChooseUs = dynamic(() => import('./Section2/WhyChooseUs'), {
    loading: () => <div className="h-96 bg-[#faf8f5]" />
});
const CTASection = dynamic(() => import('./Section2/CTASection'), {
    loading: () => <div className="h-96 bg-[#2c1810]" />
});

export default function ContractManufacturingService() {
    return (
        <>
            {/* SEO Meta Tags */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Dịch Vụ Gia Công Chocolate Cao Cấp",
                        "provider": {
                            "@type": "Organization",
                            "name": "LysLan",
                            "description": "Chocolate thủ công cao cấp 100% cacao Việt Nam"
                        },
                        "description": "Dịch vụ gia công chocolate cao cấp cho thương hiệu với 4 dòng sản phẩm: Bonbon, Thanh, Dragees, Nama. 100% cacao Việt Nam, thủ công nghệ thuật.",
                        "serviceType": "Gia công sản phẩm chocolate",
                        "areaServed": "Việt Nam",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Các dòng sản phẩm gia công",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Product",
                                        "name": "Bonbon",
                                        "description": "Lớp vỏ giòn thanh mảnh, nhân mềm ngọt ngào"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Product",
                                        "name": "Thanh Chocolate",
                                        "description": "Tinh tế, tối giản, dễ ăn và dễ mang theo"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Product",
                                        "name": "Dragees",
                                        "description": "Chocolate bọc hạt cao cấp"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Product",
                                        "name": "Nama",
                                        "description": "Mềm tan, thanh thuần, đậm đà vị cacao"
                                    }
                                }
                            ]
                        }
                    })
                }}
            />

            <div className="bg-white min-h-screen overflow-x-hidden">
                {/* Hero Section - Critical, load immediately */}
                <HeroSection />

                {/* Other sections - Lazy loaded */}
                <ProcessSection />
                <ProductLines />
                <ClientTypes />
                <WhyChooseUs />
                <CTASection />
            </div>
        </>
    );
}