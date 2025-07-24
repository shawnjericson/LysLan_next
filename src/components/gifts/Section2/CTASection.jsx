'use client';
import React, { useRef } from 'react';
import { Coffee, ArrowRight, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTranslations } from '@/lib/useTranslations';

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const t = useTranslations('service');

    return (
        <section ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-[#3e2618] to-[#2c1810] relative overflow-hidden">
            {/* Animated Background Pattern */}
            <motion.div
                className="absolute top-0 left-0 w-64 h-64 bg-[#d4a574] rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"
                animate={{
                    x: [-128, -100, -128],
                    y: [-128, -100, -128],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4a574] rounded-full opacity-5 translate-x-1/2 translate-y-1/2"
                animate={{
                    x: [192, 150, 192],
                    y: [192, 150, 192],
                    scale: [1, 1.3, 1]
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Icon */}
                <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-[#d4a574]/10 rounded-full mb-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Coffee className="w-10 h-10 text-[#d4a574]" />
                    </motion.div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {t('section2.cta.headline')}
                    <motion.span
                        className="block text-[#d4a574] mt-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t('section2.cta.headlineHighlight')}
                    </motion.span>
                </motion.h2>

                {/* Description */}
                <motion.div
                    className="space-y-4 mb-12"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.5
                            }
                        }
                    }}
                >
                    <motion.p
                        className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        {t('section2.cta.description1')}
                    </motion.p>
                    <motion.p
                        className="text-base text-gray-400 max-w-3xl mx-auto font-light"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <strong className="text-white font-normal">{t('section2.cta.description2')}</strong> –
                        {t('section2.cta.description3')}
                    </motion.p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <motion.button
                        className="group px-8 py-4 bg-[#d4a574] hover:bg-[#c19660] text-white font-light tracking-wide transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{t('section2.cta.buttonConsult')}</span>
                        <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                    <motion.button
                        className="px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-light tracking-wide transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('section2.cta.buttonSample')}
                    </motion.button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    className="pt-8 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <p className="text-sm text-gray-400 mb-4">{t('section2.cta.label')}</p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 1
                                }
                            }
                        }}
                    >
                        <motion.a
                            href="tel:+84975066406"
                            className="flex items-center justify-center space-x-2 text-gray-300 hover:text-[#d4a574] transition-colors"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Phone className="w-4 h-4" />
                            <span>+84 975 066 406</span>
                        </motion.a>
                        <motion.a
                            href="mailto:sales@lyslan-chocolatier.vn"
                            className="flex items-center justify-center space-x-2 text-gray-300 hover:text-[#d4a574] transition-colors"
                            variants={{
                                hidden: { opacity: 0, x: 20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Mail className="w-4 h-4" />
                            <span>sales@lyslan-chocolatier.vn</span>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Bottom tagline */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <motion.p
                        className="text-xs text-gray-500 tracking-widest uppercase"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {t('section2.cta.tagline')}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}