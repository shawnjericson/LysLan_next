'use client';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from '@/lib/useTranslations';
export default function WhyChooseUs() {
    const t = useTranslations('service');
    const reasons = [
        {
            title: t('section2.whyChooseUs.title1'),
            description: t('section2.whyChooseUs.description1'),
            highlight: true
        },
        {
            title: t('section2.whyChooseUs.title2'),
            description: t('section2.whyChooseUs.description2'),
            highlight: false
        },
        {
            title: t('section2.whyChooseUs.title3'),
            description: t('section2.whyChooseUs.description3'),
            highlight: false
        },
        {
            title: t('section2.whyChooseUs.title4'),
            description: t('section2.whyChooseUs.description4'),
            highlight: true
        }
    ];
    return (
        <section className="py-20 md:py-32 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-6">
                            {t('section2.whyChooseUs.headline')}
                        </h2>
                        <div className="w-24 h-0.5 bg-[#d4a574] mb-8"></div>

                        <div className="space-y-6">
                            {reasons.map((reason, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-lg transition-all duration-300 ${reason.highlight
                                        ? 'bg-white shadow-md border-l-4 border-[#d4a574]'
                                        : 'bg-transparent hover:bg-white/50'
                                        }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <CheckCircle2 className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-lg font-medium text-[#2c1810] mb-2">
                                                {reason.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {reason.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-[#2c1810] to-[#3e2618] rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white p-8">
                                    <div className="mb-8">
                                        <div className="w-32 h-32 mx-auto border-4 border-[#d4a574] rounded-full flex items-center justify-center">
                                            <span className="text-4xl font-light">100%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-light mb-4">{t('section2.whyChooseUs.title')}</h3>
                                    <p className="text-gray-300 max-w-xs mx-auto">
                                        {t('section2.whyChooseUs.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-[#d4a574] rounded-full opacity-20" />
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#d4a574] rounded-full opacity-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}