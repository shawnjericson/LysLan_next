'use client';
import { useTranslations } from '@/lib/useTranslations';
import React from 'react';
import Image from 'next/image';
import { Heart, Gift, Star, Award, Users, Building2 } from 'lucide-react';

export default function ChocolateGiftSection() {
    const t = useTranslations('service');
    const giftTypes = [
        {
            id: 1,
            title: t('giftTypes.title1'),
            description: t('giftTypes.description1'),
            icon: <Gift className="w-6 h-6 text-[#DE9400]" />,
            image: "/Images/CG2.jpg"
        },
        {
            id: 2,
            title: t('giftTypes.title2'),
            description: t('giftTypes.description2'),
            icon: <Heart className="w-6 h-6 text-[#DE9400]" />,
            image: "/Images/CG1.jpg"
        },
        {
            id: 3,
            title: t('giftTypes.title3'),
            description: t('giftTypes.description3'),
            icon: <Building2 className="w-6 h-6 text-[#DE9400]" />,
            image: "/Images/CG14.jpg"
        },
        {
            id: 4,
            title: t('giftTypes.title4'),
            description: t('giftTypes.description4'),
            icon: <Award className="w-6 h-6 text-[#DE9400]" />,
            image: "/Images/CG13.jpg"
        },
        {
            id: 5,
            title: t('giftTypes.title5'),
            description: t('giftTypes.description5'),
            icon: <Users className="w-6 h-6 text-[#DE9400]" />,
            image: "/Images/CG3.jpg"
        },
        {
            id: 6,
            title: t('giftTypes.title6'),
            description: t('giftTypes.description6'),
            icon: <Star className="w-6 h-6 text-[#DE9400]" />,
            image: "/Images/CG16.jpg"
        }
    ];
    const testimonials = [
        {
            name: t('testimonials.name1'),
            role: t('testimonials.role1'),
            content: t('testimonials.content1'),
            rating: 5
        },
        {
            name: t('testimonials.name2'),
            role: t('testimonials.role2'),
            content: t('testimonials.content2'),
            rating: 5
        },
        {
            name: t('testimonials.name3'),
            role: t('testimonials.role3'),
            content: t('testimonials.content3'),
            rating: 5
        }
    ];
    return (
        <div className="bg-[#fff8f5] min-h-screen">
            {/* SEO Schema Markup */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": "Quà Tặng Chocolate Cao Cấp",
                    "description": "Chocolate cao cấp làm quà tặng sang trọng, tinh tế cho mọi dịp đặc biệt. Đóng gói đẹp mắt, chất lượng premium.",
                    "brand": {
                        "@type": "Brand",
                        "name": "Premium Chocolate Gifts"
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "priceCurrency": "VND",
                        "availability": "https://schema.org/InStock"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": "150"
                    }
                })}
            </script>
            {/* Hero Section */}
            <section className="relative bg-[#3e1f0e] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h2 className="font-[Playfair_Display] text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide">
                                    {t('herosection.h2')}
                                    <span className="block text-[#DE9400] font-extralight">
                                    {t('herosection.span1')}
                                    </span>
                                </h2>
                                <p className="text-xl md:text-2xl font-[Monserrat] text-gray-300 font-light leading-relaxed">
                                    {t('herosection.p1')}
                                </p>
                            </div>
                            <div className="space-y-8 font-[Monserrat]">
                                <p className="text-lg text-gray-300 leading-relaxed font-light max-w-lg">
                                    {t('herosection.p2')}
                                </p>
                                <div className="flex flex-col gap-3 text-sm font-light">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 bg-[#DE9400] rounded-full"></div>
                                        <span className="text-gray-300">{t('herosection.span2')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 bg-[#DE9400] rounded-full"></div>
                                        <span className="text-gray-300">{t('herosection.span3')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 bg-[#DE9400] rounded-full"></div>
                                        <span className="text-gray-300">{t('herosection.span4')}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-[#DE9400] hover:bg-[#DE9400]/90 text-white font-light px-12 py-4 transition-all duration-300 tracking-wide">
                                {t('herosection.button')}
                            </button>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-white/5 p-8 backdrop-blur-sm">
                                <Image
                                    src="/Images/LysLan-box.jpg"
                                    alt={t('herosection.alt')}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 bg-[#DE9400] text-white px-6 py-2 text-sm font-light tracking-wide font-[Playfair_Display]">
                                PREMIUM
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Gift Types Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-[Playfair_Display] font-light text-[#3e1f0e] mb-6 tracking-wide">
                            {t('giftsection.h2')}
                        </h2>
                        <div className="w-24 h-px bg-[#DE9400] mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 font-[Monserrat] max-w-2xl mx-auto font-light leading-relaxed">
                            {t('giftsection.p')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {giftTypes.map((gift) => (
                            <div
                                key={gift.id}
                                className="group bg-[#fff8f5] hover:bg-white transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#DE9400]/20 hover:shadow-lg"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={gift.image}
                                        alt={`${gift.title} - Chocolate cao cấp`}
                                        width={300}
                                        height={200}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        {gift.icon}
                                        <h3 className="text-xl font-light font-[Playfair_Display] text-[#3e1f0e] ml-4 tracking-wide">
                                            {gift.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 font-[Monserrat] leading-relaxed mb-8 font-light">
                                        {gift.description}
                                    </p>
                                    <button className="w-full bg-transparent border font-[Playfair_Display] border-[#DE9400] text-[#DE9400] hover:bg-[#DE9400] hover:text-white font-light py-3 transition-all duration-300 tracking-wide">
                                    {t('giftsection.button')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Meaning Section */}
            <section className="py-32 bg-[#3e1f0e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-light text-white mb-8 tracking-wide">
                                    {t('meaningsection.h2')}
                                </h2>
                                <div className="w-24 h-px bg-[#DE9400] mb-8"></div>
                                <p className="text-lg text-gray-300 leading-relaxed font-[Monserrat] font-light mb-12">
                                    {t('meaningsection.p')}
                                </p>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-6">
                                        <div className="w-12 h-12 bg-[#DE9400]/10 flex items-center justify-center flex-shrink-0">
                                            <Heart className="w-5 h-5 text-[#DE9400]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-light mb-3 text-lg tracking-wide">{t('meaningsection.h31')}</h3>
                                            <p className="text-gray-400 font-light leading-relaxed">
                                                {t('meaningsection.p1')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-6">
                                        <div className="w-12 h-12 bg-[#DE9400]/10 flex items-center justify-center flex-shrink-0">
                                            <Gift className="w-5 h-5 text-[#DE9400]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-light mb-3 text-lg tracking-wide">{t('meaningsection.h32')}</h3>
                                            <p className="text-gray-400 font-light leading-relaxed">
                                                {t('meaningsection.p2')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-6">
                                        <div className="w-12 h-12 bg-[#DE9400]/10 flex items-center justify-center flex-shrink-0">
                                            <Star className="w-5 h-5 text-[#DE9400]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-light mb-3 text-lg tracking-wide">{t('meaningsection.h33')}</h3>
                                            <p className="text-gray-400 font-light leading-relaxed">
                                                {t('meaningsection.p3')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <Image
                                        src="/Images/CG4.jpg"
                                        alt={t('meaningsection.alt1')}
                                        width={250}
                                        height={300}
                                        className="w-full object-cover"
                                    />
                                    <Image
                                        src="/Images/CG21.jpg"
                                        alt={t('meaningsection.alt2')}
                                        width={250}
                                        height={200}
                                        className="w-full object-cover"
                                    />
                                </div>
                                <div className="space-y-6 mt-12">
                                    <Image
                                        src="/Images/CG20.jpg"
                                        alt={t('meaningsection.alt3')}
                                        width={250}
                                        height={200}
                                        className="w-full object-cover"
                                    />
                                    <Image
                                        src="/Images/CG6.jpg"
                                        alt={t('meaningsection.alt4')}
                                        width={250}
                                        height={300}
                                        className="w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Testimonials Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-light font-[Playfair_Display] text-[#3e1f0e] mb-6 tracking-wide">
                            {t('testimonialssection.h2')}
                        </h2>
                        <div className="w-24 h-px bg-[#DE9400] mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl font-[Monserrat] mx-auto font-light leading-relaxed">
                            {t('testimonialssection.p')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-[#fff8f5] p-12 hover:bg-white transition-all duration-500 border border-gray-100 hover:border-[#DE9400]/20 hover:shadow-lg group"
                            >
                                <div className="flex items-center mb-8">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-[#DE9400] fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 leading-relaxed font-[Playfair_Display] mb-8 font-light italic text-lg">
                                    "{testimonial.content}"
                                </p>
                                <div className="border-t border-gray-200 pt-8">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-[#DE9400] flex items-center justify-center text-white font-light text-sm">
                                            {testimonial.name.split(' ')[1]?.charAt(0) || testimonial.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-light text-[#3e1f0e] text-lg tracking-wide">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500 font-light">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-32 bg-[#3e1f0e]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-[Playfair_Display] md:text-4xl font-light text-white mb-8 tracking-wide">
                        {t('ctasection.h2')}
                    </h2>
                    <div className="w-24 h-px bg-[#DE9400] mx-auto mb-12"></div>
                    <p className="text-lg text-gray-300 font-[Monserrat] mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('ctasection.p')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-[#DE9400] font-[Monserrat] hover:bg-[#DE9400]/90 text-white font-light px-12 py-4 transition-all duration-300 tracking-wide">
                            {t('ctasection.btn1')}
                        </button>
                        <button className="bg-transparent border font-[Monserrat] border-white text-white hover:bg-white hover:text-[#3e1f0e] font-light px-12 py-4 transition-all duration-300 tracking-wide">
                            {t('ctasection.btn2')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};