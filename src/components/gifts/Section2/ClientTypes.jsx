'use client';
import React, { useRef } from 'react';
import { Gift, Building2, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTranslations } from '@/lib/useTranslations';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function ClientTypes() {
    const t = useTranslations('service');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const clientTypes = [
        {
            icon: <Gift className="w-8 h-8" />,
            title: t('section2.clientTypes.title1'),
            description: t('section2.clientTypes.description1')
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            title: t('section2.clientTypes.title2'),
            description: t('section2.clientTypes.description2')
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: t('section2.clientTypes.title3'),
            description: t('section2.clientTypes.description3')
        },
        {
            icon: <User className="w-8 h-8" />,
            title: t('section2.clientTypes.title4'),
            description: t('section2.clientTypes.description4')
        }
    ];

    return (
        <section ref={ref} className="py-20 md:py-32 bg-[#2c1810] relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-[#d4a574] rounded-full opacity-5"
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4a574] rounded-full opacity-5"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
                        {t('section2.clientTypes.headline')}
                    </h2>
                    <motion.div
                        className="w-24 h-0.5 bg-[#d4a574] mx-auto"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </motion.div>

                {/* Client Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {clientTypes.map((client, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-full
                                          transition-all duration-500 relative overflow-hidden"
                                whileHover={{
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    borderColor: "rgba(212, 165, 116, 0.3)",
                                    y: -8
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Background gradient on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 to-transparent opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.div
                                    className="text-[#d4a574] mb-6 relative z-10"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {client.icon}
                                </motion.div>
                                <h3 className="text-xl font-medium text-white mb-3 relative z-10">
                                    {client.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                                    {client.description}
                                </p>
                            </motion.div>

                            {/* Hover effect line */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Note */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="inline-flex items-center space-x-2 text-[#d4a574]">
                        <motion.div
                            className="w-8 h-px bg-[#d4a574]"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 32 } : { width: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        />
                        <p className="text-sm tracking-wider">{t('section2.clientTypes.label')}</p>
                        <motion.div
                            className="w-8 h-px bg-[#d4a574]"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 32 } : { width: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        />
                    </div>
                    <motion.p
                        className="text-2xl font-light text-white mt-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        {t('section2.clientTypes.range')}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}