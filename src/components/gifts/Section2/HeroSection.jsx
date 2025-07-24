'use client';
import { useTranslations } from '@/lib/useTranslations';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function HeroSection() {
    const t = useTranslations('service');
    
    return (
        <section className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-[#2c1810] to-[#3e2618] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        className="space-y-8"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div className="space-y-2" variants={fadeInUp}>
                            <p className="text-[#d4a574] text-sm md:text-base tracking-widest font-light uppercase">
                                {t('section2.hero.label')}
                            </p>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                                {t('section2.hero.headline')}
                                <span className="block text-[#d4a574] mt-2">{t('section2.hero.headlineHighlight')}</span>
                            </h2>
                        </motion.div>

                        <motion.div className="space-y-6 text-gray-300" variants={fadeInUp}>
                            <p className="text-lg md:text-xl font-light leading-relaxed">
                                {t('section2.hero.intro1')}<strong className="text-white font-normal">{t('section2.hero.intro2')}</strong>{t('section2.hero.intro3')}
                            </p>
                            <p className="text-base md:text-lg leading-relaxed italic">
                                {t('section2.hero.subtext1')}<span className="text-[#d4a574]">{t('section2.hero.subtext2')}</span>{t('section2.hero.subtext3')}
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            variants={fadeInUp}
                        >
                            <motion.button
                                className="px-8 py-4 bg-[#d4a574] hover:bg-[#c19660] text-white font-light tracking-wide transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('section2.hero.buttonConsult')}
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 border border-white/30 hover:border-white/60 text-white font-light tracking-wide transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('section2.hero.buttonSamples')}
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Image Grid */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className="relative h-48 md:h-64 overflow-hidden rounded-lg">
                                    <Image
                                        src="/Images/Bonbon1.jpg"
                                        alt={t('section2.hero.images.bonbon')}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                        loading="eager"
                                        priority
                                    />
                                </div>
                                <div className="relative h-32 md:h-40 overflow-hidden rounded-lg">
                                    <Image
                                        src="/Images/Tablets.jpg"
                                        alt={t('section2.hero.images.tablet')}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-4 pt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="relative h-32 md:h-40 overflow-hidden rounded-lg">
                                    <Image
                                        src="/Images/EggCoffeeDragees.jpg"
                                        alt={t('section2.hero.images.dragees')}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="relative h-48 md:h-64 overflow-hidden rounded-lg">
                                    <Image
                                        src="/Images/CreameBrulee.jpg"
                                        alt={t('section2.hero.images.nama')}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Badge */}
                        <motion.div
                            className="absolute -top-4 -right-4 bg-[#d4a574] text-white px-6 py-3 rotate-3 shadow-lg"
                            initial={{ opacity: 0, rotate: 0, scale: 0 }}
                            animate={{ opacity: 1, rotate: 3, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                        >
                            <p className="text-xs tracking-wider">{t('section2.hero.badge')}</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom highlight */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <p className="text-center text-gray-400 max-w-4xl mx-auto leading-relaxed">
                        {t('section2.hero.footerNote1')}<span className="text-[#d4a574]">{t('section2.hero.footerNote2')}</span>{t('section2.hero.footerNote3')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}